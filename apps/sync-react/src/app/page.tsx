'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import SyncWithPortabl from '@portabl/react-sync-with-portabl';

import useMockAuthHeaders from '../hooks/useMockAuthHeaders.hook';

const API_BASE_URL = process.env.JS_APP_PUBLIC_API_HOST;
const WIDGET_BASE_URL = process.env.JS_APP_WIDGET_BASE_URL;
const PREPARE_SYNC = '/prepare-sync';
const SYNC_CONTEXT = '/sync-context';

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
        widgetBaseUrl={WIDGET_BASE_URL}
        getSyncContext={async () => {
          const { data } = await axios.get(`${API_BASE_URL}${SYNC_CONTEXT}`, {
            headers,
          });

          return data;
        }}
        prepareSync={async () => {
          const { data } = await axios.post(
            `${API_BASE_URL}${PREPARE_SYNC}`,
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
