import { NextResponse } from 'next/server';

import { parsePrismaError } from '../errors/prismaError';

export function withErrorHandling(handler) {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      const parsed = parsePrismaError(error);

      return NextResponse.json(
        {
          error: {
            message: parsed.message,
            code: parsed.code,
          },
        },
        { status: parsed.status }
      );
    }
  };
}
