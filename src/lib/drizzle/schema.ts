import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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

export const cvs = pgTable('cvs', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
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
  content: jsonb('content'),
});
