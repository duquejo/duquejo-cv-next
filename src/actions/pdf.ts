'use server';

import { generate } from '@pdfme/generator';
import { getTranslations } from 'next-intl/server';
import type { LanguageType } from '@/interfaces';
import { calculateYears, getBaseTemplate } from '@/lib';

const years = calculateYears();

const PDF_EMAIL = process.env.PDF_EMAIL || '';
const PDF_WEBSITE = process.env.PDF_WEBSITE || '';

export async function generatePdf() {
  const t = await getTranslations('Pdf');

  return generate({
    inputs: [
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
        experience: t('experience', { years }),
        languages: t
          .raw('languages')
          .map((lang: LanguageType) => `${lang.title} - ${lang.subtitle}`)
          .join('\n'),
        email_bottom: PDF_EMAIL,
        website_bottom: PDF_WEBSITE,
      },
    ],
    template: getBaseTemplate,
  });
}
