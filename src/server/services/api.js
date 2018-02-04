import config from 'config';
import request from 'request-promise-native';

import type { User } from 'types/User';

const apiHost = config.get('api.host');
const usersUri = `${apiHost}/users`;

const removeHeaders = [ 'Transfer-Encoding', 'Server', 'Date', 'Link' ];

class ApiService {
  async getUser(email: string): Promise<User> {
    const query = { where: `(email eq "${email}")` };
    const { body } = await this.get('/users', query);
    return body[0];
  }

  async createUser(user: User): Promise<User> {
    const { body } = await this.post('/users', user);
    return body;
  }

  async get(path: string, query: Object | string): Promise<any> {
    const { body, rawHeaders } = await request({
      json: true,
      method: 'GET',
      qs: query,
      resolveWithFullResponse: true,
      uri: `${apiHost}${path}`
    });

    return { body, headers: this.getHeaders(rawHeaders) };
  }

  async post(path: string, data?: Object, query?: Object | string): Promise<any> {
    const { body, rawHeaders } = await request({
      body: data,
      json: true,
      method: 'POST',
      qs: query,
      resolveWithFullResponse: true,
      uri: usersUri
    });

    return { body, headers: this.getHeaders(rawHeaders) };
  }

  getHeaders(rawHeaders: Array<string>): Object {
    const headers = {};

    for (let i = 0; i < rawHeaders.length; i += 2) {
      if (!removeHeaders.includes(rawHeaders[i])) {
        headers[rawHeaders[i]] = rawHeaders[i + 1];
      }
    }

    return headers;
  }
}

export default new ApiService;