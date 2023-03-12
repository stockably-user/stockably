export type Region = 'eu' | 'na' | 'fe';

export const Region: { [key: string]: Region } = {
  eu: 'eu',
  na: 'na',
  fe: 'fe',
} as const;
