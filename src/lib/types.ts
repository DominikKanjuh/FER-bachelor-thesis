import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().describe('Email').email({
    message: 'Invalid email address',
  }),
  password: z.string().describe('Password').min(1, 'Password is required.'),
});

export const CVCreationSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
});
