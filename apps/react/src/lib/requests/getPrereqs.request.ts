import axios from 'axios';
import { API_BASE_URL, GET_PREREQS, MOCK_HEADERS_WITH_AUTH } from '../constants';

const getPrereqs = async (): Promise<{ isSyncOn: boolean; datapoints: Array<Record<string, any>> }> => {
  const { data } = await axios.get(`${API_BASE_URL}${GET_PREREQS}`, {
    headers: MOCK_HEADERS_WITH_AUTH,
  });
  return data;
};

export default getPrereqs;
