import { BlogPost } from '@/interfaces';

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
  const textSize = size === 'lg' ? 'text-9xl opacity-40' : 'text-4xl';

  return <div className={textSize}>{CATEGORY_EMOJI[category] || CATEGORY_EMOJI.General}</div>;
};
