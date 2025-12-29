import { useTranslations } from 'next-intl';
import { DynamicIcon } from '@/components/general/dynamic-icon';
import { RichText } from '@/components/general/rich-text';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { KnowledgeType, MainLanguageType, ServicesType } from '@/interfaces';
import { createMetadata } from '@/lib';

export async function generateMetadata() {
  return createMetadata('Services');
}

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">
        <RichText>{(tags) => t.rich('title', tags)}</RichText>
      </h1>
      {/*General Services*/}
      <section className="pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
          {t.raw('content')?.map((service: ServicesType, i: number) => (
            <Card key={`service-${i}`} className="bg-sidebar/30 rounded-xl border-dashed">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex lg:flex-row flex-col items-center justify-between">
                {service.icon && (
                  <DynamicIcon
                    iconName={service.icon}
                    size="70"
                    strokeWidth={1}
                    className="text-primary"
                  />
                )}
                <div className="basis-3/4 mt-3 lg:mt-0">
                  <p className="text-justify text-muted-foreground">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="my-5 flex flex-col">
        {/*Tech Languages*/}
        <h2 className="main-subtitle">{t('languages.title')}</h2>
        <div className="p-5 lg:p-10">
          {t.raw('languages.content')?.map((ml: MainLanguageType) => (
            <div key={ml.tag} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-2 text-sm">
                <b>{ml.tag}</b>
                <b>{ml.value}%</b>
              </div>
              <Progress value={ml.value} color={ml.color} />
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col">
        {/*Tools & Soft skills*/}
        <h2 className="main-subtitle">{t('badges.title')}</h2>
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-evenly lg:justify-normal">
          {t.raw('badges.content')?.map((k: KnowledgeType) => (
            <Badge key={k.name} variant={k.type === 'soft' ? 'outline' : 'secondary'}>
              {k.name}
            </Badge>
          ))}
        </div>
      </section>
    </article>
  );
}
