import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KnowledgeType, MainLanguageType, ServicesType } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { RichText } from '@/components/general/rich-text';
import { DynamicIcon } from '@/components/general/dynamic-icon';
import { Progress } from '@/components/ui/progress';
import { generateMetadata } from '@/lib';

export async function metadata() {
  return generateMetadata('Services');
}

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">
        <RichText>{(tags) => t.rich('title', tags)}</RichText>
      </h1>
      {/*General Services*/}
      <section className="pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {t.raw('content')?.map((service: ServicesType, i: number) => (
            <Card key={`service-${i}`}>
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
                  <p className="text-sm text-justify text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-10 flex flex-col gap-x-10">
        {/*Tech Languages*/}
        <h2 className="main-subtitle">{t('languages.title')}</h2>
        {t.raw('languages.content')?.map((ml: MainLanguageType) => (
          <div key={ml.tag}>
            <div className="flex justify-between mb-2 text-xs">
              <strong>{ml.tag}</strong>
              <strong>{ml.value}%</strong>
            </div>
            <Progress className="mb-4" value={ml.value} color={ml.color} />
          </div>
        ))}
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
