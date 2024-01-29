import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import exchangeToken from '@/lib/api/exchange-token';
import { PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID } from '@/lib/constants';

export async function POST(req: Request) {
  const { idTokenJwt } = await req.json();

  try {
    const { data, response } = await exchangeToken({ idTokenJwt, projectId: PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID });

    if (!response.ok) {
      return new Response(`Unable to authenticate`, {
        status: response.status,
      });
    }
    cookies().set({
      name: 'token',
      value: data.access_token,
      httpOnly: true,
    });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (e) {
    return new Response(`Unable to authenticate`, {
      status: 400,
    });
  }
}
