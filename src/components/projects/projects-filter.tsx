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
import type { Skill } from '@/interfaces';

interface ProjectsFilterProps {
  title: string;
  filters: Skill[];
  filterResetText: string;
  filterNoResultsText: string;
  filterMaxSelection: string;
  filterInputPlaceholder: string;
  onSearchClear: () => void;
  onFilterChange: (filters: string[]) => void;
  className?: string;
  maxAmount?: number;
  maxAmountMobileText: string;
  initialFilters?: Set<string>;
}

interface ProjectsFilterRef {
  resetFilters: () => void;
}

const ProjectsFilter = forwardRef<ProjectsFilterRef, ProjectsFilterProps>(
  (
    {
      title,
      filters,
      className,
      onSearchClear,
      onFilterChange,
      filterResetText,
      filterMaxSelection,
      maxAmountMobileText,
      filterNoResultsText,
      filterInputPlaceholder,
      maxAmount = 5,
      initialFilters = new Set<string>(),
    },
    ref,
  ) => {
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(initialFilters);

    const resetFilters = useCallback(() => {
      setSelectedFilters(new Set<string>());
    }, []);

    const handleSelect = useCallback(
      (option: string) => {
        if (selectedFilters.has(option)) {
          selectedFilters.delete(option);
        } else {
          selectedFilters.add(option);
        }
        setSelectedFilters(selectedFilters);
        onFilterChange([...selectedFilters]);
      },
      [onFilterChange, selectedFilters],
    );

    useImperativeHandle(ref, () => ({
      resetFilters,
    }));

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn('border-dashed px-1', className)}>
            <PlusCircle />
            {title}
            {selectedFilters.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm lg:hidden">
                  {maxAmountMobileText}
                </Badge>
                <div className="hidden space-x-2 lg:flex">
                  {selectedFilters.size > maxAmount ? (
                    <Badge variant="secondary" className="rounded-sm">
                      {filterMaxSelection}
                    </Badge>
                  ) : (
                    filters
                      .filter((option) => selectedFilters.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          data-testid={`icon-${option.value}`}
                        >
                          {option.name}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start" title="filters">
          <Command>
            <CommandInput placeholder={filterInputPlaceholder} />
            <CommandList>
              <CommandEmpty>{filterNoResultsText}</CommandEmpty>
              <CommandGroup>
                {filters.map((option) => {
                  const isSelected = selectedFilters.has(option.value);
                  return (
                    <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
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
                      <span className="text-xs">{option.name}</span>
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
                      {filterResetText}
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
