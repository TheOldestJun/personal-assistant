import { NextResponse } from 'next/server';

import { parsePrismaError } from '../errors/prismaError';

export function withErrorHandling(handler) {
  return async (request, routeContext) => {
    try {
      return await handler(request, routeContext);
    } catch (error) {
      const parsed = parsePrismaError(error);

      return NextResponse.json(
        {
          error: {
            code: parsed.code,
            message: parsed.message,
          },
        },
        { status: parsed.status }
      );
    }
  };
}
