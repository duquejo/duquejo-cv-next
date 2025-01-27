'use server';

import { generate } from '@pdfme/generator';
import { getTranslations } from 'next-intl/server';
import { calculateYears } from '@/lib/utils';
import type { LanguageType } from '@/interfaces';
import { getBaseTemplate } from '@/lib/pdf';

export async function generatePdf() {
  const t = await getTranslations('Pdf');

  const template = getBaseTemplate;
  const inputs = [
    {
      introduction: t('introduction'),
      databases: t('databases'),
      cicd: t('cicd'),
      backend: t('backend'),
      programming_languages: t('programming_languages'),
      frontend: t('frontend'),
      cloud: t('cloud'),
      security: t('security'),
      architecture: t('architecture'),
      methodologies: t('methodologies'),
      experience: t('experience', { years: calculateYears() }),
      languages: t
        .raw('languages')
        .map((lang: LanguageType) => `${lang.title} - ${lang.subtitle}`)
        .join('\n'),
      email_bottom: process.env.PDF_EMAIL || '',
      website_bottom: process.env.PDF_WEBSITE || '',
    },
  ];

  return generate({ inputs, template });
}
