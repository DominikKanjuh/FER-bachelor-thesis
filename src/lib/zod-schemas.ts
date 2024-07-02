import { z } from 'zod';
import { PDFFont, PageSizes } from 'pdf-lib';

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

export const CVTitleDescriptionSchema = z.object({
  title: z.string().min(1, { message: 'Title of the CV is required' }),
  description: z.string().optional().nullable(),
});

const PDFFontSchema = z.any().refine((val): val is PDFFont => val instanceof PDFFont, {
  message: 'Expected PDFFont instance',
});

export const CVFieldSchema = z.object({
  x: z.number().int().min(0).max(PageSizes.A4[0]),
  y: z.number().int().min(0).max(PageSizes.A4[1]),
  width: z.number().int().min(0).max(PageSizes.A4[0]),
  height: z.number().int().min(0).max(PageSizes.A4[1]),
  rotate: z.number().int().min(-360).max(360).nullable(),
  fontSize: z.number().int().min(1).max(100).nullable(),
  fontFamily: PDFFontSchema.nullable(), // PDFFont
  fontColor: z.string().min(4).max(7).regex(/^#/).nullable(), // hex color
});

export const AISuggestionGeneralSchema = z.object({
  input: z.string(),
});

export const AISuggestionJobApplicationSchema = z.object({
  input: z.string(),
  jobDescription: z.string().min(1, { message: 'Job Description is required. ' }),
});
