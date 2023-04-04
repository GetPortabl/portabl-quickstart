import axios from 'axios';
import { API_BASE_URL, GET_PREREQS } from '../constants';

const getPrereqs = async (): Promise<{ isSyncOn: boolean; datapoints: Array<Record<string, any>> }> => {
  const { data } = await axios.get(`${API_BASE_URL}${GET_PREREQS}`);
  return data;
};

export default getPrereqs;
