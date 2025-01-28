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

    '/hobbies/music-production': {
      en: '/hobbies/music-production',
      es: '/hobbies/produccion-musical',
    },

    '/hobbies/games-development': {
      en: '/hobbies/games-development',
      es: '/hobbies/desarrollo-de-juegos',
    },

    '/career/services': {
      en: '/career/services',
      es: '/carrera/servicios',
    },

    '/contact': {
      en: '/contact',
      es: '/contacto',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;

export const {
  // getPathname,
  // redirect,
  // useRouter
  Link,
  usePathname,
} = createNavigation(routing);
