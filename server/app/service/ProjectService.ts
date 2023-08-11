import { AccessLevel, Inject, SingletonProto } from '@eggjs/tegg';
import { AbstractService } from './AbstractService';
import { ProjectUserDao } from 'app/dao/ProjectUserDao';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectService extends AbstractService {
  @Inject()
  private readonly projectUserDao: ProjectUserDao;

  async getMembers(pid: bigint) {
    return await this.projectUserDao.retrieveMembersByProjectId(pid);
  }
}
