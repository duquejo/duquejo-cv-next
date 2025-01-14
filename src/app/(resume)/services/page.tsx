import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CodeXml, Computer, Database, Languages } from 'lucide-react';
import { Experience } from '@/components/resume/experience/Experience';
import { ExperienceType } from '@/interfaces/experience';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const experiences: ExperienceType[] = [
  {
    start_date: '2023',
    end_date: 'Present',
    enterprise: 'SURA Insurance - Ceiba Software S.A.S',
    isRecent: true,
    project: 'SURA Insurance - Integrations Team Bus',
    role: 'Backend developer',
    resume: [
      'Design and creation of serverless services for the Azure Cloud, implementing event-oriented architectures (RabbitMQ / ServiceBus) and HTTP/REST feature services aimed at solving all the required integrations between Salesforce Industries and SURA Colombia in the sales and shipping process vehicle insurance business.',
    ],
    additional_info:
      'Skills: Azure Functions, Azure Service Bus, CosmoDB, Terraform, Microservices, Node.js, JMeter, Unit Tests, Integration Tests, SonarQube, Git Flow, JWT, Scrum.',
  },
  {
    start_date: '11/07/2022',
    end_date: '28/04/2023',
    enterprise: 'Aval Digital Labs - Aval AV Villas Group - Ceiba Software S.A.S',
    isRecent: false,
    project: 'Aval Digital Labs - AV Villas Bank / Credit Card Infrastructure Migration team',
    role: 'Senior backend developer',
    resume: [
      'Migration of legacy (manually) infrastructure from Amazon Web Services to Infrastructure as Code using Serverless Framework and Terraform guaranteeing enterprise standards and full supervision of the configuration of the application architecture components.',
      'Refactoring and optimization of the legacy code given to lambdas (Node-JS/Java) and monoliths (Java Springboot) involved in the application, improving up to a percentage greater than or equal to 85% of the Quality Gates standards against good practices required by the company, improving in a high percentage the execution performance of lambdas and code associated with step functions used in the application.',
      'Generation of new components with business logic added to support the work cell in parallel to production activities. migration, allowing flexibility between migration loads.',
      'Generation of security policies and vulnerability corrections in accordance with the OWASP standard, the results of which adequately responded to the high internal demands of the organization Aval Digital Labs as well as Banco AV Villas.',
    ],
    additional_info:
      'Skills: DynamoDB, Node.js, Spring Framework, Express, Angular, HTML, AWS, Gradle, Jira, Maven, JMeter, Jenkins, Docker, Unit Test, Functional test, AWS Cognito, Microservices, Git Flow, JWT.',
  },
  {
    start_date: '07/02/2022',
    end_date: '06/07/2022',
    enterprise: 'Aval Digital Labs & Los Nogales school - MentuApp - Ceiba Software S.A.S',
    isRecent: false,
    project: 'Mentu App',
    role: 'Full-Stack developer',
    resume: [
      'Development of a learning platform for primary and secondary school.',
      'Starting from a hexagonal architecture, oriented to microservices and using Serverless Framework with AWS Node JS (Typescript) AWS Lambdas, SOLID principles were favored, maintainability and optimization of resources guaranteeing high availability and high persistence of information through AWS DocumentDB using Mongoose as ODM for the final application and TypeORM for AWS RDS relational databases of external Postgres and MySQL services.',
      'With the Serverless framework, strategies were made available with AWS Cloudformation to decentralize each Lambda to correspond to the desired Datalake, connecting Amazon Web Services services, such as API Gateway, S3 (hooks), SNS, SQS, among others.',
      'An ETL was made available that delivers standardized and optimized information for the Metabase platform, generating updated and complete information through AWS Eventbridge.',
      'The frontend was built with React JS, Webpack and Typescript, dividing the core of the business in different microservices through Module Federation and generalizing graphical frontend components through a common NPM library based on good practices from the library.',
      'External applications were connected through microservices such as Mixpanel, Concerto, Hotjar, Analytics to guarantee UX strategies for the target audience (Teachers and students).',
    ],
    additional_info:
      'Skills: MySQL, MongoDB, PostgreSQL, Nest JS, AWS SQS, Node.js, HTML, CSS, React.js, Tailwind, AWS Cognito, Typescript, Serverless Framework.',
  },
  {
    start_date: '12/12/2021',
    end_date: '27/12/2021',
    enterprise: 'Ceiba Software S.A.S',
    isRecent: false,
    project: 'ADN Ceiba',
    role: 'Software architect developer',
    resume: [
      'A hexagonal architecture was defined and developed where domain orientation, solid principles and maintainability of the projects are favored.</li><li>All this under a continuous integration process with static code analysis and execution of tests that guarantee the quality of the developed project.',
      'It was possible to build front implemented under a core, share and feature architecture, with management of this global using Redux.',
    ],
    additional_info:
      'Skills: PostgreSQL, MySQL, SASS, HTML, CSS3, React.js, TypeScript, Redux, Nest JS, JMeter, NPM, Jenkins, Sonar, Git, Unit test, Integration test, E2E Test.',
  },
  {
    start_date: '05/05/2021',
    end_date: '10/12/2021',
    enterprise: 'SM Digital',
    isRecent: false,
    project: 'SM Digital - Website development & Custom Integrations between third parties',
    role: 'Tech-lead developer',
    resume: [
      'Custom Website development using WordPress as CMS, modularization of business logic functionalities through good practices via Plugins, creation of custom themes, fully responsive and optimized for the web, designed with the aim of optimizing profits and generate customer visibility through Marketing strategies.',
      'Implementation of virtual stores and integrations with third parties, such as payment gateways, ERP, CRM, specialized for collecting leads used in Marketing, in addition implementation of SSO (Single Sign-On) services with social networks such as Facebook/Twitter/Instagram, among others.',
      'Implementation of customized automated messaging strategies for platforms via WhatsApp, using authorized APIs for the business , which made it possible to communicate reports to lists of authorized clients in a simple way.',
      'Various strategies were used for the frontend and backend, highlighting HTML, CSS, JS (jQuery Frameworks, Angular JS and React JS), PHP and Node JS respectively for the creation of websites and generation of applications for third parties, as well as integrators between unsupported platforms.',
    ],
    additional_info:
      'Skills: MySQL, MongoDB, jQuery, Node.js, Express, React.js, Bootstrap, SASS, HTML5, CSS3, Jira, Trello, WordPress CMS, WooCommerce, JavaScript, TypeScript, PHP, Auth0, JWT, Laravel.',
  },
  {
    start_date: '05/04/2020',
    end_date: '29/11/2020',
    enterprise: 'Nutresa Group - SM Digital',
    isRecent: false,
    project: 'E-learning Client School for vendors (LMS)',
    role: 'Full-Stack developer',
    resume: [
      'Full-Stack project developed from scratch, which had to be built under the WordPress CMS framework which exposed REST services to be consumed from the application client.',
      'The frontend had to be built with Angular JS and the use of libraries was allowed for the manipulation of multimedia content.',
      'Implement UX strategies due to the target population (50 years or older)',
      'The delivery of multimedia resources had to be optimized and respond to a high flow of users, using AWS S3, AWS CloudFront, among others.',
    ],
    additional_info:
      'Skills: MySQL, Angular JS, Bootstrap, SASS, HTML, CSS3, AWS, Jira, Trello, Git, Javascript, PHP, MVC.',
  },
  {
    start_date: '14/12/2019',
    end_date: '04/05/2021',
    enterprise: 'SURA Insurances - Colombia - SM Digital',
    isRecent: false,
    project: 'SURA Advisors Intranet',
    role: 'Full-Stack developer',
    resume: [
      'Full-Stack project where the integration of a SEUS 4 (Active Directory - SAML) was required, integrating it with an E-Commerce using WordPress with WooCommerce as CMS.',
      'According to the good practices for WordPress, it was required to set up an adaptable plugin, based on an MVC architecture, which favored the division of its logic and components.',
      'The application had to have custom reports, generated via CSV which come from different sources such as Google Docs and external REST APIs.',
      'The project was completed by complying with the functional requirements and the quality of the software advocated by the client.',
    ],
    additional_info:
      'Skills: SASS, CSS3, jQuery, Bootstrap, Wordpress, WooCommerce, NPM, Jira, Trello, SAML, PHP, JWT, Azure Active Directory MySQL, Git, JavaScript.',
  },
  {
    start_date: '16/05/2019',
    end_date: '23/06/2019',
    enterprise: 'Zenú meat foods - Colombia - SM Digital',
    isRecent: false,
    project: 'Corporate Zenú - Game Advance and learn!',
    role: 'Frontend developer',
    resume: [
      'Interactive Frontend project developed from scratch, with Angular 7 technology under the architecture recommended by the Angular style guide.',
      'It sought to satisfy the principles of maintainability, respecting concepts of clean code and design patterns suggested by the framework.',
    ],
    additional_info:
      'Skills: Angular JS, AWS, Jira, Trello, PHP, JavaScript, TypeScript, Functional Test.',
  },
  {
    start_date: '16/05/2019',
    end_date: '23/06/2019',
    enterprise: 'Familia Group',
    isRecent: false,
    project: 'Familia Group Co - Napkin simulator - SM Digital',
    role: 'Full-Stack developer',
    resume: [
      'Full-Stack interactive project developed from scratch, under the WordPress CMS Framework.',
      'Due to the infrastructure suggested by the client, it was necessary to use jQuery and libraries focused on manipulating the DOM.',
      'The project required respecting very specific brand directives directly related to the functional requirements.',
    ],
    additional_info:
      'Skills: MySQL, Bootstrap, SASS, HTML, Jira, Trello, WordPress, PHP, MVC, jQuery.',
  },
  {
    start_date: '14/12/2019',
    end_date: '04/05/2021',
    enterprise: 'COLGAS',
    isRecent: false,
    project: 'Insa (NORGAS) - Energy quote simulator - SM Digital',
    role: 'Frontend developer',
    resume: [
      'Frontend project developed from scratch, which required using entirely JavaScript (Vanilla) technology.',
      "This quote used very precise calculations that are carried out in detail due to the company's quality policies, therefore that the interaction with the client had to be constant.",
      'The continuous deployment process was properly configured through scheduled tasks on a remote server in the cloud.',
    ],
    additional_info: 'Skills: MySQL, Bootstrap, SASS, HTML, Jira, JavaScript.',
  },
  {
    start_date: '03/02/2019',
    end_date: '12/06/2021',
    enterprise: 'Presente Éxito group',
    isRecent: false,
    project: 'Vacation resort quote simulator/generator',
    role: 'Full-Stack developer',
    resume: [
      'Full-Stack project developed from scratch, with PHP technologies and using the Framework for WordPress web pages.',
      'In accordance with the good practices of the Wordpress CMS, it was required to build entirely using a plugin, implementing a MVC architecture.',
      'It was important for the client to respond clearly to the functional requirements, whose importance lay in the calculation, the evaluation of results and their deployment (PDF - Email), which were used for strategies of Marketing and Digital Guidelines. It was essential that it be fully manageable and configurable.',
    ],
    additional_info:
      'Skills: MySQL, Bootstrap, SASS, HTML, CSS, WordPress, Jira, JavaScript, MVC, Trello, PHP, jQuery.',
  },
  {
    start_date: '07/11/2017',
    end_date: '10/10/2018',
    enterprise: 'EAFIT University',
    isRecent: false,
    project: 'EAFIT University - Plataforma Línea en Informática Educativa (Imaginar futuros)',
    role: 'Full-Stack developer',
    resume: [
      'Full-Stack project developed from scratch, under the WordPress CMS Framework (PHP).',
      'It required using good CMS practices for its construction, so its modules were developed under the Kernel architecture /Plugin, common in CMS such as WordPress.',
      'It required managing information dynamically from the frontend using jQuery and Ajax.',
      'Different cloud service structures had to be maintained for its users and collaborators, using the AWS suite for this (S3, Glacier, Cloudfront, Route 53, etc.) and administration of Azure and Office 365 Cloud services.',
    ],
    additional_info:
      'Skills: MySQL, Bootstrap, SASS, HTML, CSS, WordPress, Jira, JavaScript, AWS, MVC, Trello, PHP, jQuery, Office 365.',
  },
];

