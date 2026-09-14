import { defineCollection, z } from 'astro:content';

const projets = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.enum(['data-ia', 'software', 'web', 'design', 'automatisation', 'agriculture', 'energie']),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    year: z.number().optional(),
    problem: z.string(),
    context: z.string(),
    solution: z.string(),
    stack: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    role: z.string().optional(),
    results: z.string().optional(),
    status: z.enum(['en-cours', 'realise', 'experimental', 'concept']).default('realise'),
    links: z.object({
      demo: z.string().url().optional().or(z.literal('')),
      github: z.string().url().optional().or(z.literal(''))
    }).default({}),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([])
  })
});

const evenements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    domains: z.array(z.enum(['mathematiques', 'statistiques', 'informatique', 'ia-data'])),
    format: z.enum(['presentiel', 'en-ligne', 'hybride']),
    city: z.string(),
    country: z.string().default('Cameroun'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    organizer: z.string(),
    url: z.string().url(),
    registrationDeadline: z.coerce.date().optional(),
    status: z.enum(['a-venir', 'en-cours', 'passe']).default('a-venir'),
    source: z.string(),
    verifiedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    why: z.string().optional(),
    cover: z.string().optional()
  })
});

const talents = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(99),
    initials: z.string().max(3),
    expertise: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    bio: z.string().optional(),
    linkedin: z.string().url().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    photo: z.string().optional(),
    availability: z.string().optional(),
    location: z.string().optional()
  })
});

const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum([
      'vie-du-collectif',
      'projets',
      'stages',
      'competitions',
      'certifications',
      'evenements',
      'recherche',
      'publications'
    ]),
    publishedAt: z.coerce.date(),
    author: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  projets,
  evenements,
  talents,
  journal
};