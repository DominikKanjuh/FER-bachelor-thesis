import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: text('email').notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  }),
});

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export const cvs = pgTable('cvs', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  inTrash: boolean('in_trash').default(false).notNull(),
  cvOwner: uuid('cv_owner')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  content: json('template'),
});

export type Cv = InferSelectModel<typeof cvs>;
export type CvInsert = InferInsertModel<typeof cvs>;
