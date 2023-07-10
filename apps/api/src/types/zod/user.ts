import * as z from 'zod';

export const UserModel = z.object({
  id: z.number().int(),
  phoneNumber: z.string(),
  name: z.string(),
});
