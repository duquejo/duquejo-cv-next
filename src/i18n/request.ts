import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { headers as serverHeaders } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async () => {
  const preferredLanguage = (await serverHeaders()).get('accept-language') || 'en-US,en;q=0.5';

  const headers = { 'accept-language': preferredLanguage };
  const languages = new Negotiator({ headers }).languages();

  const availableLocales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  let locale: string;
  try {
    locale = match(languages, availableLocales, defaultLocale);
  } catch {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
