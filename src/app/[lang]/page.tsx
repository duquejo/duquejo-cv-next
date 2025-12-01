import { RichText } from '@/components/general/rich-text';
import { HeroImage } from '@/components/resume/hero-image';
import { TechMarquee } from '@/components/resume/tech-marquee';
import { ExperienceItem } from '@/components/timeline/experience-item';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ExperienceType, LanguageType } from '@/interfaces';
import { calculateYears, cn } from '@/lib';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export default function MainPage() {
  const t = useTranslations('General');

  const memoizedYears = useCallback(() => calculateYears(), []);

  return (
    <>
      <section className="flex flex-col items-center justify-center m-5 lg:m-10 relative lg:flex-row lg:justify-between">
        <div className="order-2 lg:order-1 max-w-full xl:max-w-3/5">
          <h1 className="text-4xl lg:text-6xl md:text-5xl mb-5 animate-entrance duration-1000 font-semibold text-center lg:text-justify">
            {t('resume.greetings')}
            <strong className="mt-2 block bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-primary">
              José Duque.
            </strong>
          </h1>
          <p>{t('resume.excerpt1', { years: memoizedYears() })}</p>
          <br />
          <p>
            <RichText>{(tags) => t.rich('resume.excerpt2', tags)}</RichText>
          </p>
          <div className="grid mt-6 lg:mt-8 mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)]">
            <TechMarquee />
          </div>
        </div>
        <HeroImage className="order-1 px-5 mt-15 mb-5 max-w-[300px] lg:max-w-[380px] lg:order-2 lg:m-0" />
      </section>
      <section className="gap-x-10 gap-y-2 mx-5 px-5 py-5 border border-dashed border-border lg:py-10 lg:px-10 lg:mx-10 bg-sidebar/30 rounded-xl">
        <h2 className="text-lg lg:text-xl mb-3 font-semibold underline-offset-4 underline decoration-primary">
          <RichText>{(tags) => t.rich('resume.description.title', tags)}</RichText>
        </h2>
        <p>
          <RichText>{(tags) => t.rich('resume.description.content', tags)}</RichText>
        </p>
      </section>
      <section className="px-5 flex flex-col gap-x-10 gap-y-2 pb-20 sm:pb-5 lg:flex-row lg:px-10 lg:mt-5">
        <div className="basis-full">
          {/*Education*/}
          <h2 className="main-subtitle">{t('education.title')}</h2>
          {t.raw('education.content') && (
            <ul>
              {t.raw('education.content').map((a: ExperienceType, i: number) => (
                <ExperienceItem key={i} {...a} withIcons={false} />
              ))}
            </ul>
          )}
        </div>
        <div className="basis-full lg:basis-2/3">
          {/*Languages*/}
          <h2 className={cn('main-subtitle', 'mt-5 lg:mt-0')}>{t('languages.title')}</h2>
          <div className="grid grid-cols-2 gap-x-6">
            {t.raw('languages.content')?.map((l: LanguageType, i: number) => (
              <Card
                className="flex flex-col justify-center items-center bg-sidebar/30 rounded-xl border-dashed"
                key={`language-${i}`}
              >
                <CardHeader>
                  <Languages size={40} strokeWidth={1.5} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="lg:mt-0 text-center leading-tight">
                    <b>{l.title}</b>
                    <small className="block mt-1 text-muted-foreground">{l.subtitle}</small>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
