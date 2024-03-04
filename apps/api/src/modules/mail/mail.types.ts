const MailTypes = {
  USER_REGISTRATION: 'userRegistration',
  USER_ACTIVATION_REQUEST: 'userActivationRequest',
  USER_ACTIVATION_CONFIRMATION: 'userActivationConfirmation',
  RESET_PASSWORD_REQUEST: 'resetPasswordRequest',
  RESET_PASSWORD_CONFIRMATION: 'resetPasswordConfirmation',
} as const;

export type MailType = (typeof MailTypes)[keyof typeof MailTypes];

export interface IUserAdditionalData {
  userName: string;
  location: string;
  originIp: string;
  device: string;
}

export interface IUserRegistrationData extends IUserAdditionalData {
  code: string;
}

export interface IUserRegistrationConfirmationData extends IUserAdditionalData {
  // code: string;
}

export interface IUserForgotPasswordData extends IUserAdditionalData {
  resetLink: string;
}

export interface IUserPasswordResetData extends IUserAdditionalData {
  // code: string;
}

export interface IMailData<T extends IUserAdditionalData> {
  to: string;
  data: T;
  type: MailType;
}

interface IMailTemplates {
  [name: string]: {
    templateName: string;
    subject: string;
  };
}

export const Templates: IMailTemplates = {
  [MailTypes.USER_REGISTRATION]: {
    templateName: 'user-registration',
    subject: 'User registration',
  },
  [MailTypes.USER_ACTIVATION_CONFIRMATION]: {
    templateName: 'user-activation-confirmation',
    subject: 'User activation confirmation',
  },
  [MailTypes.RESET_PASSWORD_REQUEST]: {
    templateName: 'reset-password-request',
    subject: 'Password reset request',
  },
  [MailTypes.RESET_PASSWORD_CONFIRMATION]: {
    templateName: 'reset-password-confirmation',
    subject: 'Change user password confirmation',
  },
};

export type EmailData = { name: string; address: string };

export type SendEmailParams<T = never> = {
  to: EmailData | EmailData[];
  // bcc?: EmailData | EmailData[];
  // from: EmailData;
  type: MailType;
  context: T;
  // attachments?: AttachmentData[];
  subject?: string;
  dryRun?: boolean;
};

export const FAKE_EMAILS = ['noemail@noemail.com'];
export const DEFAULT_TRANSPORT_NAME = 'gmail';
