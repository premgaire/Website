export const doiUrl = (doi?: string) => (doi ? `https://doi.org/${doi}` : undefined);

export const formatDate = (d: Date | string, style: 'long' | 'short' = 'long') => {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', style === 'long'
    ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
    : { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
};

export const pubTypes = {
  journal: 'Peer-reviewed journal articles',
  conference: 'Conference papers and proceedings',
  chapter: 'Book chapters and other scholarly contributions',
  'working-paper': 'Working papers and manuscripts',
  thesis: 'Theses',
} as const;

/** Links an article to its own page or to the outlet that published it. */
export const articleHref = (a: { id: string; data: { externalUrl?: string } }) =>
  a.data.externalUrl ?? `/insights/${a.id}/`;
