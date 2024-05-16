import { z } from 'zod';

export const searchProductSchema = z
  .object({
    city: z.string(),
    text: z.string().default(""),
    categories: z.string().array().default([]),
    genders: z.string().array().default([]),
    sizes: z.string().array().default([]),
    state: z.number().nonnegative().default(0),
    minimumPrice: z.number().nonnegative().default(0),
    maximumPrice: z.number().nonnegative().default(10000),
    limit: z.number().nonnegative().default(20)
  })
  .required();

export type SearchProductDto = z.infer<typeof searchProductSchema>;