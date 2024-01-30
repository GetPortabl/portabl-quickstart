import { BASE_URL } from '../constants';
import getPortablClientToken from './get-portabl-client-token';

export default async function createIssuanceWorkflow({
  projectId,
  userDID,
  userId,
  datapoints,
  expiresIn,
}: {
  projectId: string;
  userDID: string;
  userId: string;
  datapoints: string;
  expiresIn: number;
}) {
  const accessToken = await getPortablClientToken();

  const createIssuanceWorkflowResponse = await fetch(`${BASE_URL}/issuance-workflows`, {
    method: 'POST',
    body: JSON.stringify({
      projectId,
      userDID,
      userId,
      datapoints,
      expiresIn,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    response: createIssuanceWorkflowResponse,
    data: await createIssuanceWorkflowResponse.json(),
  };
}
