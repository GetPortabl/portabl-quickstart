import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, CREATE_SYNC_SESSION, MOCK_HEADERS_WITH_AUTH, USER_CONSENT } from '../constants';

const userConsent = async (): Promise<void> => {
  const { data }: AxiosResponse = await axios.post(
    `${API_BASE_URL}${CREATE_SYNC_SESSION}`,
    {},
    {
      headers: MOCK_HEADERS_WITH_AUTH,
    },
  );

  return data;
};

export default userConsent;
