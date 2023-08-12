import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { APIHistoryMapper } from 'app/mapper/APIHistoryMapper';
import APIHistoryBo from './bo/APIHistoryBo';
import APIDto from 'app/service/dto/APIDto';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class APIHistoryDao {
  @Inject({
    name: 'APIHistoryMapper',
  })
  private readonly apiHisotryMapper: typeof APIHistoryMapper;

  async findLatestByAid(aid: bigint) {
    return (await this.apiHisotryMapper
      .findOne({ aid })
      .order('time', 'desc')) as unknown as APIHistoryBo;
  }

  async save(aid: bigint, uid: bigint, details: APIDto) {
    await this.apiHisotryMapper.create({
      ...details,
      aid,
      uid,
    });
  }
}
