import { ResponseCode } from './Response';

export default class BusinessException extends Error {
  public code: ResponseCode;

  constructor(code: ResponseCode, message: string) {
    super(message);
    this.name = 'BusinessException';
    this.code = code;
  }
}
