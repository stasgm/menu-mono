export const AppErrors = {
  INVALID_DATA: 'INVALID_DATA',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_DISABLED: 'USER_DISABLED',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

export type AppError = (typeof AppErrors)[keyof typeof AppErrors];
