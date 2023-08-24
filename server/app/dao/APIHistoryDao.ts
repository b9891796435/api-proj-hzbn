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

  async findByHidAndAid(hid: bigint, aid: bigint) {
    return await this.apiHisotryMapper.findOne({ hid, aid });
  }

  async retrieveByAid(aid: bigint) {
    return await this.apiHisotryMapper.find({
      aid,
    });
  }

  async save(aid: bigint, uid: bigint, details: APIDto) {
    return await this.apiHisotryMapper.create({
      ...details,
      aid,
      uid,
    });
  }

  async removeWhereTimeGreaterThan(aid: bigint, time: Date) {
    await this.apiHisotryMapper.remove({
      aid,
      time: {
        $gt: time,
      },
    });
  }
}
