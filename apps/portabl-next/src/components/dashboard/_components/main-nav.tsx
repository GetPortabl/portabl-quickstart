import Link from 'next/link';

import { cn } from '@/lib/utils';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link href="#accounts" className="text-sm font-medium transition-colors hover:text-primary text-foreground">
        Accounts
      </Link>
      <Link
        aria-disabled
        href="#payments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Payments & Transfers
      </Link>
      <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Services
      </Link>
      <Link href="#rewards" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Rewards & Offers
      </Link>
    </nav>
  );
}
