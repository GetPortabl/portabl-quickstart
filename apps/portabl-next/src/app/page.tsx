import Dashboard from '@/components/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portabl Quickstart - Dashboard',
};
export default function HomePage() {
  return <Dashboard />;
}
