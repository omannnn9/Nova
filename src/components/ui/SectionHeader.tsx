import type { ReactNode } from 'react';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import './SectionHeader.css';

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** split: title left, lede right (default). stacked: lede below the title. */
  layout?: 'split' | 'stacked';
  className?: string;
}

/** Section opener: a plain label, an oversized title and supporting copy. Reveals as one block. */
const SectionHeader = ({ id, eyebrow, title, lede, layout = 'split', className = '' }: SectionHeaderProps) => (
  <AnimatedContent distance={24} duration={1} className={`section-header section-header--${layout} ${className}`}>
    <p className="section-header__eyebrow eyebrow">{eyebrow}</p>
    <div className="section-header__body">
      <h2 id={id} className="section-header__title display">
        {title}
      </h2>
      {lede && <p className="section-header__lede">{lede}</p>}
    </div>
  </AnimatedContent>
);

export default SectionHeader;
