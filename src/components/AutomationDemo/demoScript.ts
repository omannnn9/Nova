/**
 * Sample data and timing for the automation demo. Everything here is illustrative and local:
 * no AI model, inbox, calendar or messaging service is involved, and nothing is sent.
 */

export const ENQUIRY = {
  from: 'Sample customer',
  channel: 'Website contact form',
  time: '09:41',
  text: 'Hello, I’d like to book a consultation. Do you have any availability next Tuesday afternoon? Thank you!'
};

export const CLASSIFICATION = {
  label: 'Appointment request',
  details: [
    { term: 'Service', value: 'Consultation' },
    { term: 'Preferred time', value: 'Tuesday afternoon' },
    { term: 'Channel', value: 'Website contact form' }
  ]
};

export const SUGGESTED_REPLY =
  'Hi! Thank you for getting in touch. We can see you next Tuesday afternoon. Would 2:30 pm suit you? Reply here to confirm and we will reserve the time for you.';

export const FOLLOW_UP = {
  title: 'Confirm Tuesday consultation',
  details: [
    { term: 'Due', value: 'Tomorrow, 10:00' },
    { term: 'Linked to', value: 'Sample customer enquiry' },
    { term: 'Status', value: 'Open' }
  ]
};

export interface DemoStep {
  title: string;
  description: string;
  /** Announced (and shown) while this step is the latest one. */
  status: string;
}

export const STEPS: DemoStep[] = [
  {
    title: 'Enquiry arrives',
    description: 'A new message comes in from the website.',
    status: 'Step 1 of 4: a new enquiry has arrived.'
  },
  {
    title: 'Enquiry is sorted',
    description: 'It is recognised as an appointment request, with the key details picked out.',
    status: 'Step 2 of 4: identified as an appointment request.'
  },
  {
    title: 'Reply is drafted',
    description: 'A suggested reply is prepared for a person to review.',
    status: 'Step 3 of 4: drafting a suggested reply for review.'
  },
  {
    title: 'Follow-up is created',
    description: 'A task is added so the appointment is confirmed.',
    status: 'Step 4 of 4: follow-up task created. Demo complete.'
  }
];

/** Typing speed for the drafted reply (ms per character). Fixed, so the demo is deterministic. */
export const TYPING_MS = 16;

/** Delay before each step is revealed, measured from the previous step (ms). */
export const STEP_DELAYS = [0, 1500, 1500, SUGGESTED_REPLY.length * TYPING_MS + 700];
