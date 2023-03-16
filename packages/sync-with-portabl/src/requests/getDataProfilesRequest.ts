import axios from 'axios';

const API_DATA_PROFILE = 'https://baoportabl-api.ngrok.io/api/v1/provider/data-profiles';

const getDataProfiles = async (accessToken: string) => {
  const { data } = await axios.get(API_DATA_PROFILE, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export default getDataProfiles;
