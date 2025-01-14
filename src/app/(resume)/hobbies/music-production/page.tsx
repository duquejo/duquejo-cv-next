import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Music production'),
  description: 'A beloved hobby which balances everything',
};

export default function MusicPage() {
  return <div>MusicPage</div>;
}
