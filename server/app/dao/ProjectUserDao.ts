import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { EggLogger } from 'egg';
import { ProjectUserMapper } from 'app/mapper/ProjectUserMapper';
import ProjectUserPo from 'app/mapper/po/ProjectUserPo';
import { UserDao } from './UserDao';
import ProjectUserBo from './bo/ProjectUserBo';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectUserDao {
  @Inject()
  private readonly logger: EggLogger;

  @Inject({
    name: 'ProjectUserMapper',
  })
  private readonly projectUserMapper: typeof ProjectUserMapper;

  @Inject()
  private readonly userDao: UserDao;

  async retrieveMembersByProjectId(pid: bigint) {
    const modles = await this.projectUserMapper.find({
      pid,
    });
    const members: ProjectUserBo[] = [];
    for (const modle of modles) {
      const po = modle as unknown as ProjectUserPo;
      const userBo = await this.userDao.findById(po.uid);
      members.push({
        uid: userBo.uid,
        username: userBo.username,
        role: po.role,
      });
    }
    this.logger.info('retrieveMembersByProjectId', members);
    return members;
  }

  async findByProjectIdAndUserId(pid: bigint, uid: bigint) {
    const modle = await this.projectUserMapper.findOne({
      pid,
      uid,
    });
    return modle as unknown as ProjectUserPo;
  }

  async update(po: ProjectUserPo, update: Partial<ProjectUserPo>) {
    await this.projectUserMapper.update(
      {
        uid: po.uid,
        pid: po.pid,
      },
      update,
    );
  }
}
