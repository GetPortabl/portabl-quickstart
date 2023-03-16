import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, LOAD_BACKUP_DATA } from '../constants';

export type LoadBackupDataRequestArgsType = {
  // "accessToken" that was received from the API call that was executed on mounting of a portabl web component.
  readonly accessToken: string;

  // "userId" is the userId of the user within your application
  readonly userId: string;
};

const loadBackupData = async ({ accessToken, userId }: LoadBackupDataRequestArgsType): Promise<void> => {
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${LOAD_BACKUP_DATA}`, {
    accessToken,
    userId,
  });

  return data;
};

export default loadBackupData;
