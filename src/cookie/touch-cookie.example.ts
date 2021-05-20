import axios from 'axios';
import nock from 'nock';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';

/*
const cookie = Cookie.fromJSON({
  key: 'key',
  value: 'value',
  path: '/',
  domain: 'my-domain.com',
});
*/

const cookieJar = new CookieJar();
const client = axios.create({
  headers: {
    'User-Agent': 'axios',
  },
  withCredentials: true,
});
axiosCookieJarSupport(client);
client.defaults.jar = cookieJar;

(async (): Promise<void> => {
  nock('https://subdomain.my-domain.com')
    .post('/')
    .reply(200, { hello: 'world' }, { 'Set-Cookie': 'key1=value1; Path=/;' });

  const cookie = Cookie.parse('key=value');
  cookie.domain = 'my-domain.com';
  cookieJar.setCookieSync(cookie, 'https://my-domain.com');
  // console.log(cookieJar);
  const { request } = await client.post('https://subdomain.my-domain.com');
  console.log(request.headers);
  console.log(cookieJar);
})();
