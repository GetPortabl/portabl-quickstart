export const API_BASE_URL = process.env.JS_APP_PUBLIC_API_HOST;

// data sync routes
export const GET_PREREQS = '/sync-prereqs';
export const USER_CONSENT = '/user-consent';

// tenant
export const TENANT_ID_PLACEHOLDER = '<tenant-id>';
export const TENANT_ID_CUSTOM_CLAIM = `https://getportabl.com/tenantId`;
export const CORRELATION_UUID_CUSTOM_CLAIM = `https://getportabl.com/correlationId`;

const MOCK_USER_ID = 'user-id';

export const MOCK_HEADERS_WITH_AUTH = {
  Authorization: `Basic ${window.btoa(MOCK_USER_ID)}`,
};
