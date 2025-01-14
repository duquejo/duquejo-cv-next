import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Games development'),
  description: 'Some of them are part of the practice that greatly enriches my career',
};

export default function GamesPage() {
  return <div>GamesPage</div>;
}
