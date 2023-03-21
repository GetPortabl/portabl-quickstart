import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

import MOCKED_CLAIMS from './mocks/claims';
import MOCKED_NATIVE_USER_ID from './mocks/nativeUserId';

const PORTABL_CLIENT_ID = process.env.PORTABL_CLIENT_ID;
const PORTABL_CLIENT_SECRET = process.env.PORTABL_CLIENT_SECRET;
const PORTABL_ENV = process.env.PORTABL_ENV;

let ACCESS_TOKEN: string;

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
    .use(async (req, res, next) => {
      if (!ACCESS_TOKEN) {
        try {
          const response = await axios.post(`https://portabl-ben-api.ngrok.io/api/v1/provider/data-sync/token`, {
            grantType: 'client_credentials',
            clientId: PORTABL_CLIENT_ID,
            clientSecret: PORTABL_CLIENT_SECRET,
            audience: 'https://dev-api.getportabl.com',
            env: PORTABL_ENV,
            scope: [
              'read:credential-manifests',
              'create:didcomm-messages',
              'update:didcomm-threads',
              'create:verifiable-documents',
            ].join(' '),
          });

          ACCESS_TOKEN = response.data.accessToken;
          console.log(ACCESS_TOKEN);
          next();
        } catch (e) {
          console.log('ERROR', e);
          next(e);
        }
      } else {
        next();
      }
    })
    .post('/load-backup-data', async (req, res, next) => {
      try {
        // Make a request to get claims from internal APIs
        const claims = MOCKED_CLAIMS;
        // Make a request to get the native user id from internal APIs
        const nativeUserId: string = MOCKED_NATIVE_USER_ID;

        await axios.post(
          `https://portabl-ben-api.ngrok.io/api/v1/provider/data-sync/load-data`,
          {
            nativeUserId,
            claims,
          },
          {
            headers: {
              authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          },
        );

        return res.json({});
      } catch (e) {
        next(e);
      }
    })
    .get('/data-profile', async (req, res, next) => {
      try {
        const { data } = await axios.get(`https://portabl-ben-api.ngrok.io/api/v1/provider/data-profiles`, {
          headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        // Data Profiles will return an array of all your profiles. We want to retreive the latest one.
        const latestdataProfile = data.dataProfiles?.[0];

        // If there is no dataProfile we will error, since you can not perform sync without this configured.
        if (!latestdataProfile) {
          throw new Error('dataProfile must be configured');
        }

        return res.json(latestdataProfile);
      } catch (e) {
        next(e);
      }
    })
    .post('/create-data-sync-invitation', async (req, res, next) => {
      try {
        const { data } = await axios.post(
          `https://portabl-ben-api.ngrok.io/api/v1/provider/data-sync/create-invitation`,
          {
            dataSyncSessionId: req.body.correlationId,
            nativeUserId: MOCKED_NATIVE_USER_ID,
          },
          {
            headers: {
              authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          },
        );

        setTimeout(async () => {
          axios.post(
            `https://portabl-ben-api.ngrok.io/api/v1/provider/data-sync/start`,
            {
              dataSyncSessionId: req.body.correlationId,
            },
            {
              headers: {
                authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            },
          );
        }, 10000);

        return res.json(data);
      } catch (e) {
        next(e);
      }
    })
    .get('/healthz', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
