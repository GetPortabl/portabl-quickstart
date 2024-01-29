import { BASE_URL } from '../constants';
import getPortablClientToken from './get-portabl-client-token';

export default async function getUserAccount({ userAccountId }: { userAccountId: string }) {
  const accessToken = await getPortablClientToken();

  const userDataResponse = await fetch(`${BASE_URL}/provider/users/${userAccountId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    response: userDataResponse,
    data: await userDataResponse.json(),
  };
}
