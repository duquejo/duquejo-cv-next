import Image from 'next/image';
import { ExperienceItem } from '@/components/resume/experience/experience-item';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { STACK_DATA as stack } from '@/lib/constants';
import { HeroImage } from '@/components/resume/hero-image/hero-image';
import { calculateYears, cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { RichText } from '@/components/general/rich-text';
import { ExperienceType, LanguageType } from '@/interfaces';

export default function MainPage() {
  const t = useTranslations('General');

  const memoizedYears = useCallback(calculateYears, []);

  return (
    <>
      <section className="flex flex-col lg:flex-row lg:justify-center items-center mx-0 mt-5 py-10 relative">
        <div className="order-2 lg:basis-3/5 lg:order-1 px-10 pb-0 pt-5 lg:pt-0">
          <span className="text-foreground font-light mt-10 animate-entrance duration-1000">
            {t('role')}
          </span>
          <h1 className="text-4xl lg:text-6xl mb-5 animate-entrance duration-1000">
            {t('resume.greetings')}
            <strong>José Duque.</strong>
          </h1>
          <p className="text-justify">{t('resume.excerpt1', { years: memoizedYears() })}</p>
          <br />
          <p className="text-justify">
            <RichText>{(tags) => t.rich('resume.excerpt2', tags)}</RichText>
          </p>
          <div className="flex justify-center gap-x-10 mt-8 w-full md:w-auto">
            {stack.map((s) => (
              <Image
                className="hover:animate-wiggle"
                key={s.title}
                src={s.icon}
                alt={s.title}
                width={50}
                height={50}
              />
            ))}
          </div>
        </div>
        <HeroImage className="order-1 flex-1 lg:order-2 px-10 lg:mt-0" />
      </section>
      <section className="m-10 gap-x-10 gap-y-2">
        <h2 className="text-lg lg:text-xl mb-3 font-semibold underline-offset-4 underline decoration-primary">
          {t.rich('resume.description.title', {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </h2>
        <p className="text-justify">
          {t.rich('resume.description.content', {
            b: (chunks) => <b>{chunks}</b>,
            br: () => <br />,
          })}
        </p>
      </section>
      <section className="flex flex-col lg:flex-row gap-x-10 m-10">
        <div className="basis-full">
          {/*Education*/}
          <h2 className="main-subtitle">{t('education.title')}</h2>
          {t
            .raw('education.content')
            ?.map((a: ExperienceType, i: number) => <ExperienceItem key={i} {...a} />)}
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
