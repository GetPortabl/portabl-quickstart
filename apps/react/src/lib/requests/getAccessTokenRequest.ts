import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

export type AccessTokenResultType = {
  readonly accessToken: string;
};

const getAccessToken = async (): Promise<AccessTokenResultType> => {
  const { data }: AxiosResponse = await axios.get(`${API_BASE_URL}${ACCESS_TOKEN}`);

  return data;
};

export default getAccessToken;
