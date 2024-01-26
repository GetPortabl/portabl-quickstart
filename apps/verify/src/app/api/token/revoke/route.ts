import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  cookies().delete('token');

  // Add logic to handle revocation of token.

  return NextResponse.json({
    status: 200,
  });
}
