import { BASE_URL } from '../constants';
import getPortablClientToken from './get-portabl-client-token';

export default async function createIssuanceWorkflow({
  projectId,
  userId,
  datapoints,
  expiresIn,
  userDID,
}: {
  projectId: string;
  userId: string;
  datapoints: string;
  expiresIn: number;
  userDID: string;
}) {
  const accessToken = await getPortablClientToken();

  const createIssuanceWorkflowResponse = await fetch(`${BASE_URL}/issuance-workflows`, {
    method: 'POST',
    body: JSON.stringify({
      projectId,
      userId,
      datapoints,
      expiresIn,
      userDID,
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
