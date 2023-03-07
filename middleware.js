import { get } from '@vercel/edge-config';
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};

export default async function middleware(request) {
  const url = request.nextUrl;
  const redirects = await get('redirects');

  for (const redirect of redirects) {
    if (redirect.source === url.pathname) {
      url.pathname = redirect.destination;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}