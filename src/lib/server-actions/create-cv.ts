'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import db from '../drizzle/db';
import { CvInsert, cvs } from '../drizzle/schema';
import { cookies } from 'next/headers';

export async function createCV(values: CvInsert) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  values.cvOwner = user.id;
  return db
    .insert(cvs)
    .values(values)
    .returning()
    .then((res) => res[0].id);
}
