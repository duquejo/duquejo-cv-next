import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: generateStandardTitle('Blog'),
  description: 'Discover the latest news, tips and interesting tech & lifestyle articles',
};

export default function BlogPage() {
  return <div>BlogPage</div>;
}
