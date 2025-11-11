import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',

  localePrefix: 'never',
  localeCookie: false,

  pathnames: {
    '/': '/',

    '/blog': '/blog',

    '/blog/[slug]': '/blog/[slug]',

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

export type Href = Parameters<typeof getPathname>[0]['href'];

export const { getPathname, redirect, useRouter, Link, usePathname } = createNavigation(routing);
