import { getCollection, getEntry } from 'astro:content';

export const getArticles = async () =>
  (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const getProjects = async (category: 'research' | 'entrepreneurship') =>
  (await getCollection('projects', ({ data }) => data.category === category))
    .sort((a, b) => a.data.order - b.data.order);

export const getPublications = async () =>
  (await getCollection('publications')).sort((a, b) => b.data.year - a.data.year);

export const getPage = (id: string) => getEntry('pages', id);
