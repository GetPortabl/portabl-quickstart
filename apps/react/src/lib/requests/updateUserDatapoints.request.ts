import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, MOCK_HEADERS_WITH_AUTH, UPDATE_USER_DATAPOINTS } from '../constants';

const updateUserDatapoints = async (): Promise<void> => {
  const { data }: AxiosResponse = await axios.post(
    `${API_BASE_URL}${UPDATE_USER_DATAPOINTS}`,
    {},
    {
      headers: MOCK_HEADERS_WITH_AUTH,
    },
  );
  return data;
};

export default updateUserDatapoints;
