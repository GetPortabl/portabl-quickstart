import { BASE_URL } from '../constants';
import getPortablClientToken from './get-portabl-client-token';

export default async function sendInvitation({
  issuanceWorkflowId,
  destinations,
}: {
  issuanceWorkflowId: string;
  destinations: { channel: 'DIDCOMM' | 'EMAIL' | 'SMS'; target?: string }[];
}) {
  const accessToken = await getPortablClientToken();

  const sendIssuanceWorkflowResponse = await fetch(
    `${BASE_URL}/issuance-workflows/${issuanceWorkflowId}/send-invitation`,
    {
      method: 'POST',
      body: JSON.stringify({
        destinations,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return {
    response: sendIssuanceWorkflowResponse,
    data: await sendIssuanceWorkflowResponse.json(),
  };
}
