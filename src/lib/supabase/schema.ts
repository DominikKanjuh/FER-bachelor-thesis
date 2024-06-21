import { boolean, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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
  cvOwner: uuid('cv_owner').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  content: json('template').notNull(),
});
