import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .post('/decision', async (_, res) => {
      return res.json({ userStatus: 'Registered', userId: '0000-0000-0000-0001' });
    })
    .get('/healthz', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
