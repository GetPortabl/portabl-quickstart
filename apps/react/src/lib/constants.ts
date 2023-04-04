export const API_BASE_URL = process.env.JS_APP_PUBLIC_API_HOST;

// data sync routes
export const CREATE_SYNC_SESSION = '/create-sync-session';
export const GET_USER_SETTINGS = '/get-user-settings';
export const UPDATE_USER_SETTINGS = '/update-user-settings';
export const UPDATE_USER_DATAPOINTS = '/update-user-datapoints';
export const GET_DATA_PROFILE = '/data-profile';

// tenant
export const TENANT_ID_PLACEHOLDER = '<tenant-id>';
export const TENANT_ID_CUSTOM_CLAIM = `https://getportabl.com/tenantId`;
export const CORRELATION_UUID_CUSTOM_CLAIM = `https://getportabl.com/correlationId`;

// DIDComm
export const AGENT = '/agent';
export const DID_COMM = '/did-comm';
const MESSAGES = '/messages';
const INVITATION = '/invitation';
export const AGENT_ENDPOINT = `${AGENT}/${TENANT_ID_PLACEHOLDER}`;
export const DID_COMM_ENDPOINT = `${AGENT_ENDPOINT}${DID_COMM}`;
export const DID_COMM_INVITATION_URL = `${DID_COMM_ENDPOINT}${MESSAGES}${INVITATION}`;

const MOCK_NATIVE_USER_ID = 'native-user-id';

export const MOCK_HEADERS_WITH_AUTH = {
  Authorization: `Basic ${window.btoa(MOCK_NATIVE_USER_ID)}`,
};
