'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import db from '../drizzle/db';

import { cookies } from 'next/headers';
import { CvInsertType } from '../drizzle/types';
import { cvs } from '../drizzle/schema';

export async function createCV(values: CvInsertType) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  console.log('user', user);

  values.cvOwner = user.id;
  console.log('values', values);
  return db
    .insert(cvs)
    .values(values)
    .returning()
    .then((res) => res[0].id);
}
