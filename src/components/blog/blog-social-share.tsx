'use client';

import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

interface BlogSocialShareProps {
  url: string;
  iconSize?: number;
}

export const BlogSocialShare = ({ url, iconSize = 25 }: BlogSocialShareProps) => {
  return (
    <>
      <TwitterShareButton url={url} title="X" htmlTitle="X">
        <XIcon size={iconSize} round />
      </TwitterShareButton>
      <ThreadsShareButton url={url} title="Threads" htmlTitle="Threads">
        <ThreadsIcon size={iconSize} round />
      </ThreadsShareButton>
      <LinkedinShareButton url={url} title="LinkedIn" htmlTitle="LinkedIn">
        <LinkedinIcon size={iconSize} round />
      </LinkedinShareButton>
      <EmailShareButton url={url} title="Email" htmlTitle="Email">
        <EmailIcon size={iconSize} round />
      </EmailShareButton>
    </>
  );
};
