import { Inject } from '@eggjs/tegg';
import { EggLogger, EggAppConfig } from 'egg';

export abstract class AbstractService {
  @Inject()
  protected readonly logger: EggLogger;

  @Inject()
  protected readonly config: EggAppConfig;
}
