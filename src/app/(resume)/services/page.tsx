import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CodeXml, Computer, Database, Languages } from 'lucide-react';
import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';
import type { ExperienceType, Knowledge } from '@/interfaces';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MainLanguage } from '@/interfaces/main-languages.interface';
import { Services } from '@/interfaces/services.interface';

const education: ExperienceType[] = [
  {
    start_date: 'November 2021',
    end_date: '',
    enterprise: '',
    isRecent: true,
    project: 'Certification',
    role: 'Boot-camp Node JS - Ruta N Corporation - Ceiba Software S.A.S - Globant',
  },
  {
    start_date: '2010',
    end_date: '2016',
    enterprise: '',
    isRecent: true,
    project: 'Professional degree',
    role: 'Software Engineering - Politécnico Colombiano Jaime Isaza Cadavid',
  },
];

const knowledge: Knowledge[] = [
  { name: 'AWS', type: 'hard' },
  { name: 'Azure', type: 'hard' },
  { name: 'CSS3', type: 'hard' },
  { name: 'Tailwind', type: 'hard' },
  { name: 'HTML5', type: 'hard' },
  { name: 'DDD Architecture', type: 'soft' },
  { name: 'Laravel', type: 'hard' },
  { name: 'React.js', type: 'hard' },
  { name: 'Vue.js', type: 'hard' },
  { name: 'WordPress', type: 'hard' },
  { name: 'RabbitMQ', type: 'hard' },
  { name: 'Redis', type: 'hard' },
  { name: 'MySQL', type: 'hard' },
  { name: 'MongoDB', type: 'hard' },
  { name: 'PostgreSQL', type: 'hard' },
  { name: 'Distributed architectures', type: 'soft' },
  { name: 'Monolithic architectures', type: 'soft' },
  { name: 'Clean Code', type: 'soft' },
  { name: 'Terraform', type: 'hard' },
  { name: 'Serverless framework', type: 'hard' },
  { name: 'Storybook', type: 'hard' },
  { name: 'Design Systems', type: 'soft' },
  { name: 'i18n', type: 'soft' },
  { name: 'Responsive design', type: 'soft' },
  { name: 'Docker', type: 'hard' },
  { name: 'Bootstrap', type: 'hard' },
  { name: 'Kanban', type: 'soft' },
  { name: 'Jenkins', type: 'hard' },
  { name: 'Node JS', type: 'hard' },
  { name: 'SpringBoot', type: 'hard' },
  { name: 'SpringCloud', type: 'hard' },
  { name: 'Nest JS', type: 'hard' },
  { name: 'Agile development', type: 'soft' },
  { name: 'OOP', type: 'soft' },
  { name: 'Time-management', type: 'soft' },
  { name: 'Time flexibility', type: 'soft' },
  { name: 'JWT', type: 'hard' },
  { name: 'Github actions', type: 'hard' },
  { name: "ORM's", type: 'soft' },
  { name: "ODM's", type: 'soft' },
  { name: 'Monitoring', type: 'soft' },
  { name: 'Observability', type: 'soft' },
  { name: 'Jest', type: 'hard' },
  { name: 'Playwright', type: 'hard' },
  { name: 'Cypress', type: 'hard' },
  { name: 'SonarQube', type: 'hard' },
  { name: 'Unit tests', type: 'hard' },
  { name: 'Vitest', type: 'hard' },
  { name: 'Integration tests', type: 'hard' },
  { name: 'e2e tests', type: 'hard' },
  { name: 'SASS', type: 'hard' },
  { name: 'Datadog', type: 'hard' },
  { name: 'Microservices resiliency', type: 'soft' },
  { name: 'Redux', type: 'hard' },
  { name: 'Pinia', type: 'hard' },
  { name: 'VueX', type: 'hard' },
  { name: 'TanStack Query', type: 'hard' },
  { name: 'jQuery', type: 'hard' },
  { name: 'Wordpress Plugin Development', type: 'hard' },
  { name: 'CircleCI', type: 'hard' },
  { name: 'SEO', type: 'soft' },
  { name: 'Next JS', type: 'hard' },
  { name: 'Zustand', type: 'hard' },
  { name: 'Accessibility', type: 'soft' },
  { name: 'SSR', type: 'soft' },
  { name: 'Quasar', type: 'hard' },
  { name: 'Kubernetes', type: 'hard' },
  { name: 'Hexagonal architecture', type: 'soft' },
];

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

