import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Metadata } from 'next';
import { KNOWLEDGE_DATA as knowledge, METADATA, SERVICES_DATA as services } from '@/lib/constants';
import { MainLanguage } from '@/interfaces';

export const metadata: Metadata = METADATA['services'];

const mainLanguages: MainLanguage[] = [
  {
    color: 'bg-sky-700',
    tag: 'Typescript',
    value: 93,
  },
  {
    color: 'bg-yellow-500',
    tag: 'Javascript',
    value: 95,
  },
  {
    color: 'bg-purple-700',
    tag: 'PHP',
    value: 75,
  },
  {
    color: 'bg-orange-500',
    tag: 'Java',
    value: 51,
  },
];

export default function ServicesPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">
        Services & <br />
        Technology stack
      </h1>
      {/*General Services*/}
      <section className="pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {services.map((service, i) => (
            <Card key={`service-${i}`}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex lg:flex-row flex-col items-center justify-between">
                <service.icon size="70" strokeWidth="1" />
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
        <h2 className="text-base lg:text-xl mb-6 font-semibold underline-offset-8 underline decoration-yellow-400">
          Main tech languages
        </h2>
        {mainLanguages.map((ml) => (
          <div key={ml.tag}>
            <div className="flex justify-between mb-2 text-xs">
              <strong>{ml.tag}</strong>
              <strong>{ml.value}%</strong>
            </div>
            <Progress className="mb-4" value={ml.value} color={ml.color} />
          </div>
        ))}
        {/*Tools & Soft skills*/}
        <h2 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
          Tools & Soft-skills
        </h2>
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-evenly lg:justify-normal">
          {knowledge.map((k, i) => (
            <Badge key={`knowledge-${i}`} variant={k.type === 'soft' ? 'outline' : 'secondary'}>
              {k.name}
            </Badge>
          ))}
        </div>
      </section>
    </article>
  );
}
