'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConnect } from '@portabl/react-connect-with-portabl';

export default function Home() {
  const router = useRouter();
  const { resetAuthorization } = useConnect();

  const handleLogout = async () => {
    await fetch('api/token/revoke', { method: 'POST' });
    router.replace('/login', { scroll: false });
  };

  useEffect(() => {
    (async () => {
      resetAuthorization();
      await handleLogout();
    })();
  }, []);

  return (
    <div className="connect-wrapper">
      <div className={`login-wrapper`}>
        <h2>Logging you out...</h2>
      </div>
    </div>
  );
}
