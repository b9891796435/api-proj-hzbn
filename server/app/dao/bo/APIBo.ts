import APIHistoryBo from './APIHistoryBo';

export default interface APIBo {
  aid: bigint;
  deleted: boolean;
  details: APIHistoryBo;
}
