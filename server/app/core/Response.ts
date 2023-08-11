enum ResponseCode {
  // 成功
  SUCCESS = 200,

  // 资源相关
  BAD_REQUEST = 400,
  FORBIDDEN = 401,
  NOT_FOUND = 402,
  DUPLICATE_RESOURCE = 403,

  // 服务器相关
  SERVER_ERROR = 500,

  // 用户相关
  UNAUTHORIZED = 600,
  INVALID_PASSWORD = 601,
}

class Response<T> {
  public code: ResponseCode;
  public message: string;
  public data: T | null;

  constructor(code: ResponseCode, message: string, data: T | null = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public static success<T>(data: T | null = null): Response<T> {
    return new Response<T>(ResponseCode.SUCCESS, 'success', data);
  }

  public static notFound<T>(message: string): Response<T> {
    return new Response<T>(ResponseCode.NOT_FOUND, message, null);
  }

  public static unauthorized<T>(message: string): Response<T> {
    return new Response<T>(ResponseCode.UNAUTHORIZED, message, null);
  }

  public static forbidden<T>(message: string): Response<T> {
    return new Response<T>(ResponseCode.FORBIDDEN, message, null);
  }

  public static badRequest<T>(message: string): Response<T> {
    return new Response<T>(ResponseCode.BAD_REQUEST, message, null);
  }

  public static serverError<T>(): Response<T> {
    return new Response<T>(ResponseCode.SERVER_ERROR, '', null);
  }
}

export { ResponseCode };
export default Response;
