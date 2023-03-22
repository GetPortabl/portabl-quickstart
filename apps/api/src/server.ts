import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

import MOCKED_CLAIMS from './mocks/claims';
import MOCKED_NATIVE_USER_ID from './mocks/nativeUserId';

const PORTABL_API_DOMAIN = process.env.PORTABL_API_DOMAIN;
const PORTABL_CLIENT_ID = process.env.PORTABL_CLIENT_ID;
const PORTABL_CLIENT_SECRET = process.env.PORTABL_CLIENT_SECRET;

let ACCESS_TOKEN: string;

if (typeof PORTABL_CLIENT_ID !== 'string') {
  throw new Error('No CLIENT_ID was provided in .env');
}

if (typeof PORTABL_CLIENT_SECRET !== 'string') {
  throw new Error('No CLIENT_SECRET was provided in .env');
}

const baseUrl = `${PORTABL_API_DOMAIN}/api/v1`;

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
          const response = await axios.post(`${baseUrl}/provider/data-sync/token`, {
            clientId: PORTABL_CLIENT_ID,
            clientSecret: PORTABL_CLIENT_SECRET,
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
          `${baseUrl}/provider/data-sync/load-data`,
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
        const { data } = await axios.get(`${baseUrl}/provider/data-profiles`, {
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
          `${baseUrl}/provider/data-sync/create-invitation`,
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
            `${baseUrl}/provider/data-sync/start`,
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
