'use client';

import Image from 'next/image';
import { NameTag } from '@/components/resume/name-tag/NameTag';
import { useSidebar } from '@/components/ui/sidebar';

export const MenuAvatar = () => {
  const { state } = useSidebar();

  return (
    <>
      <picture className="mt-10 w-6 lg:w-auto">
        <Image
          className="object-cover rounded"
          src="/static/img/avatar-small.webp"
          width="160"
          height="146"
          alt="José Miguel Duque"
        />
      </picture>
      {state === 'expanded' && (
        <div className="text-center">
          <NameTag />
          <div className="text-xl font-bold">José Duque</div>
          <div className="font-light text-sm">FullStack developer</div>
        </div>
      )}
    </>
  );
};
