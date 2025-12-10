import type { FC } from 'react';

interface YouTubeProps {
  videoId: string;
  title?: string;
}

// Validates YouTube video ID to prevent XSS attacks
// YouTube IDs can be 10-12 characters (varies by video type)
const isValidYouTubeId = (id: string): boolean => {
  return /^[a-zA-Z0-9_-]{10,12}$/.test(id);
};

export const YouTube: FC<YouTubeProps> = ({ videoId, title = 'YouTube video' }) => {
  // Validate videoId to prevent XSS
  if (!isValidYouTubeId(videoId)) {
    console.error(`Invalid YouTube video ID: ${videoId}`);
    return null;
  }

  return (
    <div className="my-8 relative w-full pb-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      />
    </div>
  );
};
