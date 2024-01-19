const PORTABL_API_DOMAIN = process.env.PORTABL_API_DOMAIN;
const PORTABL_ACCOUNT_ID = process.env.JS_APP_PORTABL_ACCOUNT_ID;
const PROJECT_ID = process.env.JS_APP_PORTABL_PROJECT_ID;
const baseUrl = `${PORTABL_API_DOMAIN}/api/v1`;

export async function POST(req: Request) {
  const url: URL = new URL(`${baseUrl}/agent/${PORTABL_ACCOUNT_ID}/oauth2/token`);
  const { idTokenJwt } = await req.json();

  const tokenEndpointResult: Response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_token: idTokenJwt,
      grant_type: 'id_token',
      scope: 'openid',
      project_id: PROJECT_ID,
    }),
    redirect: 'follow',
  });

  return tokenEndpointResult;
}
