import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export class LoginDto extends createZodDto(loginSchema) {
  email: string;
  password: string;
}
