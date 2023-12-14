import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

// TODO check how to create a schema from type
const registerSchema = z.object({
  // email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export class RegisterDto extends createZodDto(registerSchema) {
  password: string;
  name: string;
}
