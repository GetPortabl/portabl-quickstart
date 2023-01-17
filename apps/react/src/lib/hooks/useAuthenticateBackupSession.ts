import axios, { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { API_BASE_URL, BACKUP_SESSIONS, AUTHENTICATE } from '../constants';

export type PrepareBackupResultType = {
  readonly accessToken: string;
};

const authenticateBackupSession = async (): Promise<PrepareBackupResultType> => {
  console.log('authenticateBackupSession API_BASE_URL', API_BASE_URL);
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${BACKUP_SESSIONS}${AUTHENTICATE}`);
  return data;
};

export default function useAuthenticateBackupSession() {
  return useMutation(() => authenticateBackupSession());
}
