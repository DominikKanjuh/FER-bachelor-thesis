import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { cvs, users } from '../../../migrations/schema';

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export type CVType = InferSelectModel<typeof cvs>;
export type CvInsertType = InferInsertModel<typeof cvs>;
