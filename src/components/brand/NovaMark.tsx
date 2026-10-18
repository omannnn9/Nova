import type { SVGProps } from 'react';
import { MARK_PARTS } from './markGeometry';

interface NovaMarkProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** dark: white stems + Electric diagonal (dark grounds). light: black stems + Nova Purple diagonal (light grounds). */
  tone?: 'dark' | 'light';
  title?: string;
}

/** "The Assembly, lit" — Nova's icon mark. Only the diagonal carries colour. */
const NovaMark = ({ tone = 'dark', title, ...props }: NovaMarkProps) => {
  const stem = tone === 'light' ? 'var(--nova-black)' : 'var(--nova-white)';
  const diagonal = tone === 'light' ? 'var(--nova-purple)' : 'var(--nova-electric)';

  return (
    <svg
      viewBox="0 0 100 100"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      <rect {...MARK_PARTS.left} fill={stem} />
      <polygon points={MARK_PARTS.diagonal} fill={diagonal} />
      <rect {...MARK_PARTS.right} fill={stem} />
    </svg>
  );
};

export default NovaMark;
