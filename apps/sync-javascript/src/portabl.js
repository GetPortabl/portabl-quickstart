const API_BASE_URL = window._env_.JS_APP_PUBLIC_API_HOST;
const WIDGET_BASE_URL = window._env_.JS_APP_WIDGET_BASE_URL;
const PORTABL_ACCOUNT_ID = window._env_.JS_APP_PORTABL_ACCOUNT_ID;

const INIT_DATA_SYNC_ROUTE = '/init-data-sync';
const DATA_SYNC_CONTEXT_ROUTE = '/data-sync/context';
const DATAPOINTS_ROUTE = '/datapoints';

// MOCK_USER_ID should be a unique user id to identify users within the Portabl system
let MOCK_USER_ID = localStorage.getItem('MOCK_USER_ID');
if (!MOCK_USER_ID) {
  MOCK_USER_ID = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', MOCK_USER_ID);
}

async function createMockProviderInputs(mockUserId) {
  let MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };
  const { data: datapoints } = await axios.get(`${API_BASE_URL}${DATAPOINTS_ROUTE}`, {
    headers: MOCK_HEADERS_WITH_AUTH,
  });

  const datapointForm = document.querySelector('.datapoint-form');

  const inputs = [...datapointForm.querySelectorAll('input[data-datapoint-key]')];

  inputs.forEach((inputEl) => {
    const datapointKey = inputEl.dataset['datapointKey'];
    inputEl.value = _.get(datapoints, datapointKey) || '';
  });

  datapointForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datapoints = inputs.reduce((agg, inputEl) => {
      const datapointKey = inputEl.dataset['datapointKey'];

      if (!datapointKey) {
        return agg;
      }

      const mutatedAgg = { ...agg };

      if (inputEl.value) {
        _.set(mutatedAgg, datapointKey, inputEl.value);
      }

      return mutatedAgg;
    }, {});

    await axios.patch(
      `${API_BASE_URL}${DATAPOINTS_ROUTE}`,
      { datapoints, autoSync: true },
      {
        headers: MOCK_HEADERS_WITH_AUTH,
      },
    );
  });
}

async function initPortabl(mockUserId) {
  let MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };

  await Portabl.sync.createSyncWithPortabl({
    root: '#portabl-sync-root',
    widgetBaseUrl: WIDGET_BASE_URL,
    accountId: PORTABL_ACCOUNT_ID,
    getSyncContext: async () => {
      const { data } = await axios.get(`${API_BASE_URL}${DATA_SYNC_CONTEXT_ROUTE}`, {
        headers: MOCK_HEADERS_WITH_AUTH,
      });

      return data;
    },
    prepareSync: async () => {
      const { data } = await axios.post(
        `${API_BASE_URL}${INIT_DATA_SYNC_ROUTE}`,
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
await createMockProviderInputs(MOCK_USER_ID);

document.getElementById('generate-new-user').addEventListener('click', async () => {
  const newMockUserId = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', newMockUserId);
  MOCK_USER_ID = newMockUserId;
  await initPortabl(MOCK_USER_ID);
  await createMockProviderInputs(MOCK_USER_ID);
});
