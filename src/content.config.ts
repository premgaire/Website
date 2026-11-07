/**
 * Content definitions.
 *
 * This file tells the website what fields each kind of content has.
 * You normally do NOT need to edit it. To add or change content, edit the
 * files in src/content/ and src/data/ — see MAINTENANCE.md.
 */
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Op-eds, commentary and reflections: one Markdown file each in src/content/articles/
const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleOriginal: z.string().optional(), // e.g. the Nepali title
    date: z.coerce.date(),
    summary: z.string().optional(),
    language: z.enum(['en', 'ne']).default('en'),
    category: z.enum(['Op-Ed', 'Commentary', 'Insight', 'Reflection']).default('Insight'),
    outlet: z.string().optional(), // e.g. "Naya Patrika"
    externalUrl: z.string().url().optional(), // if the article lives on another site
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Research projects and entrepreneurship initiatives: one Markdown file each in src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['research', 'entrepreneurship']),
    status: z.enum(['ongoing', 'completed']),
    period: z.string(),
    role: z.string().optional(),
    funder: z.string().optional(),
    collaborators: z.array(z.string()).default([]),
    summary: z.string(),
    link: z.string().url().optional(),
    order: z.number().default(100), // lower numbers appear first
  }),
});

// Long-form page text (biography, research agenda, teaching philosophy ...): src/content/pages/
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string() }),
});

// All publications live in ONE file: src/data/publications.yaml
const publications = defineCollection({
  loader: file('./src/data/publications.yaml'),
  schema: z.object({
    type: z.enum(['journal', 'conference', 'chapter', 'working-paper', 'thesis']),
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    venue: z.string(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(), // just the DOI, e.g. 10.3126/ljbe.v14i1.92490
    url: z.string().url().optional(),
    pdf: z.string().optional(), // a file in public/documents/, e.g. /documents/paper.pdf
    summary: z.string().optional(),
    featured: z.boolean().default(false), // show on the home page
  }),
});

export const collections = { articles, projects, pages, publications };
