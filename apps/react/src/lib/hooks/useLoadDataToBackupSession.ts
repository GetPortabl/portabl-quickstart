import axios, { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { API_BASE_URL, BACKUP_SESSIONS, LOAD_DATA_ROUTE } from '../constants';

export type LoadBackupDataRequestArgsType = {
  // "accessToken" that was received from the API call that was executed on mounting of a portabl web component.
  readonly accessToken: string;

  // "nativeUserId" is an ID of the user within your application
  readonly nativeUserId: string;
};

const loadDataToBackupSession = async ({ accessToken, nativeUserId }: LoadBackupDataRequestArgsType): Promise<void> => {
  console.log('loadDataToBackupSession API_BASE_URL', API_BASE_URL);
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${BACKUP_SESSIONS}${LOAD_DATA_ROUTE}`, {
    accessToken,
    nativeUserId,
  });

  return data;
};

export default function useLoadDataToBackupSession() {
  return useMutation((args: LoadBackupDataRequestArgsType) => loadDataToBackupSession(args));
}
