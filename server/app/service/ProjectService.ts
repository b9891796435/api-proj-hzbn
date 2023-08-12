import { AccessLevel, Inject, SingletonProto } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { ProjectUserDao } from 'app/dao/ProjectUserDao';
import { RoleEnum } from 'app/dao/bo/ProjectUserBo';
import BusinessException from 'app/core/BusinessException';
import { ResponseCode } from 'app/core/Response';
import UserBo from 'app/mapper/po/ProjectUserPo';
import { APIDao } from 'app/dao/APIDao';
import APIDto from './dto/APIDto';
import { APIHistoryDao } from 'app/dao/APIHistoryDao';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectService extends AbstractService {
  @Inject()
  private readonly projectUserDao: ProjectUserDao;

  @Inject()
  private readonly apiDao: APIDao;

  @Inject()
  private readonly apiHistoyDao: APIHistoryDao;

  async getMembers(currUid: bigint, pid: bigint) {
    const members = await this.projectUserDao.retrieveMembersByProjectId(pid);
    // 只有项目成员才能查看项目成员
    if (members.some(m => m.uid === currUid)) {
      return members;
    }
    throw new BusinessException(ResponseCode.FORBIDDEN, '无权查看项目成员');
  }

  async changeMemberRole(currUid: bigint, pid: bigint, uid: bigint, role: RoleEnum) {
    const modifier = await this.findProjectUserOrThrow(pid, currUid);
    this.checkModifierRole(modifier, uid, '修改');
    const po = await this.findProjectUserOrThrow(pid, uid);
    if (po.role === role) {
      return;
    }
    // TODO：记录修改日志
    await this.projectUserDao.update(po, { role });
    this.logger.info('change role of %s in project %s from %s to %s', uid, pid, po.role, role);
  }

  async removeMember(currUid: bigint, pid: bigint, uid: bigint) {
    const modifier = await this.findProjectUserOrThrow(pid, currUid);
    this.checkModifierRole(modifier, uid, '删除');
    const po = await this.findProjectUserOrThrow(pid, uid);
    await this.projectUserDao.remove(po);
    this.logger.info('remove member %s from project %s', uid, pid);
  }

  async inviteMember(currUid: bigint, pid: bigint, uid: bigint, role: RoleEnum) {
    const modifier = await this.findProjectUserOrThrow(pid, currUid);
    this.checkModifierRole(modifier, uid, '邀请');
    try {
      await this.projectUserDao.save({
        pid,
        uid,
        role,
      });
      this.logger.info('invite user %s to project %s with role %s', uid, pid, role);
    } catch (e: any) {
      if (e.message.includes('Duplicate entry')) {
        throw new BusinessException(
          ResponseCode.DUPLICATE_RESOURCE,
          '用户已经在项目中',
        );
      } else if (e.message.includes('foreign key constraint fails')) {
        throw new BusinessException(
          ResponseCode.NOT_FOUND,
          '项目或用户不存在',
        );
      } else {
        throw e;
      }
    }
  }

  async getAPIs(currUid: bigint, pid: bigint) {
    const user = await this.projectUserDao.findByProjectIdAndUserId(pid, currUid);
    if (!user) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    return await this.apiDao.retrieveAPIsByProjectId(pid);
  }

  async createAPI(currUid: bigint, pid: bigint, API: APIDto) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.apiDao.save(pid, currUid, API);
  }

  async modifyAPI(currUid: bigint, pid: bigint, aid: bigint, API: APIDto) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.apiHistoyDao.save(aid, currUid, API);
  }

  private async findProjectUserOrThrow(pid: bigint, uid: bigint) {
    const po = await this.projectUserDao.findByProjectIdAndUserId(pid, uid);
    this.logger.debug('find project user', po);
    if (!po) {
      throw new BusinessException(
        ResponseCode.NOT_FOUND,
        '项目或项目成员不存在',
      );
    }
    return po;
  }

  private checkUserRoleGreaterEqual(
    userRole: RoleEnum,
    targetRole: RoleEnum,
  ) {
    return userRole >= targetRole;
  }

  private checkModifierRole(modifier: UserBo, uid: bigint, predicate: string) {
    if (!this.checkUserRoleGreaterEqual(modifier.role, RoleEnum.ADMIN)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, `无权限${predicate}项目成员`);
    }
    if (modifier.uid === uid) {
      throw new BusinessException(ResponseCode.FORBIDDEN, `无法${predicate}自己`);
    }
    this.logger.debug('check modifier role success');
  }
}
