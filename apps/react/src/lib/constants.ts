export const API_BASE_URL = process.env.JS_APP_PUBLIC_API_HOST;

// data sync routes
export const DATA_SYNC_ROUTE = '/data-sync';
export const DATA_SYNC_TOKEN_ROUTE = `${DATA_SYNC_ROUTE}/token`;
export const DATA_SYNC_SESSIONS_ROUTE = `${DATA_SYNC_ROUTE}/sessions`;
export const DATA_SYNC_LOAD_DATA_ROUTE = `${DATA_SYNC_ROUTE}/load-data`;
export const ACCESS_TOKEN = '/access-token';
export const CREATE_DATA_SYNC_INVITATION = '/create-data-sync-invitation';
export const LOAD_BACKUP_DATA = '/load-backup-data';
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
