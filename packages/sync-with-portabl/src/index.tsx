import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import SyncButton from './components/SyncButton';

const AUTH0_DOMAIN = 'dev-auth.getportabl.com';
const AUTH0_API_AUDIENCE = 'https://dev-api.getportabl.com';

export default function Sync({
  getAccessToken,
  loadBackupData,
  clientId,
}: {
  getAccessToken: () => Promise<{ accessToken: string }>;
  loadBackupData: ({ accessToken }: { accessToken: string }) => Promise<void>;
  clientId: string;
}) {
  return (
    <MantineProvider>
      <Auth0Provider
        cacheLocation="localstorage"
        domain={AUTH0_DOMAIN}
        clientId={clientId}
        // onRedirectCallback={onRedirectCallback}
        useRefreshTokens
        authorizationParams={{
          audience: AUTH0_API_AUDIENCE,
        }}
      >
        <SyncButton getAccessToken={getAccessToken} loadBackupData={loadBackupData} />
      </Auth0Provider>
    </MantineProvider>
  );
}
