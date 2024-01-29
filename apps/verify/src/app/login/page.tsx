import portablIcon from '../portabl-icon.svg';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { UserAuthForm } from './_components/user-auth-form';
import { PROVIDER_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Portabl Quickstart - Login',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative  min-h-screen flex flex-row md:flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:p-0 p-10">
        <div className="relative hidden h-full flex-col p-10 text-foreground lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6 "
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {PROVIDER_NAME}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Financial identity made simpler than ever.&rdquo;</p>
              <footer className="text-sm flex items-center gap-2">
                Brought to you by <Image className="inline" alt="Portabl" src={portablIcon} /> Portabl
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center justify-center items-center">
              <div className="tracking-tight relative z-20 flex items-center text-lg text-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                {PROVIDER_NAME}
              </div>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="#terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
