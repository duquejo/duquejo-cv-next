import Image from 'next/image';
import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';
import type { ExperienceType, Language } from '@/interfaces';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export const metadata = {
  title: 'Resume',
  description: 'CV Resume',
};

const stack = [
  {
    icon: '/static/svg/typescript.svg',
    title: 'Typescript',
  },
  {
    icon: '/static/svg/nodejs.svg',
    title: 'Node JS',
  },
  {
    icon: '/static/svg/vue.svg',
    title: 'Vue JS',
  },
  {
    icon: '/static/svg/react.svg',
    title: 'React JS',
  },
];

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
  {
    start_date: '2009',
    end_date: '',
    enterprise: '',
    isRecent: true,
    project: "Bachelor's degree",
    role: 'Colegio Paula Montal',
  },
];

const language: Language[] = [
  {
    title: 'Spanish',
    subtitle: 'Native (C2)',
  },
  {
    title: 'English',
    subtitle: 'Proficient (B2)',
  },
];

export default function MainPage() {
  return (
    <>
      <section className="flex flex-row items-center mx-0 mt-0 px-0">
        <div className="order-2 lg:basis-1/2 lg:order-1 px-8 pt-8 lg:m-auto">
          <span className="text-gray-500 text-lg font-light">Full-Stack developer</span>
          <h1 className="text-4xl lg:text-6xl mb-5">
            Hi, I&#39;m <strong>José Duque.</strong>
          </h1>
          <p className="text-justify">
            Colombian Software Engineer with more than 8 years of experience in web application
            development.
          </p>
          <br />
          <p className="text-justify">
            I am focused on guaranteeing quality solutions based on good practices with technologies
            on <b>monolithic architectures</b> as well as <b>microservices architectures</b>.
          </p>
          <div className="flex justify-between gap-2 mt-8 mb-4 lg:my-8 w-full lg:w-auto">
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
        <picture className="w-full order-1 lg:basis-1/2 lg:order-2 overflow-hidden">
          <Image
            className="shadow rounded"
            alt="José Miguel Duque"
            width="1400"
            height="1197"
            src="/static/img/avatar_w_1400.webp"
          />
        </picture>
      </section>
      <section className="flex flex-col m-8 gap-x-10 gap-y-2 lg:px-2">
        <h2 className="text-lg lg:text-xl mb-3 font-semibold underline-offset-4 underline decoration-primary">
          What have I done?
        </h2>
        <p>
          During my working life, I have had the opportunity to have a broad view of the client
          specific needs to solve any technological challenge that arises; I have played roles as
          advisor and coordinator in development teams for public sector companies such as the{' '}
          <strong>Alcaldia de Itagüí</strong>, <strong>Alcaldía de Bogotá</strong>,{' '}
          <strong>Ministerio de Educación Nacional</strong> and <strong>EAFIT University</strong>. I
          have also participated in custom development projects and website development with{' '}
          <strong>Marketing agencies</strong> full-time and alternatively as a{' '}
          <strong>Freelancer</strong> part-time.
          <br />
          <br />
          With <strong>software factories</strong> I have had the opportunity to work for{' '}
          <strong>Educational Startups</strong> with great regional reach, as well as for the{' '}
          <strong>Banking</strong> sector, <strong>Insurances</strong> and <strong>Health</strong>,
          which have allowed us to expand knowledge and comply with the rigidity of the policies of
          said market.
          <br />
          <br />
          In accordance with the search for a more specialized orientation to the most popular
          technologies, I have participated in national intensive learning sessions of{' '}
          <strong>Node JS</strong> and carried out individual studies on Frontend technologies such
          as <strong>React JS</strong>, <strong> Vue JS</strong>, as well as other basic approaches
          in <strong>Angular</strong>.<br />
          <br />
          From the Backend, studies in <strong>
            architectures based on microservices
          </strong> using <strong>Amazon Web Services</strong> and <strong>Azure DevOps</strong>,
          this in search of profiling myself as a competent Full Stack developer for the needs of
          the current market.
        </p>
      </section>
      <section className="flex flex-col lg:flex-row gap-x-10 m-8">
        <div className="basis-full">
          {/*Education*/}
          <h3 className="text-base lg:text-xl mb-6 font-semibold underline-offset-8 underline decoration-yellow-400">
            Academic studies & Certifications
          </h3>
          {education.map((e, i) => (
            <ExperienceItem key={i} {...e} />
          ))}
        </div>
        <div className="basis-full lg:basis-2/3">
          {/*Languages*/}
          <h3 className="text-base lg:text-xl mb-6 font-semibold underline-offset-8 underline decoration-yellow-400">
            Languages
          </h3>
          <div className="grid grid-cols-2 gap-x-6">
            {language &&
              language.map((l, i) => (
                <Card className="flex flex-col justify-center items-center" key={`language-${i}`}>
                  <CardHeader>
                    <Languages size={40} strokeWidth={1} className="dark:text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="mt-3 lg:mt-0 text-center text-muted-foreground leading-tight">
                      <b>{l.title}</b>
                      <small className="block mt-1">{l.subtitle}</small>
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
