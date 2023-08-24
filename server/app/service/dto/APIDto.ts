import { HTTPMethodEnum } from 'app/dao/bo/APIHistoryBo';

export default interface APIDto {
  path: string;
  summary: string;
  method: HTTPMethodEnum;
  parameters?: JSON;
  responses?: JSON;
}
