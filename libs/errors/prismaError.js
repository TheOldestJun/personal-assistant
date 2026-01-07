import { Prisma } from '@prisma/client';

const DUPLICATE_MESSAGES = {
  user: 'Такий користувач вже існує',
  product: 'Така ТМЦ вже існує',
  unit: 'Така одиниця виміру вже існує',
  default: 'Запис з таким значенням вже існує',
};

const NOT_FOUND_MESSAGES = {
  user: 'Користувача не знайдено',
  product: 'ТМЦ не знайдено',
  unit: 'Одиницю виміру не знайдено',
  default: 'Запис не знайдено',
};

export function parsePrismaError(error, context = {}) {
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const entity =
      context.entity ||
      error.__entity ||
      'default';

    // 🔴 UNIQUE
    if (error.code === 'P2002') {
      return {
        status: 409,
        code: 'DUPLICATE',
        message: DUPLICATE_MESSAGES[entity] || DUPLICATE_MESSAGES.default,
      };
    }

    // 🔵 NOT FOUND
    if (error.code === 'P2025') {
      return {
        status: 404,
        code: 'NOT_FOUND',
        message: NOT_FOUND_MESSAGES[entity] || NOT_FOUND_MESSAGES.default,
      };
    }

    return {
      status: 400,
      code: error.code,
      message: 'Помилка бази даних',
    };
  }

  return {
    status: 500,
    code: 'INTERNAL_ERROR',
    message: 'Внутрішня помилка сервера',
  };
}
