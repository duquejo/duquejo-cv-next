import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  rounds?: number;
}

export const EventSkeleton = ({ rounds = 2 }: Props) => {
  return new Array(rounds).fill(0).map((_, i) => (
    <div key={i} className="flex flex-col space-y-3">
      <div className="flex items-center justify-between gap-x-3">
        <Skeleton className="flex-1 h-8 w-full" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <Skeleton className="h-[125px] w-full" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  ));
};
