enum ResponseCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
}

class Response<T> {
  public code: ResponseCode;
  public message: string;
  public data: T | null;

  constructor(code: ResponseCode, message: string, data: T | null) {
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
}

export { ResponseCode };
export default Response;
