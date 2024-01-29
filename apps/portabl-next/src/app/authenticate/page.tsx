import { Metadata } from 'next';
import AuthenticationCard from './_components/authentication-card';

export const metadata: Metadata = {
  title: 'Portabl Quickstart - Authenticating',
};

export default function AuthenticatePage() {
  return <AuthenticationCard />;
}
