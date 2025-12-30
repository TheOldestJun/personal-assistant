import { Prisma } from '@prisma/client';

export function parsePrismaError(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          status: 409,
          message: 'Запис з таким значенням вже існує',
          code: 'DUPLICATE',
        };
      case 'P2025':
        return {
          status: 404,
          message: 'Запис не знайдено',
          code: 'NOT_FOUND',
        };
      default:
        return {
          status: 400,
          message: 'Помилка бази даних',
          code: error.code,
        };
    }
  }

  return {
    status: 500,
    message: 'Внутрішня помилка сервера',
    code: 'INTERNAL_ERROR',
  };
}
