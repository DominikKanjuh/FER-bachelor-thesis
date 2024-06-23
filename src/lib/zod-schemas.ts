import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z.string().describe('Password').min(6, 'Password must be minimum 6 characters'),
    confirmPassword: z.string().describe('Confirm Password').min(6, 'Password must be minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: z.string().describe('Email').email({
    message: 'Invalid email address',
  }),
  password: z.string().describe('Password').min(1, 'Password is required.'),
});

export const CVCreationSchema = z.object({
  title: z.string().min(1, { message: 'Title of the CV is required' }),
  description: z.string().optional().nullable(),
});
