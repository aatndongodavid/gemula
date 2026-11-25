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
    // Calculé à partir des dates ; renseigner seulement « annule » ou « reporte » si besoin
    status: z.enum(['a-venir', 'en-cours', 'passe', 'annule', 'reporte']).default('a-venir'),
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

// Banque de questions du diagnostic : un fichier JSON par domaine dans src/content/diagnostic/.
// Pour ajouter une question, ajoutez un objet dans « questions » avec un identifiant unique.
const diagnostic = defineCollection({
  type: 'data',
  schema: z.object({
    domaine: z.string(),
    titre: z.string(),
    palier: z.enum(['essentiel', 'collaboratif', 'performance']),
    outils: z.enum(['tous', 'microsoft', 'google']),
    modules: z.array(z.string()).min(1),
    questions: z.array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'identifiant en minuscules, chiffres et tirets'),
        niveau: z.number().int().min(1).max(3),
        question: z.string().min(10),
        choix: z.array(z.string()).min(2).max(5),
        reponse: z.number().int().min(0),
        explication: z.string().optional()
      }).refine((q) => q.reponse < q.choix.length, { message: 'reponse doit désigner un des choix (0 = premier choix)' })
    ).min(1)
  })
});

export const collections = {
  diagnostic,
  projets,
  evenements,
  talents,
  journal
};
