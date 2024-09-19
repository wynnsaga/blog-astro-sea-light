import { defineCollection, z } from "astro:content";

const books = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        author: z.string(),
        date: z.date(),
        description: z.string().optional()
    })
})

const essays = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string().optional()
    })
})


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

export const collections = {
    essays,
    posts
};