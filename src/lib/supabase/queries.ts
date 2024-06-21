'use server';

import db from '../supabase/db';
import { cvs } from '../../../migrations/schema';
import { CV } from './supabase.types';

export const createCV = async (cv: CV) => {
  try {
    const response = await db.insert(cvs).values(cv);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};
