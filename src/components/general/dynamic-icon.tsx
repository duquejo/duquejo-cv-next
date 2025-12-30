import { LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

interface Props {
  iconName: string;
  [key: string]: any;
}
type LucideIconsModule = Record<string, ComponentType<unknown>>;

export const DynamicIcon = ({ iconName, ...props }: Props) => {
  const Icon = dynamic(
    () =>
      import('lucide-react').then((module) => {
        const iconsModule = module as unknown as LucideIconsModule;
        const component = iconsModule[iconName];
        if (!component) {
          throw new Error(`Icon ${iconName} not found`);
        }
        return component;
      }),
    {
      loading: () => (
        <LoaderCircle size="70" strokeWidth={1} className="text-secondary-foreground" />
      ),
    },
  );

  return <Icon {...props} />;
};
