import Image from 'next/image';
import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import {
  ACADEMIC_DATA as academic,
  LANGUAGE_DATA as language,
  STACK_DATA as stack,
} from '@/lib/constants';
import { HeroImage } from '@/components/resume/hero-image/HeroImage';

export default function MainPage() {
  return (
    <>
      <section className="flex flex-col lg:flex-row lg:justify-center items-center mx-0 mt-5 py-10 relative">
        <div className="order-2 lg:basis-3/5 lg:order-1 px-10 pb-0 pt-5 lg:pt-0">
          <span className="text-foreground font-light mt-10">Full-Stack developer</span>
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
          <div className="flex justify-center gap-x-10 mt-8 w-full lg:w-auto">
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
          What have I done?
        </h2>
        <p className="text-justify">
          During my working life, I have had the opportunity to have a broad view of the client
          specific needs to solve any technological challenge that arises; I have played roles as
          advisor and coordinator in development teams for public sector companies such as the{' '}
          <strong>Alcaldía de Itagüí</strong>, <strong>Alcaldía de Bogotá</strong>,{' '}
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
      <section className="flex flex-col lg:flex-row gap-x-10 m-10">
        <div className="basis-full">
          {/*Education*/}
          <h3 className="text-base lg:text-xl mb-6 font-semibold underline-offset-8 underline decoration-yellow-400">
            Academic studies & Certifications
          </h3>
          {academic.map((a, i) => (
            <ExperienceItem key={i} {...a} />
          ))}
        </div>
        <div className="basis-full lg:basis-2/3">
          {/*Languages*/}
          <h3 className="text-base lg:text-xl mt-5 lg:mt-0 mb-6 font-semibold underline-offset-8 underline decoration-yellow-400">
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
