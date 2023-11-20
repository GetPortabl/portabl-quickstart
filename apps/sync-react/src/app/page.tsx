'use client';
import axios from 'axios';
import SyncWithPortabl from '@portabl/react-sync-with-portabl';

import useMockAuthHeaders from '../hooks/useMockAuthHeaders.hook';

const API_BASE_URL = process.env.JS_APP_PUBLIC_API_HOST;
const WIDGET_BASE_URL = process.env.JS_APP_WIDGET_BASE_URL;
const PORTABL_ACCOUNT_ID = process.env.JS_APP_PORTABL_ACCOUNT_ID || '';

const INIT_DATA_SYNC_ROUTE = '/init-data-sync';
const SYNC_CONTEXT_ROUTE = '/sync-context';

export default function Web() {
  const { headers, generateNewHeaders } = useMockAuthHeaders();
  if (!headers) {
    return null;
  }

  return (
    <div className="sync-wrapper">
      <div className="user-id-wrapper">
        <div>Generate new user for testing demonstration</div>
        <button onClick={generateNewHeaders}>Generate New</button>
      </div>

      <h4>Portabl Sync - React</h4>

      <SyncWithPortabl
        accountId={PORTABL_ACCOUNT_ID}
        widgetBaseUrl={WIDGET_BASE_URL}
        getSyncContext={async () => {
          const { data } = await axios.get(`${API_BASE_URL}${SYNC_CONTEXT_ROUTE}`, {
            headers,
          });

          return data;
        }}
        prepareSync={async () => {
          const { data } = await axios.post(
            `${API_BASE_URL}${INIT_DATA_SYNC_ROUTE}`,
            {},
            {
              headers,
            },
          );

          return {
            invitationUrl: data.invitationUrl,
            isLinked: data.isLinked,
          };
        }}
      />
    </div>
  );
}
