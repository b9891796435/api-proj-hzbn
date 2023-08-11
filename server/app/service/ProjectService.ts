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
    const po = await this.projectUserDao.findByProjectIdAndUserId(pid, uid);
    this.logger.info('changeMemberRole', po);
    if (!po) {
      throw new BusinessException(ResponseCode.NOT_FOUND, '项目或项目成员不存在');
    }
    if (po.role === role) {
      return;
    }
    this.logger.info('changeMemberRole to', role);
    this.projectUserDao.update(po, { role });
  }
}
