import { z } from 'zod';

export const validationSchemaForEnv = z.object({
  DATABASE_URL: z.string(),
});

export type EnvironmentVariables = z.infer<typeof validationSchemaForEnv>;
