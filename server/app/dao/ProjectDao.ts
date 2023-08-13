import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { ProjectMapper } from 'app/mapper/ProjectMapper';

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
}
