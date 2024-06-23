'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '../drizzle/db';
import { CVType } from '../drizzle/types';

export const getAllCVs = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const cvs = await db.query.cvs.findMany({
    where: (cv, { eq }) => eq(cv.cvOwner, user.id),
  });

  return cvs as CVType[];
};
