import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import SyncButton from './components/SyncButton';
import defaultGenerateCorrelationId from './utils/default-generate-correlation-id.util';

const AUTH0_DOMAIN = 'dev-auth.getportabl.com';
const AUTH0_API_AUDIENCE = 'https://dev-api.getportabl.com';

export default function Sync({
  clientId,
  createDataSyncInvitation,
  getDataProfile,
  loadBackupData,
  generateCorrelationId = defaultGenerateCorrelationId,
}: {
  clientId: string;
  createDataSyncInvitation: ({ correlationId }: { correlationId: string }) => Promise<{ invitationUrl: string }>;
  getDataProfile: () => Promise<{ datapoints: Array<{ kind: string }> }>;
  loadBackupData: ({ correlationId }: { correlationId: string }) => Promise<void>;
  generateCorrelationId?: () => string;
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
        <SyncButton
          createDataSyncInvitation={createDataSyncInvitation}
          loadBackupData={loadBackupData}
          getDataProfile={getDataProfile}
          generateCorrelationId={generateCorrelationId}
        />
      </Auth0Provider>
    </MantineProvider>
  );
}
