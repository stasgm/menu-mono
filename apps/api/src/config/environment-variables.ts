import { z } from 'zod';

export const validationSchemaForEnv = z.object({
  DATABASE_URL: z.string().url(),
});

export type EnvironmentVariables = z.infer<typeof validationSchemaForEnv>;
