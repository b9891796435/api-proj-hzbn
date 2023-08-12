import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { APIMapper } from 'app/mapper/APIMapper';
import APIBo from './bo/APIBo';
import { EggLogger } from 'typings/app';
import { APIHistoryDao } from './APIHistoryDao';
import APIDto from 'app/service/dto/APIDto';
import APIPo from 'app/mapper/po/APIPo';

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

  async save(pid: bigint, uid: bigint, details: APIDto) {
    const po = await this.apiMapper.create({
      pid,
      deleted: false,
    });
    await this.apiHistoryDao.save(po.aid, uid, details);
  }

  async update(aid: bigint, update: Partial<APIPo>) {
    await this.apiMapper.update(
      {
        aid,
      },
      update,
    );
  }
}
