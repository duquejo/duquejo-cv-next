import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export const AppSheet = () => {
  return (
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};
