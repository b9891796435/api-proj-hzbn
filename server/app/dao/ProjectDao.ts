import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { APIHistoryMapper } from 'app/mapper/APIHistoryMapper';
import { APIMapper } from 'app/mapper/APIMapper';
import { ProjectMapper } from 'app/mapper/ProjectMapper';
import { ProjectUserMapper } from 'app/mapper/ProjectUserMapper';
import ProjectDto from 'app/service/dto/ProjectDto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class ProjectDao {
  @Inject({
    name: 'ProjectMapper',
  })
  private readonly projectMapper: typeof ProjectMapper;

  @Inject({
    name: 'ProjectUserMapper',
  })
  private readonly projectUserMapper: typeof ProjectUserMapper;

  @Inject({
    name: 'APIMapper',
  })
  private readonly apiMapper: typeof APIMapper;

  @Inject({
    name: 'APIHistoryMapper',
  })
  private readonly apiHistoryMapper: typeof APIHistoryMapper;

  async save(name: string) {
    return await this.projectMapper.create({
      name,
    });
  }

  async update(pid: bigint, updates: Partial<ProjectDto>) {
    await this.projectMapper.update({ pid }, updates);
  }

  async remove(pid: bigint) {
    await this.projectMapper.transaction(async trasnaction => {
      const apis = await this.apiMapper.find({ pid });
      for (const api of apis) {
        await this.apiHistoryMapper.remove({ aid: api.aid }, true, trasnaction);
      }
      await this.apiMapper.remove({ pid }, true, trasnaction);
      await this.projectUserMapper.remove({ pid }, true, trasnaction);
      await this.projectMapper.remove({ pid }, true, trasnaction);
    });
  }
}
