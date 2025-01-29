'use client';

import { ReactNode, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { EventSkeleton } from '@/components/events/event-skeleton';
import useSWR from 'swr';
import { getEvents } from '@/actions/github';
import { Event } from '@/interfaces';
import { EventCard } from '@/components/events/event-card';
import { useTranslations } from 'next-intl';

interface Props {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const AppActivityProvider = ({ children, defaultOpen = false }: Props) => {
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
            <div role="list" className="flex flex-col gap-2 overflow-y-auto list-none">
              {!data || data.length === 0 ? (
                <p data-testid="empty" className="text-muted-foreground text-sm">
                  {t('empty')}
                </p>
              ) : (
                data.map((event) => <EventCard key={event.id} {...event} />)
              )}
            </div>
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
