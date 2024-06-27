import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets and _next routes.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/api/(.*)'],
};
