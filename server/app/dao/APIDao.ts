import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { APIMapper } from 'app/mapper/APIMapper';
import APIBo from './bo/APIBo';
import { EggLogger } from 'typings/app';
import { APIHistoryDao } from './APIHistoryDao';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class APIDao {
  @Inject()
  private readonly logger: EggLogger;

  @Inject({
    name: 'APIMapper',
  })
  private readonly apiMapper: typeof APIMapper;

  @Inject()
  private readonly apiHistoryDao: APIHistoryDao;

  async retrieveAPIsByProjectId(pid: bigint) {
    const modles = await this.apiMapper.find({
      pid,
    });
    const APIs: APIBo[] = [];
    for (const modle of modles) {
      const po = modle as unknown as {
        aid: bigint;
        deleted: boolean;
      };
      // 跳过回收站中的 API
      if (po.deleted) {
        continue;
      }
      const details = await this.apiHistoryDao.findLatestByAid(po.aid);
      const API: APIBo = {
        ...po,
        details,
      };
      APIs.push(API);
    }
    this.logger.info('retrieve APIs by project id', APIs);
    return APIs;
  }
}
