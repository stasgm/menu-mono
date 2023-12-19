import { InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

// TODO check how to create a schema from type
const registerSchema = z.object({
  name: z.string().describe('The name of the user'),
  password: z.string().describe('The password of the user'),
});

@InputType()
export class RegisterDto extends createZodDto(registerSchema) {}
