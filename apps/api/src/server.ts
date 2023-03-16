import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

import MOCKED_CLAIMS from './mocks/claims';
import MOCKED_NATIVE_USER_ID from './mocks/nativeUserId';

const PORTABL_CLIENT_ID = process.env.JS_APP_PUBLIC_PORTABL_CLIENT_ID;
const PORTABL_CLIENT_SECRET = process.env.PORTABL_CLIENT_SECRET;
const PORTABL_ENV = process.env.PORTABL_ENV;

if (typeof PORTABL_CLIENT_ID !== 'string') {
  throw new Error('No CLIENT_ID was provided in .env');
}

if (typeof PORTABL_CLIENT_SECRET !== 'string') {
  throw new Error('No CLIENT_SECRET was provided in .env');
}

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/access-token', async (req, res, next) => {
      try {
        const response = await axios.post(`https://baoportabl-api.ngrok.io/api/v1/provider/data-sync/token`, {
          grantType: 'client_credentials',
          clientId: PORTABL_CLIENT_ID,
          clientSecret: PORTABL_CLIENT_SECRET,
          audience: 'https://dev-api.getportabl.com',
          env: PORTABL_ENV,
          correlationIdInput: 'abc123',
          scope: [
            'read:credential-manifests',
            'create:didcomm-messages',
            'update:didcomm-threads',
            'create:verifiable-documents',
          ].join(' '),
        });
        res.status(200).json({ accessToken: response.data.accessToken });
      } catch (e) {
        console.log('ERROR', e);
        next(e);
      }
    })
    .post('/load-backup-data', async (req, res, next) => {
      try {
        const accessToken = req.body.accessToken;
        // Make a request to get claims from internal APIs
        const claims = MOCKED_CLAIMS;
        // Make a request to get the native user id from internal APIs
        const nativeUserId: string = MOCKED_NATIVE_USER_ID;

        await axios.post(
          `https://baoportabl-api.ngrok.io/api/v1/provider/data-sync/load-data`,
          {
            nativeUserId,
            claims,
          },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );

        return res.json({});
      } catch (e) {
        next(e);
      }
    })
    .get('/healthz', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
