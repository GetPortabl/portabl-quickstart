const API_BASE_URL = window._env_.JS_APP_PUBLIC_API_HOST;
const WIDGET_BASE_URL = window._env_.JS_APP_WIDGET_BASE_URL;
const PREPARE_SYNC = '/prepare-sync';
const SYNC_CONTEXT = '/sync-context';
const CLAIMS = '/claims';
const UPDATE_CLAIMS = '/update-claims';

// MOCK_USER_ID should be a unique user id to identify users within the Portabl system
let MOCK_USER_ID = localStorage.getItem('MOCK_USER_ID');
if (!MOCK_USER_ID) {
  MOCK_USER_ID = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', MOCK_USER_ID);
}
async function createMockProviderInputs(mockUserId) {
  const MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };

  const { data: claims } = await axios.get(`${API_BASE_URL}${CLAIMS}`, {
    headers: MOCK_HEADERS_WITH_AUTH,
  });

  const claimForm = document.querySelector('.claim-form');

  const firstNameInputEl = claimForm.querySelector("input[data-claim-key='firstName']");
  firstNameInputEl.value = claims.firstName || '';

  const lastNameInputEl = claimForm.querySelector("input[data-claim-key='lastName']");
  lastNameInputEl.value = claims.lastName || '';

  const emailAddressInputEl = claimForm.querySelector("input[data-claim-key='emailAddress']");
  emailAddressInputEl.value = claims.emailAddress || '';

  const phoneNumberInputEl = claimForm.querySelector("input[data-claim-key='phoneNumber']");
  phoneNumberInputEl.value = claims.phoneNumber || '';

  const residentialAddressStreetAddressInputEl = claimForm.querySelector(
    "input[data-claim-key='residentialAddressStreetAddress']",
  );
  residentialAddressStreetAddressInputEl.value = claims.residentialAddressStreetAddress || '';

  const residentialAddressLocalityInputEl = claimForm.querySelector(
    "input[data-claim-key='residentialAddressLocality']",
  );
  residentialAddressLocalityInputEl.value = claims.residentialAddressLocality || '';

  const residentialAddressPostalCodeInputEl = claimForm.querySelector(
    "input[data-claim-key='residentialAddressPostalCode']",
  );
  residentialAddressPostalCodeInputEl.value = claims.residentialAddressPostalCode || '';

  const residentialAddressRegionInputEl = claimForm.querySelector("input[data-claim-key='residentialAddressRegion']");
  residentialAddressRegionInputEl.value = claims.residentialAddressRegion || '';

  const residentialAddressCountryInputEl = claimForm.querySelector("input[data-claim-key='residentialAddressCountry']");
  residentialAddressCountryInputEl.value = claims.residentialAddressCountry || '';

  claimForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const requestBody = {
      ...(firstNameInputEl.value ? { firstName: firstNameInputEl.value } : {}),
      ...(lastNameInputEl.value ? { lastName: lastNameInputEl.value } : {}),
      ...(emailAddressInputEl.value ? { emailAddress: emailAddressInputEl.value } : {}),
      ...(phoneNumberInputEl.value ? { phoneNumber: phoneNumberInputEl.value } : {}),
    };

    if (
      residentialAddressStreetAddressInputEl.value ||
      residentialAddressLocalityInputEl.value ||
      residentialAddressPostalCodeInputEl.value ||
      residentialAddressRegionInputEl.value ||
      residentialAddressCountryInputEl.value
    ) {
      requestBody.residentialAddress = {};

      if (residentialAddressStreetAddressInputEl.value) {
        requestBody.residentialAddress.streetAddress = residentialAddressStreetAddressInputEl.value;
      }
      if (residentialAddressLocalityInputEl.value) {
        requestBody.residentialAddress.locality = residentialAddressLocalityInputEl.value;
      }
      if (residentialAddressPostalCodeInputEl.value) {
        requestBody.residentialAddress.postalCode = residentialAddressPostalCodeInputEl.value;
      }
      if (residentialAddressRegionInputEl.value) {
        requestBody.residentialAddress.region = residentialAddressRegionInputEl.value;
      }
      if (residentialAddressCountryInputEl.value) {
        requestBody.residentialAddress.country = residentialAddressCountryInputEl.value;
      }
    }

    // Updating claims for a user who has turned sync on
    // will initialize data synchronization with the newly
    // updated values
    await axios.post(`${API_BASE_URL}${UPDATE_CLAIMS}`, requestBody, { headers: MOCK_HEADERS_WITH_AUTH });
  });
}

async function initPortabl(mockUserId) {
  let MOCK_HEADERS_WITH_AUTH = { Authorization: `Basic ${window.btoa(mockUserId)}` };

  await Portabl.sync.createSyncWithPortabl({
    root: '#portabl-sync-root',
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
await createMockProviderInputs(MOCK_USER_ID);

document.getElementById('generate-new-user').addEventListener('click', async () => {
  const newMockUserId = uuid.v4();
  localStorage.setItem('MOCK_USER_ID', newMockUserId);
  MOCK_USER_ID = newMockUserId;
  await initPortabl(MOCK_USER_ID);
  await createMockProviderInputs(MOCK_USER_ID);
});
