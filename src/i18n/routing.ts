import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',

  localePrefix: 'never',
  localeCookie: false,

  pathnames: {
    '/': '/',

    '/blog': '/blog',

    '/career/projects': {
      en: '/career/projects',
      es: '/carrera/proyectos',
    },

    '/career/services': {
      en: '/career/services',
      es: '/carrera/servicios',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;

export const {
  getPathname,
  // redirect,
  useRouter,
  Link,
  usePathname,
} = createNavigation(routing);
