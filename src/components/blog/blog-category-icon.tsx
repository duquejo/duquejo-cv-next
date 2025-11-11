import type { BlogPost } from '@/interfaces';
import { cn } from '@/lib';

interface BlogCategoryIconProps {
  category: BlogPost['category'];
  size?: 'sm' | 'lg';
}

const CATEGORY_EMOJI = {
  Coding: '💻',
  Lifestyle: '🌿',
  Music: '🎵',
  Gaming: '🎮',
  General: '📝',
};

export const BlogCategoryIcon = ({ category, size = 'lg' }: BlogCategoryIconProps) => {
  const textSize = size === 'lg' ? 'text-9xl opacity-50' : 'text-4xl';

  return (
    <div className={cn(`grayscale`, textSize)}>
      {CATEGORY_EMOJI[category] || CATEGORY_EMOJI.General}
    </div>
  );
};
