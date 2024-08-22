import { BASE_URL, PORTABL_CLIENT_ID, PORTABL_CLIENT_SECRET } from '../constants';

export default async function getPortablClientToken() {
  const tokenResponse = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      clientId: PORTABL_CLIENT_ID,
      clientSecret: PORTABL_CLIENT_SECRET,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { accessToken } = await tokenResponse.json();

  return accessToken;
}
