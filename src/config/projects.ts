/**
 * Projects shown in the Work section, in display order. The first is presented as the featured case.
 *
 * Only publish what can be backed up: the project's own code, Git history or the client's permission.
 * Screenshots are captures of the real site (no mockups); keep a desktop and a phone capture of each
 * view at the sizes below so the frames stay aligned.
 *
 * To add a project: put its screenshots in src/assets/projects/<id>/ as WebP
 * (desktop 1920 and 1200 px wide at 16:10, phone 780 and 480 px wide at 390 x 844), import them here
 * and add an entry. No layout changes are needed.
 */
import fdHomeDesktop1920 from '../assets/projects/flying-dodo/home-desktop-1920.webp';
import fdHomeDesktop1200 from '../assets/projects/flying-dodo/home-desktop-1200.webp';
import fdHomeMobile780 from '../assets/projects/flying-dodo/home-mobile-780.webp';
import fdHomeMobile480 from '../assets/projects/flying-dodo/home-mobile-480.webp';
import fdBeersDesktop1920 from '../assets/projects/flying-dodo/beers-desktop-1920.webp';
import fdBeersDesktop1200 from '../assets/projects/flying-dodo/beers-desktop-1200.webp';
import fdBeersMobile780 from '../assets/projects/flying-dodo/beers-mobile-780.webp';
import fdBeersMobile480 from '../assets/projects/flying-dodo/beers-mobile-480.webp';
import fdStoresDesktop1920 from '../assets/projects/flying-dodo/stores-desktop-1920.webp';
import fdStoresDesktop1200 from '../assets/projects/flying-dodo/stores-desktop-1200.webp';
import fdStoresMobile780 from '../assets/projects/flying-dodo/stores-mobile-780.webp';
import fdStoresMobile480 from '../assets/projects/flying-dodo/stores-mobile-480.webp';

export type ProjectStatus = 'live' | 'in-development' | 'private';

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  private: 'Private'
};

export interface ProjectView {
  id: string;
  /** Short tab label. */
  label: string;
  /** What this view shows, in one sentence. */
  caption: string;
  desktop: { large: string; small: string; alt: string };
  phone: { large: string; small: string; alt: string };
}

export interface Project {
  id: string;
  name: string;
  /** What was delivered, e.g. "Website". */
  kind: string;
  /** Who it is for, e.g. "Craft brewery, Mauritius". */
  sector: string;
  year: string;
  status: ProjectStatus;
  /** Public address. Only set once verified as reachable and approved by the client. */
  url?: string;
  urlLabel?: string;
  summary: string;
  /** The problem the project addresses. */
  brief: string;
  /** Nova's verified part in the work. */
  contribution: string[];
  /** Work by others that appears in the project. */
  credits?: string;
  /** Technologies confirmed in the project's code. */
  stack: string[];
  views: ProjectView[];
}

export const projects: Project[] = [
  {
    id: 'flying-dodo',
    name: 'Flying Dodo Brewing Company',
    kind: 'Website',
    sector: 'Craft brewery, Mauritius',
    year: '2026',
    status: 'live',
    url: 'https://flyingdodo.com',
    urlLabel: 'flyingdodo.com',
    summary:
      'The website for the craft brewery and brewpub at Bagatelle: its beers, where to buy them, the brewpub and life at the brewery, in one place.',
    brief:
      'A brewery that releases a new beer every month needs a site that is easy to keep current, and that answers what visitors come to ask: what is pouring, where to buy it and how to visit.',
    contribution: [
      'Designed and built the site, from page structure to every section',
      'Beer range with style, strength, bitterness and food pairings',
      'Stockist directory, organised by region',
      'Brewpub details with a map, a photo gallery and social links',
      'Beers and stockists kept in simple data files, so updates never touch the layout'
    ],
    credits: 'Photography, logo and brewery copy by Flying Dodo Brewing Company.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    views: [
      {
        id: 'beers',
        label: 'Beer range',
        caption: 'Each beer with its style, ABV, IBU, Plato and a food pairing.',
        desktop: {
          large: fdBeersDesktop1920,
          small: fdBeersDesktop1200,
          alt: 'The Our Beers section on desktop: a note that a new beer is brewed every month, then beer cards showing style, ABV, IBU and Plato.'
        },
        phone: {
          large: fdBeersMobile780,
          small: fdBeersMobile480,
          alt: 'The Our Beers section on a phone, with beer cards in a single column.'
        }
      },
      {
        id: 'stores',
        label: 'Stockists',
        caption: 'The taproom first, then shops across the island, grouped by region.',
        desktop: {
          large: fdStoresDesktop1920,
          small: fdStoresDesktop1200,
          alt: 'The Stores and Locations section on desktop: the main brewery and taproom address, then regional lists of stockists, with the Centre region open.'
        },
        phone: {
          large: fdStoresMobile780,
          small: fdStoresMobile480,
          alt: 'The Stores and Locations section on a phone, showing the taproom address and the first regional list.'
        }
      },
      {
        id: 'home',
        label: 'Home',
        caption: 'The brewery introduces itself in its own words, under its original logo.',
        desktop: {
          large: fdHomeDesktop1920,
          small: fdHomeDesktop1200,
          alt: 'Flying Dodo website home page on desktop: the brewery logo and True Craft Beer badge above an introduction to the brewery.'
        },
        phone: {
          large: fdHomeMobile780,
          small: fdHomeMobile480,
          alt: 'Flying Dodo home page on a phone, with the logo and badge stacked above the introduction.'
        }
      }
    ]
  }
];
