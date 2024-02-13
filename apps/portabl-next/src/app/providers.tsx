'use client';

import { ThemeProvider } from '@/components/theme-provider';
import {
  PORTABL_ACCOUNT_ID,
  PORTABL_CONNECT_DOMAIN,
  PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID,
  PORTABL_WALLET_DOMAIN,
  THEME,
} from '@/lib/constants';
import { ConnectProvider } from '@portabl/react-connect-with-portabl';
import { useSearchParams } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return (
    <ThemeProvider attribute={'class'} forcedTheme={THEME} disableTransitionOnChange>
      <ConnectProvider
        accountId={PORTABL_ACCOUNT_ID}
        projectId={PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID}
        connectDomain={PORTABL_CONNECT_DOMAIN}
        walletDomain={PORTABL_WALLET_DOMAIN}
        searchParams={searchParams}
      >
        {children}
      </ConnectProvider>
    </ThemeProvider>
  );
}
