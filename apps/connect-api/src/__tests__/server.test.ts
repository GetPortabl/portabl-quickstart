import supertest from 'supertest';
import { createServer } from '../server';

describe('server', () => {
  it('health check returns 200', async () => {
    await supertest(createServer())
      .get('/healthz')
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  it('message endpoint says hello', async () => {
    await supertest(createServer())
      .post('/decision')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ userStatus: 'Registered', userId: '0000-0000-0000-0001' });
      });
  });
});
