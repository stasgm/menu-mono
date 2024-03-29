export const AppErrors = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  INVALID_DATA: 'INVALID_DATA',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_ACTIVATION_CODE: 'INVALID_ACTIVATION_CODE',
  INVALID_ACTIVATION_CODE_ATTEMPTS_EXCEEDED: 'INVALID_ACTIVATION_CODE_ATTEMPTS_EXCEEDED',
  USER_DISABLED: 'USER_DISABLED',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_ACTIVATED: 'USER_ALREADY_ACTIVATED',
} as const;

export type AppError = (typeof AppErrors)[keyof typeof AppErrors];
