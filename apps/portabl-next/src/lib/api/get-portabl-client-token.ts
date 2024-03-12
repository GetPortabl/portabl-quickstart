import { BASE_URL, PORTABL_CLIENT_ID, PORTABL_CLIENT_SECRET } from '../constants';

let accessToken: string;
export default async function getPortablClientToken() {
  if (!accessToken) {
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

    const { accessToken: _accessToken } = await tokenResponse.json();
    accessToken = _accessToken;
  }

  return accessToken;
}
