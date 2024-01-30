import { BASE_URL } from '../constants';
import getPortablClientToken from './get-portabl-client-token';

export default async function getUserAccountByDid({ userDID, projectId }: { userDID: string; projectId: string }) {
  const accessToken = await getPortablClientToken();

  const userDataResponse = await fetch(`${BASE_URL}/provider/projects/${projectId}/users-by-did/${userDID}`, {
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
