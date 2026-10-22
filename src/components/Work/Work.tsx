import SectionHeader from '../ui/SectionHeader';
import ProjectCase from './ProjectCase';
import { projects } from '../../config/projects';
import './Work.css';

/** Delivered projects, shown with real screenshots and Nova's verified part in each. */
const Work = () => {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          eyebrow="Work"
          title={
            <>
              Real projects, <span className="accent">as they are.</span>
            </>
          }
          lede="Screenshots of the actual sites, what each one does and exactly which part of it Nova built."
        />
        <div className="work__list">
          {projects.map(project => (
            <ProjectCase key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
