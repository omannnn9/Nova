import NovaMark from './NovaMark';
import './NovaLogo.css';

interface NovaLogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

/** Lockup A10: mark + lowercase "nova". Mark height ≈ x-height + ascender; spacing is one stem. */
const NovaLogo = ({ tone = 'dark', className = '' }: NovaLogoProps) => (
  <span className={`nova-logo nova-logo--${tone} ${className}`}>
    <NovaMark tone={tone} className="nova-logo__mark" />
    <span className="nova-logo__word" aria-hidden="true">
      nova
    </span>
    <span className="sr-only">Nova</span>
  </span>
);

export default NovaLogo;
