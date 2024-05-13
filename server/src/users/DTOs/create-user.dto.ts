import { z } from 'zod';

export const createUserSchema = z
    .object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        imagePath: z.string().default("")
    })
    .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;