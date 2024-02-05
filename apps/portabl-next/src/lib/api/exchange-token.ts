import { BASE_URL, PORTABL_ACCOUNT_ID } from '../constants';

export default async function exchangeToken({ idTokenJwt, projectId }: { idTokenJwt: string; projectId: string }) {
  const url: URL = new URL(`${BASE_URL}/agent/${PORTABL_ACCOUNT_ID}/oauth2/token`);

  const tokenEndpointResponse: Response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_token: idTokenJwt,
      grant_type: 'id_token',
      scope: 'openid',
      projectId,
    }),
    redirect: 'follow',
  });

  return {
    response: tokenEndpointResponse,
    data: await tokenEndpointResponse.json(),
  };
}
