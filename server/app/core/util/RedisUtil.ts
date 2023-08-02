import { SingletonProto, AccessLevel, Inject } from '@eggjs/tegg';
import type { Redis } from 'ioredis';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class RedisUtil {
  @Inject()
  redis: Redis;

  async set<T extends string | number | Buffer>(
    key: string,
    value: T,
    expire?: number,
  ) {
    if (expire && expire > 0) {
      // TODO：防止雪崩
      return this.redis.setex(key, expire, value);
    }
    return this.redis.set(key, value);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async del(...keys: string[]) {
    return this.redis.del(...keys);
  }

  async has(key: string) {
    return this.redis.exists(key);
  }
}
