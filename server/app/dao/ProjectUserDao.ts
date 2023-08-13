import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { ProjectUserMapper } from 'app/mapper/ProjectUserMapper';
import ProjectUserPo from 'app/mapper/po/ProjectUserPo';
import { UserDao } from './UserDao';
import ProjectUserBo from './bo/ProjectUserBo';
import { ProjectDao } from './ProjectDao';
import ProjectDto from 'app/service/dto/ProjectDto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectUserDao {

  @Inject({
    name: 'ProjectUserMapper',
  })
  private readonly projectUserMapper: typeof ProjectUserMapper;

  @Inject()
  private readonly userDao: UserDao;

  @Inject()
  private readonly projectDao: ProjectDao;

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
    return members;
  }

  async retrieveProjectsByUserIdAndOffsetAndLimit(uid: bigint, offset: number, limit: number) {
    const count = await this.projectUserMapper.find({ uid }).count();
    const modles = await this.projectUserMapper
      .find({
        uid,
      })
      .offset(offset)
      .limit(limit);
    const projects: ProjectDto[] = [];
    for (const modle of modles) {
      projects.push(await this.projectDao.findById(modle.pid) as ProjectDto);
    }
    return {
      count,
      projects,
    };
  }


  async findByProjectIdAndUserId(pid: bigint, uid: bigint) {
    const modle = await this.projectUserMapper.findOne({
      pid,
      uid,
    });
    return modle as unknown as ProjectUserPo;
  }

  async save(po: ProjectUserPo) {
    await this.projectUserMapper.create(po);
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

  async remove(po: ProjectUserPo) {
    await this.projectUserMapper.remove(
      {
        uid: po.uid,
        pid: po.pid,
      },
      true,
    );
  }
}
