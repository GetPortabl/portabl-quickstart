'use client';

import { ThemeProvider } from '@/components/theme-provider';
import {
  PORTABL_ACCOUNT_ID,
  PORTABL_CONNECT_DOMAIN,
  PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID,
  PORTABL_WALLET_DOMAIN,
} from '@/lib/constants';
import { ConnectProvider } from '@portabl/react-connect-with-portabl';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ConnectProvider
        accountId={PORTABL_ACCOUNT_ID}
        projectId={PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID}
        connectDomain={PORTABL_CONNECT_DOMAIN}
        walletDomain={PORTABL_WALLET_DOMAIN}
      >
        {children}
      </ConnectProvider>
    </ThemeProvider>
  );
}
