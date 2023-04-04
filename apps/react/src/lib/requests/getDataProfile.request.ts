import axios from 'axios';
import { API_BASE_URL, GET_DATA_PROFILE } from '../constants';

const DATA_PROFILE_URL = `${API_BASE_URL}${GET_DATA_PROFILE}`;

const getDataProfile = async () => {
  const { data } = await axios.get(DATA_PROFILE_URL);
  return data;
};

export default getDataProfile;
