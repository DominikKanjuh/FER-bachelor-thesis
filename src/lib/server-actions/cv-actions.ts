'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '../drizzle/db';
import { cvs } from '../drizzle/schema';
import { CVType, CvInsertType } from '../drizzle/types';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

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

export const getCV = async (cvId: string) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  const cv = await db
    .select()
    .from(cvs)
    .where(and(eq(cvs.cvOwner, user.id), eq(cvs.id, cvId)))
    .then((res) => res[0]);

  return cv as CVType;
};

export const editCV = async (cvId: string, values: CvInsertType) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const cv = await db
    .select()
    .from(cvs)
    .where(and(eq(cvs.cvOwner, user.id), eq(cvs.id, cvId)))
    .then((res) => res[0]);

  if (!cv) return;

  await db.update(cvs).set(values).where(eq(cvs.cvOwner, user.id)).where(eq(cvs.id, cvId));

  revalidatePath(`/dashboard/cv/${cvId}`);
};

export async function createCV(values: CvInsertType) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  console.log('user', user);

  values.cvOwner = user.id;

  revalidatePath('/dashboard');

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
