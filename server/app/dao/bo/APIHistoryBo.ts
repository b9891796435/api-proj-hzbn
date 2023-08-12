export default interface APIHistoryBo {
  hid: bigint;
  path: string;
  method: string;
  summary: string;
  parameters: JSON;
  responses: JSON;
  // 最后一次修改的用户
  uid: bigint;
  // 最后一次修改的时间
  time: Date;
}
