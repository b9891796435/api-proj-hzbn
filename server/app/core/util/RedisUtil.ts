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
      const randomizedExpire = randomizeTimeout(expire);
      return await this.redis.setex(key, randomizedExpire, value);
    }
    return await this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async del(...keys: string[]) {
    return await this.redis.del(...keys);
  }

  async has(key: string) {
    return await this.redis.exists(key);
  }
}


// 随机化 key 过期时间，防止缓存雪崩
function randomizeTimeout(expire: number) {
  const min = 1;
  const max = expire / 5;
  return expire + (Math.random() * (max - min));
}
