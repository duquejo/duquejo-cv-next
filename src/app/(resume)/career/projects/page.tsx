import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';
import { Metadata } from 'next';
import { generateStandardTitle } from '@/lib/utils';
import { EXPERIENCE_DATA as experience } from '@/lib/constants';

export const metadata: Metadata = {
  title: generateStandardTitle('Projects'),
  description: 'Latest projects where I had been contributed',
};

export default function ProjectsPage() {
  return (
    <article className="mt-5 lg:mt-0 px-8 pt-5 pb-10">
      <h1 className="main-title">Latest projects</h1>
      <section className="mt-10">
        {experience.map((exp, i) => (
          <ExperienceItem key={i} {...exp} />
        ))}
      </section>
    </article>
  );
}
