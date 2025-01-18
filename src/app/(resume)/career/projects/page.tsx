import { ExperienceItem } from '@/components/resume/experience/ExperienceItem';
import { Metadata } from 'next';
import { EXPERIENCE_DATA as experience, METADATA } from '@/lib/constants';

export const metadata: Metadata = METADATA['projects'];

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