const services: Services[] = [
  {
    title: 'Backend development',
    subtitle: 'General backend development services.',
    icon: <Database size={70} strokeWidth={1} />,
    description:
      'Server-side logic programming, databases, API programming, third-party integrations, architecture definitions and continuous deployment based on good development practices.',
  },
  {
    title: 'Frontend development',
    subtitle: 'General frontend development services.',
    icon: <Computer size={70} strokeWidth={1} />,
    description:
      'Client-side logic programming, based on semantic structuring practices, adaptability, accessibility and maintainability.',
  },
  {
    title: 'Website development',
    subtitle: 'Complete website development services.',
    icon: <CodeXml size={70} strokeWidth={1} />,
    description:
      'Creation and maintenance of custom websites, informational sites, E-Commerces, Funnels, Courses and development of custom plugins for WordPress.',
  },
  {
    title: 'Consulting & Mentoring',
    subtitle: 'Customized development mentoring service.',
    icon: <BookOpen size={70} strokeWidth={1} />,
    description:
      'Mentoring and consulting services in general topics, like optimization, security and good development practices.',
  },
];

export default function ServicesPage() {
  return (
    <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <section>
        <h1 className="text-4xl lg:text-6xl mb-5 leading-tight mt-10 text-center font-semibold underline underline-offset-8 decoration-yellow-400">
          Services & <br />
          Technology stack
        </h1>
      </section>
      {/*General Services*/}
      <section>
        <h2 className="text-lg lg:text-2xl mb-3 hidden md:block font-semibold underline-offset-4 underline decoration-yellow-400">
          General services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {services.map((service, i) => (
            <Card key={`service-${i}`}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                {service.icon}
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
      <section className="mt-10 flex flex-col lg:flex-row gap-x-10">
        <div className="basis-full">
          {/*Education*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Academic studies
          </h3>
          {education.map((e, i) => (
            <ExperienceItem key={i} {...e} />
          ))}
        </div>
        <div className="basis-full lg:basis-2/3">
          {/*Languages*/}
          <h3 className="text-base lg:text-xl mb-6 mt-5 font-semibold underline-offset-8 underline decoration-yellow-400">
            Languages
          </h3>
          <div className="grid grid-cols-2 gap-x-2">
            <Card className="flex flex-col justify-center items-center">
              <CardHeader>
                <Languages size={40} strokeWidth={1} className="dark:text-primary" />
              </CardHeader>
              <CardContent>
                <p className="mt-3 lg:mt-0 text-center text-sm text-muted-foreground leading-tight">
                  <b>Spanish</b>{' '}
                  <small>
                    Native
                    <br />
                    (C2)
                  </small>
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center">
              <CardHeader>
                <Languages size={40} strokeWidth={1} className="dark:text-primary" />
              </CardHeader>
              <CardContent>
                <p className="mt-3 lg:mt-0 text-center text-sm text-muted-foreground leading-tight">
                  <b>English</b>{' '}
                  <small>
                    Proficient
                    <br />
                    (B2)
                  </small>
                </p>
              </CardContent>
            </Card>
          </div>
          {/*Tech Languages*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Tech languages
          </h3>
          {mainLanguages.map((ml) => (
            <div key={ml.tag}>
              <div className="flex justify-between mb-1">
                <strong className="text-xs">{ml.tag}</strong>
                <strong className="text-xs">{ml.value}%</strong>
              </div>
              <Progress className="mb-2" value={ml.value} color={ml.color} />
            </div>
          ))}
          {/*Tools & Soft skills*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Tools & Soft-skills
          </h3>
          <div className="flex flex-wrap gap-2 lg:gap-3 justify-evenly lg:justify-normal">
            {knowledge.map((k, i) => (
              <Badge key={`knowledge-${i}`} variant={k.type === 'soft' ? 'outline' : 'default'}>
                {k.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
