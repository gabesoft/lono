import config from 'config';
import redis from 'redis';
import util from 'util';

const redisUrl = config.get('redis.url');

class RedisService {
  client: Object
  redisGet: Function
  redisSet: Function

  constructor() {
    const client = redis.createClient(redisUrl);

    this.client = client;
    this.redisGet = util.promisify(client.get).bind(client);
    this.redisSet = util.promisify(client.set).bind(client);
  }

  async getVal(key: string) {
    const val = await this.redisGet(key);
    return val ? JSON.parse(val) : val;
  }

  async setVal(key: string, raw: any, ttl: number = 0) {
    const val = JSON.stringify(raw);
    if (ttl > 0) {
      return await this.redisSet(key, val, 'EX', ttl);
    } else {
      return await this.redisSet(key, val);
    }
  }
}

export default new RedisService;