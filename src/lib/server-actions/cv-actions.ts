'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '../drizzle/db';
import { cvs } from '../drizzle/schema';
import { CVType, CvInsertType } from '../drizzle/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

export async function deleteCV(cvId: string) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const cv = await db.query.cvs.findFirst({
    where: (cv, { eq }) => eq(cv.id, cvId),
  });

  // const cv = await db
  //   .select({
  //     id: cvs.id,
  //     inTrash: cvs.inTrash,
  //   })
  //   .from(cvs)
  //   .where(eq(cvs.id, cvId))
  //   .then((res) => res[0]);

  if (!cv) return;

  if (!cv.inTrash) {
    await db.update(cvs).set({ inTrash: true }).where(eq(cvs.id, cvId));
  } else {
    await db.delete(cvs).where(eq(cvs.id, cvId));
  }

  revalidatePath('/dashboard');
}

export async function removeFromTrashCV(cvId: string) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const cv = await db.query.cvs.findFirst({
    where: (cv, { eq }) => eq(cv.id, cvId),
  });

  if (!cv) return;

  if (cv.inTrash) {
    await db.update(cvs).set({ inTrash: false }).where(eq(cvs.id, cvId));
  }

  revalidatePath('/dashboard');
}
