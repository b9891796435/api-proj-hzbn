import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { ProjectMapper } from 'app/mapper/ProjectMapper';
import ProjectDto from 'app/service/dto/ProjectDto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectDao {
  @Inject({
    name: 'ProjectMapper',
  })
  private readonly projectMapper: typeof ProjectMapper;

  async save(name: string) {
    return await this.projectMapper.create({
      name,
    });
  }

  async update(pid: bigint, updates: Partial<ProjectDto>) {
    await this.projectMapper.update({ pid }, updates);
  }
}
