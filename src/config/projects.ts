/**
 * Projects shown in the Work section, in display order.
 *
 * Only publish what can be backed up: the project's own code, Git history or the client's permission.
 *
 * To add a project: put its logo in src/assets/projects/ (square, at least 144 px, WebP), import it
 * here and add an entry. No layout changes are needed.
 */
import flyingDodoLogo from '../assets/projects/flying-dodo-logo.webp';
import kgRentalsLogo from '../assets/projects/kg-rentals-logo.webp';

export type ProjectStatus = 'live' | 'in-development' | 'private';

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  private: 'Private'
};

export interface Project {
  id: string;
  name: string;
  logo: string;
  /** One sentence on what it is. */
  summary: string;
  /** What was delivered, e.g. "Website". */
  kind: string;
  /** Who it is for, e.g. "Craft brewery, Mauritius". */
  sector: string;
  year: string;
  status: ProjectStatus;
  /** Public address. Only set once verified as reachable and approved by the client. */
  url?: string;
  urlLabel?: string;
}

export const projects: Project[] = [
  {
    id: 'flying-dodo',
    name: 'Flying Dodo Brewing Company',
    logo: flyingDodoLogo,
    summary: 'Website for the Bagatelle craft brewery: its beers, brewpub and where to buy them across the island.',
    kind: 'Website',
    sector: 'Craft brewery, Mauritius',
    year: '2026',
    status: 'live',
    url: 'https://www.flyingdodo.com',
    urlLabel: 'www.flyingdodo.com'
  },
  {
    id: 'kg-rentals',
    name: 'Ketan Gungah · KG Rentals',
    logo: kgRentalsLogo,
    summary:
      'Digital business card for the director of a property management firm: services, English and French, and one-tap WhatsApp contact.',
    kind: 'Website',
    sector: 'Property management, Mauritius',
    year: '2026',
    status: 'live',
    url: 'https://kg-liart.vercel.app',
    urlLabel: 'kg-liart.vercel.app'
  }
];
