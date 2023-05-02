const API_BASE_URL = window._env_.JS_APP_PUBLIC_API_HOST;
const CLIENT_ID = window._env_.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID;
const DOMAIN = window._env_.JS_APP_AUTH0_DOMAIN;
const AUDIENCE = window._env_.JS_APP_AUTH0_API_AUDIENCE;
const PASSPORT_URL = window._env_.JS_APP_PUBLIC_PASSPORT_URL;
const SYNC_ACCEPT_URL = window._env_.JS_APP_PUBLIC_SYNC_ACCEPT_URL;
const USER_CONSENT = '/user-consent';
const SYNC_PREREQS = '/sync-prereqs';

// MOCK_USER_ID should be a unique user id to identify users within the Portabl system
let MOCK_USER_ID = localStorage.getItem('MOCK_USER_ID');
if (!MOCK_USER_ID) {
  MOCK_USER_ID = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', MOCK_USER_ID);
}

async function initPortabl(mockUserId) {
  let MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };

  await Portabl.createSyncWithPortabl({
    envOverride: {
      domain: DOMAIN,
      audience: AUDIENCE,
      passportUrl: PASSPORT_URL,
      syncAcceptUrl: SYNC_ACCEPT_URL,
    },
    rootSelector: '#portabl-sync-root',
    clientId: CLIENT_ID,
    getPrereqs: async () => {
      const { data } = await axios.get(`${API_BASE_URL}${SYNC_PREREQS}`, {
        headers: MOCK_HEADERS_WITH_AUTH,
      });
      return data;
    },
    onUserConsent: async () => {
      const { data } = await axios.post(
        `${API_BASE_URL}${USER_CONSENT}`,
        {},
        {
          headers: MOCK_HEADERS_WITH_AUTH,
        },
      );

      return data.invitationUrl;
    },
  });
}

await initPortabl(MOCK_USER_ID);

document.getElementById('generate-new-user').addEventListener('click', async () => {
  const newMockUserId = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', newMockUserId);
  MOCK_USER_ID = newMockUserId;
  await initPortabl(MOCK_USER_ID);
});
