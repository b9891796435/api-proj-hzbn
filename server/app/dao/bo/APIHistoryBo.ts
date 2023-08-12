export enum HTTPMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

export default interface APIHistoryBo {
  hid: bigint;
  path: string;
  method: HTTPMethodEnum;
  summary: string;
  parameters?: JSON;
  responses?: JSON;
  // 最后一次修改的用户
  uid: bigint;
  // 最后一次修改的时间
  time: Date;
}
