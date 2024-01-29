import { Metadata } from 'next';
import AuthenticationCard from './_components/authentication-card';

export const metadata: Metadata = {
  title: 'Portabl Quickstart - Login',
};

export default function AuthenticatePage() {
  return <AuthenticationCard />;
}
