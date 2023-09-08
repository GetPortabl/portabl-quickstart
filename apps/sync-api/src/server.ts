import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

import { MOCKED_DATAPOINTS } from './mocks/datapoints';

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

const getUserIdFromRequest = (req: Request) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new Error('Unauthorized');
  }

  const [, token] = auth.split(' ');
  return Buffer.from(token, 'base64').toString();
};

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(async (req, res, next) => {
      // if (!ACCESS_TOKEN) {
      try {
        const response = await axios.post(`${baseUrl}/provider/token`, {
          clientId: PORTABL_CLIENT_ID,
          clientSecret: PORTABL_CLIENT_SECRET,
        });

        ACCESS_TOKEN = response.data.accessToken;
        next();
      } catch (e) {
        console.error('AUTH ERROR', e);
        next(e);
      }
      // } else {
      //   next();
      // }
    })
    .get('/datapoints', async (req, res, next) => {
      let datapointsLatest;
      try {
        const userId = getUserIdFromRequest(req);

        const fetchDatapointsResult = await axios.get(`${baseUrl}/provider/users/${userId}/datapoints`, {
          headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        console.log(`Fetch User's Datapoints result`, {
          status: fetchDatapointsResult?.status,
          data: fetchDatapointsResult?.data,
        });

        datapointsLatest = fetchDatapointsResult?.data?.syncContext?.claimsLatest || MOCKED_DATAPOINTS;
      } catch (e) {
        console.error(`Fetch User's Datapoints error`, e);
        console.error(e, ACCESS_TOKEN);
        datapointsLatest = MOCKED_DATAPOINTS;
      }

      return res.json(datapointsLatest);
    })
    .patch('/datapoints', async (req, res, next) => {
      try {
        const userId = getUserIdFromRequest(req);

        const patchDatapointsResult = await axios.patch(`${baseUrl}/provider/users/${userId}/datapoints`, req.body, {
          headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
        });

        console.log(`Patch User's Datapoints result`, {
          status: patchDatapointsResult?.status,
          data: patchDatapointsResult?.data,
        });

        return res.json({ ok: true });
      } catch (e) {
        console.error(`Patch User's Datapoints error`, e);
        next(e);
      }
    })
    .get('/sync-context', async (req, res, next) => {
      try {
        const userId = getUserIdFromRequest(req);

        const fetchUserDataSyncContextResult = await axios.get(`${baseUrl}/provider/users/${userId}/sync-context`, {
          headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        console.log(`Fetch User's DataSync Context result`, {
          status: fetchUserDataSyncContextResult?.status,
          data: fetchUserDataSyncContextResult?.data,
        });

        return res.json(fetchUserDataSyncContextResult.data);
      } catch (e) {
        console.error(`Fetch User's DataSync Context error`, e);
        next(e);
      }
    })
    .post('/init-data-sync', async (req, res, next) => {
      try {
        const userId = getUserIdFromRequest(req);

        await axios.put(
          `${baseUrl}/provider/users/${userId}`,
          { settings: { isSyncOn: true } },
          { headers: { authorization: `Bearer ${ACCESS_TOKEN}` } },
        );

        const { data: createUserInvitationResult } = await axios.post(
          `${baseUrl}/provider/users/${userId}/invite`,
          {},
          { headers: { authorization: `Bearer ${ACCESS_TOKEN}` } },
        );

        const datapoints = MOCKED_DATAPOINTS;

        const patchedDatapointsResult = await axios.patch(
          `${baseUrl}/provider/users/${userId}/datapoints`,
          { datapoints },
          { headers: { authorization: `Bearer ${ACCESS_TOKEN}` } },
        );
        console.log(`Patch User's Datapoints result`, {
          status: patchedDatapointsResult?.status,
          data: patchedDatapointsResult?.data,
        });

        return res.json(createUserInvitationResult);
      } catch (e) {
        console.error('Init DataSync error', e);
        next(e);
      }
    })
    .get('/healthz', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