const education: ExperienceType[] = [
  {
    start_date: 'November 2021',
    end_date: '',
    enterprise: 'Ruta N Corporation - Ceiba Software S.A.S - Globant',
    isRecent: true,
    project: 'Certification',
    role: 'Boot-camp Node JS',
  },
  {
    start_date: '2010',
    end_date: '2016',
    enterprise: 'Politécnico Colombiano Jaime Isaza Cadavid',
    isRecent: true,
    project: 'Professional',
    role: 'Software Engineering',
  },
];

export default function ServicesPage() {
  return (
    <article className="flex flex-col mt-5 lg:mt-0 px-8 pt-8">
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
          <Card>
            <CardHeader>
              <CardTitle>Backend development</CardTitle>
              <CardDescription>General backend development services.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Database size={70} strokeWidth={1} />
              <div className="basis-3/4 mt-3 lg:mt-0">
                <p className="text-sm text-justify text-muted-foreground">
                  Server-side logic programming, databases, API programming, third-party
                  integrations, architecture definitions and continuous deployment based on good
                  development practices.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Frontend development</CardTitle>
              <CardDescription>General frontend development services.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Computer size={70} strokeWidth={1} />
              <div className="basis-3/4 mt-3 lg:mt-0">
                <p className="text-sm text-justify text-muted-foreground">
                  Client-side logic programming, based on semantic structuring practices,
                  adaptability, accessibility and maintainability.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Website development</CardTitle>
              <CardDescription>Complete website development services.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <CodeXml size={70} strokeWidth={1} />
              <div className="basis-3/4 mt-3 lg:mt-0">
                <p className="text-sm text-justify text-muted-foreground">
                  Creation and maintenance of custom websites, informational sites, E-Commerces,
                  Funnels, Courses and development of custom plugins for WordPress.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Consulting & Mentoring</CardTitle>
              <CardDescription>Customized development mentoring service.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <BookOpen size={70} strokeWidth={1} />
              <div className="basis-3/4 mt-3 lg:mt-0">
                <p className="text-sm text-justify text-muted-foreground">
                  Mentoring and consulting services in general topics, like optimization, security
                  and good development practices.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-x-10">
        <div className="basis-full">
          <h3 className="text-base lg:text-xl mb-6 mt-5 font-semibold underline-offset-8 underline decoration-yellow-400">
            Experience
          </h3>
          {experiences.map((experience, i) => (
            <Experience key={i} {...experience} />
          ))}
          {/*Education*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Academic studies
          </h3>
          {education.map((e, i) => (
            <Experience key={i} {...e} />
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
          <div className="flex justify-between mb-1">
            <strong className="text-xs">Javascript</strong>
            <strong className="text-xs">10%</strong>
          </div>
          <Progress className="mb-2" value={10} />
          <div className="flex justify-between mb-1">
            <strong className="text-xs">Javascript</strong>
            <strong className="text-xs">10%</strong>
          </div>
          <Progress className="mb-2" value={20} />
          <div className="flex justify-between mb-1">
            <strong className="text-xs">Javascript</strong>
            <strong className="text-xs">10%</strong>
          </div>
          <Progress className="mb-2" value={30} />
          <div className="flex justify-between mb-1">
            <strong className="text-xs">Javascript</strong>
            <strong className="text-xs">10%</strong>
          </div>
          <Progress className="mb-2" value={40} />
          <div className="flex justify-between mb-1">
            <strong className="text-xs">Javascript</strong>
            <strong className="text-xs">10%</strong>
          </div>
          <Progress value={50} />
          {/*Framework & Libraries*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Libraries & Frameworks
          </h3>
          <div>
            <div className="flex justify-between mb-1">
              <strong className="text-xs">Javascript</strong>
              <strong className="text-xs">10%</strong>
            </div>
            <Progress className="mb-2" value={60} />
            <div className="flex justify-between mb-1">
              <strong className="text-xs">Javascript</strong>
              <strong className="text-xs">10%</strong>
            </div>
            <Progress className="mb-2" value={70} />
            <div className="flex justify-between mb-1">
              <strong className="text-xs">Javascript</strong>
              <strong className="text-xs">10%</strong>
            </div>
            <Progress className="mb-2" value={80} />
            <div className="flex justify-between mb-1">
              <strong className="text-xs">Javascript</strong>
              <strong className="text-xs">10%</strong>
            </div>
            <Progress className="mb-2" value={90} />
            <div className="flex justify-between mb-1">
              <strong className="text-xs">Javascript</strong>
              <strong className="text-xs">10%</strong>
            </div>
            <Progress value={5} />
          </div>
          {/*Knowledges*/}
          <h3 className="text-base lg:text-xl mb-6 mt-10 font-semibold underline-offset-8 underline decoration-yellow-400">
            Tools & Soft-skills
          </h3>
          <div className="flex flex-wrap gap-2 lg:gap-3 justify-evenly lg:justify-normal">
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
            <Badge>React JS</Badge>
          </div>
        </div>
      </section>
    </article>
  );
}
