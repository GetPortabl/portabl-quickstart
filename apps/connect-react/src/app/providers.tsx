'use client';

import { ConnectProvider } from '@portabl/react-connect-with-portabl';

const PORTABL_ACCOUNT_ID = process.env.JS_APP_PORTABL_ACCOUNT_ID || '';
const PORTABL_CONNECT_DOMAIN = process.env.JS_APP_PORTABL_CONNECT_DOMAIN || '';
const PORTABL_WALLET_DOMAIN = process.env.JS_APP_PORTABL_WALLET_DOMAIN || '';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConnectProvider
      accountId={PORTABL_ACCOUNT_ID}
      connectDomain={PORTABL_CONNECT_DOMAIN}
      walletDomain={PORTABL_WALLET_DOMAIN}
    >
      {children}
    </ConnectProvider>
  );
}
