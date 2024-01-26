import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useConnect } from '@portabl/react-connect-with-portabl';
import { useState } from 'react';

export default function additionalVerification() {
  const { authorizeWithRedirect, isLoading, isAuthorized, vpToken, user } = useConnect();
  const [isClaimingIdentity, setIsClaimingIdentity] = useState(false);
  const [isIdentityClaimed, setIsIdentityClaimed] = useState(false);
  const handleClaimIdentity = async () => {
    try {
      setIsClaimingIdentity(true);
      const issueResponse = await fetch('/api/issue', {
        method: 'POST',
        body: JSON.stringify({
          userDID: user?.sub,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await issueResponse.json();
      if (json) {
        setIsClaimingIdentity(false);
        setIsIdentityClaimed(true);
      }
      return json;
    } catch (e) {
      setIsClaimingIdentity(false);
      setIsIdentityClaimed(false);
    }
  };

  if (isIdentityClaimed) {
    return (
      <Card className="dark:bg-secondary">
        <CardHeader>
          <CardTitle>Identity Claim Successful</CardTitle>
          <CardDescription>You can now access your data in your Portabl passpport</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return isAuthorized && vpToken ? (
    <Card className="dark:bg-secondary">
      <CardHeader>
        <CardTitle>Verification Succesful</CardTitle>
        <CardDescription>Take your identity with you</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleClaimIdentity} disabled={isClaimingIdentity}>
          {isClaimingIdentity && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Claim your identity
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Card className="dark:bg-secondary">
      <CardHeader>
        <CardTitle>Please complete verifying your identity.</CardTitle>
        <CardDescription>We need to confirm a few things about you.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={authorizeWithRedirect} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} Complete your identity
        </Button>
      </CardFooter>
    </Card>
  );
}
