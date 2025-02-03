import Image from 'next/image';
import { ExperienceItem } from '@/components/resume/experience/experience-item';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { calculateYears, cn, STACK_DATA as stack } from '@/lib';
import { HeroImage } from '@/components/resume/hero-image/hero-image';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { RichText } from '@/components/general/rich-text';
import type { ExperienceType, LanguageType } from '@/interfaces';

export default function MainPage() {
  const t = useTranslations('General');

  const memoizedYears = useCallback(calculateYears, []);

  return (
    <>
      <section className="flex flex-col items-center mx-0 lg:pt-5 mt-5 py-10 relative lg:flex-row lg:justify-between">
        <div className="order-2 xl:basis-3/5 basis-1/2 lg:order-1 md:ml-5 lg:ml-10 mx-5 pb-0 pt-5 lg:pt-0">
          <span className="font-semibold text-muted-foreground mt-10 animate-entrance duration-1000">
            {t('role')}
          </span>
          <h1 className="text-4xl lg:text-6xl md:text-5xl mb-5 animate-entrance duration-1000 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-primary">
            {t('resume.greetings')}
            <strong>José Duque.</strong>
          </h1>
          <p>{t('resume.excerpt1', { years: memoizedYears() })}</p>
          <br />
          <p>
            <RichText>{(tags) => t.rich('resume.excerpt2', tags)}</RichText>
          </p>
          <div className="flex justify-center gap-x-10 mt-6 lg:mt-8 w-full md:w-auto">
            {stack.map((s) => (
              <Image
                className="hover:animate-wiggle max-w-8 lg:max-w-12 lg:w-full"
                key={s.title}
                src={s.icon}
                alt={s.title}
                width={50}
                height={50}
              />
            ))}
          </div>
        </div>
        <HeroImage className="order-1 flex-1 px-5 mt-5 max-w-[300px] lg:max-w-[380px] lg:order-2 lg:mt-0" />
      </section>
      <section className="px-5 gap-x-10 gap-y-2 lg:px-10">
        <h2 className="text-lg lg:text-xl mb-3 font-semibold underline-offset-4 underline decoration-primary">
          <RichText>{(tags) => t.rich('resume.description.title', tags)}</RichText>
        </h2>
        <p>
          <RichText>{(tags) => t.rich('resume.description.content', tags)}</RichText>
        </p>
      </section>
      <section className="px-5 flex flex-col gap-x-10 gap-y-2 pb-20 sm:pb-5 lg:flex-row lg:px-10">
        <div className="basis-full">
          {/*Education*/}
          <h2 className="main-subtitle">{t('education.title')}</h2>
          {t.raw('education.content') && (
            <ul>
              {t.raw('education.content').map((a: ExperienceType, i: number) => (
                <ExperienceItem key={i} {...a} />
              ))}
            </ul>
          )}
        </div>
        <div className="basis-full lg:basis-2/3">
          {/*Languages*/}
          <h2 className={cn('main-subtitle', 'mt-5 lg:mt-0')}>{t('languages.title')}</h2>
          <div className="grid grid-cols-2 gap-x-6">
            {t.raw('languages.content')?.map((l: LanguageType, i: number) => (
              <Card className="flex flex-col justify-center items-center" key={`language-${i}`}>
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
