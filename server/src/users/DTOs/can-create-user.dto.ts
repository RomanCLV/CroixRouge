import { z } from 'zod';

export const canCreateUserSchema = z
  .object({
    email: z.string(),
  })
  .required();

export type CanCreateUserDto = z.infer<typeof canCreateUserSchema>;