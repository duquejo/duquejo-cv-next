'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import useSWR from 'swr';
import { getEvents } from '@/actions/events';
import { EventCard } from '@/components/events/event-card';
import { EventSkeleton } from '@/components/events/event-skeleton';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Event } from '@/interfaces';

interface Props {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const EventProvider = ({ children, defaultOpen = false }: Props) => {
  const t = useTranslations('Sidebar.complementary.activity.dialog');
  const [loadEvents, setLoadEvents] = useState(false);

  const { data, isLoading } = useSWR<Event[]>(loadEvents ? 'events' : null, getEvents);

  const onToggleChange = async (open: boolean) => {
    if (open) {
      return setLoadEvents(true);
    }
    setLoadEvents(false);
  };

  return (
    <Sheet key="activity" onOpenChange={onToggleChange} defaultOpen={defaultOpen}>
      {children}
      <SheetContent role="dialog" className="flex flex-col justify-between w-10/12">
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>{t('description')}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {isLoading ? (
            <EventSkeleton rounds={2} />
          ) : (
            <ol className="flex flex-col gap-2 overflow-y-auto list-none">
              {!data || data.length === 0 ? (
                <li data-testid="empty" className="text-muted-foreground text-sm">
                  {t('empty')}
                </li>
              ) : (
                data.map((event) => <EventCard key={event.id} {...event} />)
              )}
            </ol>
          )}
        </div>
        <SheetFooter>
          <Link
            href="https://github.com/duquejo"
            target="_blank"
            className="text-xs text-muted-foreground"
          >
            {t('button')}
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
