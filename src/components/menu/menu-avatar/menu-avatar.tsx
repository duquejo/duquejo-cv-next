'use client';

import Image from 'next/image';
import { NameTag } from '@/components/menu/name-tag/name-tag';
import { useSidebar } from '@/components/ui/sidebar';

interface Props {
  role: string;
}

export const MenuAvatar = ({ role }: Props) => {
  const { state } = useSidebar();

  return (
    <>
      <picture className="mt-10 peer-data-[active=true]/menu-button:w-6 max-w-32 lg:w-auto">
        <Image
          className="object-cover rounded"
          src="/static/img/avatar-small.webp"
          width="160"
          height="146"
          priority={true}
          alt="José Miguel Duque"
        />
      </picture>
      {state === 'expanded' && (
        <div className="text-center">
          <NameTag />
          <div className="text-xl font-bold">José Duque</div>
          <div className="font-light text-sm">{role}</div>
        </div>
      )}
    </>
  );
};
