interface YouTubeProps {
  videoId: string;
  title?: string;
}

const isValidYouTubeId = (id: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
};

export const YouTube = ({ videoId, title = 'YouTube video' }: YouTubeProps) => {
  if (!isValidYouTubeId(videoId)) {
    console.error('Invalid YouTube video ID provided');
    return null;
  }

  return (
    <div className="relative w-full pb-[50%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
      />
    </div>
  );
};
