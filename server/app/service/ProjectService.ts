import { AccessLevel, Inject, SingletonProto } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { ProjectUserDao } from 'app/dao/ProjectUserDao';
import { RoleEnum } from 'app/dao/bo/ProjectUserBo';
import BusinessException from 'app/core/BusinessException';
import { ResponseCode } from 'app/core/Response';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectService extends AbstractService {
  @Inject()
  private readonly projectUserDao: ProjectUserDao;

  async getMembers(pid: bigint) {
    return await this.projectUserDao.retrieveMembersByProjectId(pid);
  }

  async changeMemberRole(pid: bigint, uid: bigint, role: RoleEnum) {
    // TODO: 检查用户是否有权限修改
    const po = await this.findProjectUserOrThrow(pid, uid);
    if (po.role === role) {
      return;
    }
    await this.projectUserDao.update(po, { role });
    this.logger.info('change role of %s in project %s from %s to %s', uid, pid, po.role, role);
  }

  async removeMember(pid: bigint, uid: bigint) {
    // TODO: 检查用户是否有权限修改
    const po = await this.findProjectUserOrThrow(pid, uid);
    await this.projectUserDao.remove(po);
    this.logger.info('remove member %s from project %s', uid, pid);
  }

  async inviteMember(pid: bigint, uid: bigint, role: RoleEnum) {
    // TODO: 检查用户是否有权限修改
    try {
      await this.projectUserDao.save({
        pid,
        uid,
        role,
      });
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

  private async findProjectUserOrThrow(pid: bigint, uid: bigint) {
    const po = await this.projectUserDao.findByProjectIdAndUserId(pid, uid);
    this.logger.info('find project user', po);
    if (!po) {
      throw new BusinessException(
        ResponseCode.NOT_FOUND,
        '项目或项目成员不存在',
      );
    }
    return po;
  }
}
