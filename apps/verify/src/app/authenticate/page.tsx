'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConnect } from '@portabl/react-connect-with-portabl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthenticationProgress } from './_components/authentication-progress';

export default function AuthenticatePage() {
  const router = useRouter();
  const { idTokenJwt, isAuthorized, isHandlingResponse } = useConnect();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    if (!isHandlingResponse && !isAuthorized) {
      router.replace('/', { scroll: false });
    }
  }, [isHandlingResponse]);

  useEffect(() => {
    if (idTokenJwt) {
      (async () => {
        const tokenResponse = await fetch('/api/token', {
          method: 'POST',
          body: JSON.stringify({
            idTokenJwt,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { access_token } = await tokenResponse.json();

        setAccessToken(access_token);
        setTimeout(() => {
          router.replace('/', { scroll: false });
        }, 1000);
      })();
    }
  }, [idTokenJwt]);

  return (
    <div className="container relative  min-h-screen flex flex-row md:flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Authenticating</CardTitle>
          <CardDescription>Please wait while we finish authenticating your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthenticationProgress isLoaded={Boolean(accessToken)} />
        </CardContent>
      </Card>
    </div>
  );
}
