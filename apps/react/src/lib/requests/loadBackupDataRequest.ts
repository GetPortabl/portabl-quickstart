import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, LOAD_BACKUP_DATA } from '../constants';

export type LoadBackupDataRequestArgsType = {
  readonly correlationId: string;
};

const loadBackupData = async ({ correlationId }: { correlationId: string }): Promise<void> => {
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${LOAD_BACKUP_DATA}`, { correlationId });

  return data;
};

export default loadBackupData;
