const API_BASE_URL = window._env_.JS_APP_PUBLIC_API_HOST;
const WIDGET_BASE_URL = window._env_.JS_APP_WIDGET_BASE_URL;
const PREPARE_SYNC = '/prepare-sync';
const SYNC_CONTEXT = '/sync-context';

// MOCK_USER_ID should be a unique user id to identify users within the Portabl system
let MOCK_USER_ID = localStorage.getItem('MOCK_USER_ID');
if (!MOCK_USER_ID) {
  MOCK_USER_ID = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', MOCK_USER_ID);
}

async function initPortabl(mockUserId) {
  let MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };

  await Portabl.createSyncWithPortabl({
    rootSelector: '#portabl-sync-root',
    widgetBaseUrl: WIDGET_BASE_URL,
    getSyncContext: async () => {
      const { data } = await axios.get(`${API_BASE_URL}${SYNC_CONTEXT}`, {
        headers: MOCK_HEADERS_WITH_AUTH,
      });

      return data;
    },
    prepareSync: async () => {
      const { data } = await axios.post(
        `${API_BASE_URL}${PREPARE_SYNC}`,
        {},
        {
          headers: MOCK_HEADERS_WITH_AUTH,
        },
      );

      return {
        invitationUrl: data.invitationUrl,
        isLinked: data.isLinked,
      };
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
