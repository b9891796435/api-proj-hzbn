import { Middleware } from '@eggjs/tegg';
import { Inject } from '@eggjs/tegg';
import { EggLogger } from 'egg';
import { ErrorHandlerMiddleware } from 'app/core/middleware/ErrorHandlerMiddleware';

@Middleware(ErrorHandlerMiddleware)
export abstract class AbstractController {
  @Inject()
  protected logger: EggLogger;
}
