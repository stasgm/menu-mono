export const APP_ERRORS = {
  InvalidDataError: 'InvalidDataError',
  EmailNotConfirmed: 'EmailNotConfirmed',
  InvalidLogin: 'InvalidLogin',
} as const;

export type AppError = (typeof APP_ERRORS)[keyof typeof APP_ERRORS];
