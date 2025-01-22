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

interface Props {
  children: ReactNode;
}

export const AppActivityProvider = ({ children }: Props) => {
  const [loadEvents, setLoadEvents] = useState(false);

  const { data, isLoading } = useSWR<Event[]>(loadEvents ? 'events' : null, getEvents);

  const onToggleChange = async (open: boolean) => {
    if (open) {
      return setLoadEvents(true);
    }
    setLoadEvents(false);
  };

  return (
    <Sheet key="activity" onOpenChange={onToggleChange}>
      {children}
      <SheetContent className="flex flex-col justify-between w-10/12">
        <SheetHeader>
          <SheetTitle>Latest Activity Feed Updates</SheetTitle>
          <SheetDescription>
            Here you will find the most recent and quick updates from my personal projects or news.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {isLoading ? (
            <EventSkeleton rounds={2} />
          ) : (
            <div className="flex flex-col gap-2 overflow-y-auto">
              {data?.map((event) => <EventCard key={event.id} {...event} />)}
            </div>
          )}
        </div>
        <SheetFooter>
          <Link
            href="https://github.com/duquejo"
            target="_blank"
            className="text-xs text-muted-foreground"
          >
            See more activity in GitHub
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
