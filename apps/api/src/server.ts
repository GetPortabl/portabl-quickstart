import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

import {
  EnvType,
  IEvidence,
  IAuthenticateBackupSessionRequestDto,
  IAuthenticateBackupSessionResponseDto,
  ILoadBackupDataRequestDto,
  ILoadBackupDataResponseDto,
  IKYCClaimsInput,
} from './interfaces';
import { MOCKED_CLAIMS } from './mocks/claims';
import { MOCKED_EVIDENCES } from './mocks/evidences';
import { MOCKED_NATIVE_USER_ID } from './mocks/nativeUserId';

const PORTABL_CLIENT_ID = process.env.PORTABL_CLIENT_ID;
const PORTABL_CLIENT_SECRET = process.env.PORTABL_CLIENT_SECRET;
const PORTABL_ENV = process.env.PORTABL_ENV as EnvType;

if (typeof PORTABL_CLIENT_ID !== 'string') {
  throw new Error('No CLIENT_ID was provided in .env');
}

if (typeof PORTABL_CLIENT_SECRET !== 'string') {
  throw new Error('No CLIENT_SECRET was provided in .env');
}

const PORTABL_API_DOMAIN_URL: Record<EnvType, string> = {
  dev: 'https://dev-api.getportabl.com/api/v1',
  production: 'https://api.getportabl.com/api/v1',
};
const PORTABL_API_BASE_URL: string = PORTABL_API_DOMAIN_URL[PORTABL_ENV];

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .post('/backup-sessions/authenticate', async (req, res, next) => {
      try {
        // Authenticate backup by generating an access token with correlation id for a backup session
        const requestUrl = `${PORTABL_API_BASE_URL}/provider/backup-sessions/authenticate`;
        const requestBody: IAuthenticateBackupSessionRequestDto = {
          env: PORTABL_ENV,
          clientId: PORTABL_CLIENT_ID,
          clientSecret: PORTABL_CLIENT_SECRET,
        };
        const { data } = await axios.post<IAuthenticateBackupSessionResponseDto>(requestUrl, requestBody);

        // Response body SHALL include an "accessToken" property with an access token.
        return res.json({ accessToken: data?.accessToken });
      } catch (error) {
        console.error('Error on backup authenticatation', error);
        next(error);
      }
    })
    .post('/backup-sessions/load-data', async (req, res, next) => {
      try {
        // Pass native user ID via API request params or identify it within your API logic
        const { accessToken, nativeUserId = MOCKED_NATIVE_USER_ID } = req.body;

        // Make a request to get user claims from internal APIs
        const claims: IKYCClaimsInput = MOCKED_CLAIMS;

        // Make a request to get user evidence from internal APIs
        const evidences: Array<IEvidence> = MOCKED_EVIDENCES;

        // Load backup data of your user
        const requestUrl = `${PORTABL_API_BASE_URL}/provider/backup-sessions/load-data`;
        const requestBody: ILoadBackupDataRequestDto = { nativeUserId, claims, evidences };
        const {
          data: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            verifiableDocument,
          },
        } = await axios.post<ILoadBackupDataResponseDto>(requestUrl, requestBody, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        return res.json({});
      } catch (error) {
        console.error('Error on backup data loading', error);
        next(error);
      }
    })
    .get('/healthz', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
