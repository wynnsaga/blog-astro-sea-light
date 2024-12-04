import { defineCollection, z } from "astro:content";

const posts = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        abstract: z.string().optional(),
        notice: z.string().optional(),
        image: z.string().optional(),
        date: z.object({
            publish: z.date(),
            update: z.date().optional(),
        }),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
        pin: z.boolean().default(false)
    })
})

const books = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string().optional(),
        relation: z.string().optional(),
        description: z.string().optional()
    })
})

const essays = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        description: z.string().optional()
    })
})

const journeys = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        image: image(),
        abstract: z.string(),
        description: z.string().optional()
    })
})

export const collections = {
    posts,
    books,
    essays,
    journeys
};