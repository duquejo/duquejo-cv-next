import type { FC } from 'react';

interface YouTubeProps {
  videoId: string;
  title?: string;
}

export const YouTube: FC<YouTubeProps> = ({ videoId, title = 'YouTube video' }) => {
  return (
    <div className="my-8 relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
