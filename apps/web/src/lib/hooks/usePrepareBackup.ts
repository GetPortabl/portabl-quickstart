import axios, { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { API_BASE_URL, PREPARE_BACKUP_ROUTE } from '../constants';

export type PrepareBackupResultType = {
  readonly accessToken: string;
};

const prepareBackup = async (): Promise<PrepareBackupResultType> => {
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${PREPARE_BACKUP_ROUTE}`);

  return data;
};

export default function usePrepareBackup() {
  return useMutation(() => prepareBackup());
}
