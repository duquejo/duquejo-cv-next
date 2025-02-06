import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

interface ProjectsFilterProps {
  className?: string;
  maxAmount?: number;
  initialFilters?: Set<string>;
  title: string;
  filters: string[];
  onSearchClear: () => void;
  onFilterChange: (filters: string[]) => void;
}

interface ProjectsFilterRef {
  resetFilters: () => void;
}

const ProjectsFilter = forwardRef<ProjectsFilterRef, ProjectsFilterProps>(
  (
    {
      className,
      title,
      filters,
      initialFilters = new Set<string>(),
      maxAmount = 5,
      onFilterChange,
      onSearchClear,
    },
    ref,
  ) => {
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(initialFilters);

    const resetFilters = useCallback(() => {
      setSelectedFilters(new Set<string>());
    }, []);

    const handleSelect = useCallback(
      (option: string) => {
        const newSelectedFilters = new Set(selectedFilters);
        if (newSelectedFilters.has(option)) {
          newSelectedFilters.delete(option);
        } else {
          newSelectedFilters.add(option);
        }
        setSelectedFilters(newSelectedFilters);
        onFilterChange([...newSelectedFilters]);
      },
      [selectedFilters, onFilterChange],
    );

    useImperativeHandle(ref, () => ({
      resetFilters,
    }));

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn('border-dashed', className)}>
            <PlusCircle />
            {title}
            {selectedFilters.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm lg:hidden">
                  {selectedFilters.size} selected
                </Badge>
                <div className="hidden space-x-2 lg:flex">
                  {selectedFilters.size > maxAmount ? (
                    <Badge variant="secondary" className="rounded-sm">
                      {selectedFilters.size} selected
                    </Badge>
                  ) : (
                    filters
                      .filter((option) => selectedFilters.has(option))
                      .map((option) => (
                        <Badge variant="secondary" key={option}>
                          {option}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Select ${title}`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filters.map((option) => {
                  const isSelected = selectedFilters.has(option);
                  return (
                    <CommandItem key={option} onSelect={() => handleSelect(option)}>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          {
                            'bg-primary text-primary-foreground': isSelected,
                            'opacity-50 [&_svg]:invisible': !isSelected,
                          },
                        )}
                      >
                        <Check />
                      </div>
                      <span>{option}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedFilters.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onSearchClear()}
                      className="justify-center text-center text-xs font-semibold"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

ProjectsFilter.displayName = 'ProjectsFilter';

export { ProjectsFilter };
export type { ProjectsFilterRef };
