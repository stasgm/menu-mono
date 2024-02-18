const USER_REGISTRATION = 'userRegistration';
const RESET_PASSWORD = 'resetPassword';

const MailTypes = {
  USER_REGISTRATION,
  RESET_PASSWORD,
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

export interface IUserPasswordResetData extends IUserAdditionalData {
  code: string;
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
  [MailTypes.RESET_PASSWORD]: {
    templateName: 'reset-password',
    subject: 'Reset user password',
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
