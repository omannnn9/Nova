import type { ReactNode } from 'react';
import AnimatedContent from '../reactbits/AnimatedContent/AnimatedContent';
import DecryptedText from '../reactbits/DecryptedText/DecryptedText';
import './SectionHeader.css';

interface SectionHeaderProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** split: title left, lede right (default). stacked: lede below the title. */
  layout?: 'split' | 'stacked';
  className?: string;
}

/** Asymmetric section opener: numbered mono eyebrow, oversized title, supporting copy offset to the right. */
const SectionHeader = ({ id, index, eyebrow, title, lede, layout = 'split', className = '' }: SectionHeaderProps) => (
  <header className={`section-header section-header--${layout} ${className}`}>
    <p className="section-header__eyebrow eyebrow">
      <span className="eyebrow__index">{index}</span>
      <DecryptedText text={eyebrow} animateOn="view" sequential speed={40} characters="NOVA01/\\_" />
    </p>
    <AnimatedContent distance={40} duration={1.1} className="section-header__body">
      <h2 id={id} className="section-header__title display">
        {title}
      </h2>
      {lede && <p className="section-header__lede">{lede}</p>}
    </AnimatedContent>
  </header>
);

export default SectionHeader;
