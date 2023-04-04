import axios from 'axios';
import { API_BASE_URL, GET_USER_SETTINGS, MOCK_HEADERS_WITH_AUTH } from '../constants';

const getUserSettings = async () => {
  const { data } = await axios.get(`${API_BASE_URL}${GET_USER_SETTINGS}`, {
    headers: MOCK_HEADERS_WITH_AUTH,
  });
  return data;
};

export default getUserSettings;
