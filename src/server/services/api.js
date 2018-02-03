import config from 'config';
import request from 'request-promise-native';

import type { User } from 'types/User';

const apiHost = config.get('api.host');
const usersUri = `${apiHost}/users`;

class ApiService {
  async getUser(email: string): Promise<User> {
    const opts = {
      uri: `${usersUri}?where=(email eq "${email}")`,
      json: true
    };

    const users = await request(opts);
    return users[0];
  }

  async createUser(user: User): Promise<User> {
    return await request({
      uri: usersUri,
      method: 'POST',
      json: true,
      body: user
    });
  }
}

export default new ApiService;