'use client';

import { ThemeProvider } from '@/components/theme-provider';
import {
  PORTABL_ORGANIZATION_ID,
  PORTABL_CONNECT_DOMAIN,
  PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID,
  PORTABL_PASSPORT_DOMAIN,
  THEME,
} from '@/lib/constants';
import { ConnectProvider } from '@portabl/react-connect-with-portabl';
import { useSearchParams } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return (
    <ThemeProvider attribute={'class'} forcedTheme={THEME} disableTransitionOnChange>
      <ConnectProvider
        organizationId={PORTABL_ORGANIZATION_ID}
        projectId={PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID}
        connectDomain={PORTABL_CONNECT_DOMAIN}
        passportDomain={PORTABL_PASSPORT_DOMAIN}
        searchParams={searchParams}
      >
        {children}
      </ConnectProvider>
    </ThemeProvider>
  );
}
