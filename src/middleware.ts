import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  const emailLinkError = 'Email link is invalid or has expired';
  if (req.nextUrl.searchParams.get('error_description') === emailLinkError && req.nextUrl.pathname !== '/signup') {
    return NextResponse.redirect(
      new URL(`/signup?error_description=${req.nextUrl.searchParams.get('error_description')}`, req.url)
    );
  }
  if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // if (req.nextUrl.pathname.startsWith('/dashboard/cv')) {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (!user) {
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }

  //   const cvId = req.nextUrl.pathname.split('/').pop();

  //   const { data: cv } = await supabase.from('cvs').select('*').eq('id', cvId).eq('cvOwner', user.id);

  //   if (!cv || !cv.length) {
  //     return NextResponse.rewrite(new URL('/not-found', req.url));
  //   }
  // }

  return res;
}
