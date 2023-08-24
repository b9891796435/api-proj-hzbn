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
import { UserDao } from 'app/dao/UserDao';
import { ProjectDao } from 'app/dao/ProjectDao';
import ProjectDto from './dto/ProjectDto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectService extends AbstractService {
  @Inject()
  private readonly projectUserDao: ProjectUserDao;

  @Inject()
  private readonly userDao: UserDao;

  @Inject()
  private readonly apiDao: APIDao;

  @Inject()
  private readonly apiHistoyDao: APIHistoryDao;

  @Inject()
  private readonly projectDao: ProjectDao;

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
    // ignore return value
    await this.findProjectUserOrThrow(pid, currUid);
    return await this.apiDao.retrieveAPIsByProjectId(pid);
  }

  async createAPI(currUid: bigint, pid: bigint, API: APIDto) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    const api = await this.apiDao.save(pid, currUid, API);
    return {
      aid: api.aid,
      hid: api.hid,
      uid: api.uid,
    };
  }

  async modifyAPI(currUid: bigint, pid: bigint, aid: bigint, API: APIDto) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.apiHistoyDao.save(aid, currUid, API);
  }

  async trashAPI(currUid: bigint, pid: bigint, aid: bigint) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.apiDao.update(aid, { deleted: true });
  }

  async getAPIsInRecycleBin(currUid: bigint, pid: bigint) {
    // ignore return value
    await this.findProjectUserOrThrow(pid, currUid);
    return await this.apiDao.retrieveAPIsByProjectId(pid, { deleted: true });
  }

  async recoveryAPIsInRecycleBin(currUid: bigint, pid: bigint, aid: bigint) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!user || !this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    const api = await this.apiDao.findByAidAndDeleted(aid, true);
    if (!api) {
      throw new BusinessException(ResponseCode.NOT_FOUND, 'API不存在');
    }
    await this.apiDao.update(api.aid, { deleted: false });
  }

  async getAPIHistories(currUid: bigint, pid: bigint, aid: bigint) {
    // ignore return value
    await this.findProjectUserOrThrow(pid, currUid);
    const api = await this.apiDao.findByAidAndDeleted(aid, false);
    if (!api) {
      throw new BusinessException(ResponseCode.NOT_FOUND, 'API不存在或已删除');
    }
    const models = await this.apiHistoyDao.retrieveByAid(aid);
    const histories: {
      hid: bigint;
      username: string;
      time: Date;
    }[] = [];
    for (const model of models) {
      const user = await this.userDao.findById(model.uid);
      histories.push({
        hid: model.hid,
        username: user.username,
        time: model.time,
      });
    }
    return histories;
  }

  async restoreAPiHistory(currUid: bigint, pid: bigint, aid: bigint, hid: bigint) {
    const user = await this.findProjectUserOrThrow(pid, currUid);
    if (!this.checkUserRoleGreaterEqual(user.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    const api = await this.apiDao.findByAidAndDeleted(aid, false);
    if (!api) {
      throw new BusinessException(ResponseCode.NOT_FOUND, 'API不存在或已删除');
    }
    const hisotry = await this.apiHistoyDao.findByHidAndAid(hid, aid);
    if (!hisotry) {
      throw new BusinessException(ResponseCode.NOT_FOUND, '历史记录不存在');
    }
    // 删除 aid 之后的历史记录
    await this.apiHistoyDao.removeWhereTimeGreaterThan(aid, hisotry.time);
  }

  async createProject(currUid: bigint, name: string) {
    const project = await this.projectDao.save(name);
    await this.projectUserDao.save({
      pid: project.pid,
      uid: currUid,
      role: RoleEnum.OWNER,
    });
    return {
      pid: project.pid,
      name: project.name,
      description: project.description,
    };
  }

  async modifyProject(currUid: bigint, pid: bigint, dto: Partial<ProjectDto>) {
    if (!dto.name && !dto.description) {
      return;
    }
    const modifier = await this.findProjectUserOrThrow(pid, currUid);
    if (!this.checkUserRoleGreaterEqual(modifier.role, RoleEnum.WRITER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.projectDao.update(pid, dto);
  }

  async removeProject(currUid: bigint, pid: bigint) {
    const modifier = await this.findProjectUserOrThrow(pid, currUid);
    if (!this.checkUserRoleGreaterEqual(modifier.role, RoleEnum.OWNER)) {
      throw new BusinessException(ResponseCode.FORBIDDEN, '无权限');
    }
    await this.projectDao.remove(pid);
  }

  async getProjects(currUid: bigint, page: number, pageSize: number) {
    return await this.projectUserDao.retrieveProjectsByUserIdAndOffsetAndLimit(currUid, page * pageSize, pageSize);
  }

  async getProject(currUid: bigint, pid: bigint) {
    // ignore return value
    await this.findProjectUserOrThrow(pid, currUid);
    return this.projectDao.findById(pid);
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
