/* Jobs */

import { EmailData, MailType } from '@/modules/mail/mail.types';

export const MAIL_QUEUE = 'mailQueue';

export type MailJob<T = never> = {
  type: MailType;
  context: T;
  to: EmailData | EmailData[];
  subject?: string;
  dryRun?: boolean;
};

export const getBullmqPrefix = (env: string) => `${env.toUpperCase()}-BULLMQ-SCHEDULED-JOBS`;

export type JobTypes = typeof MAIL_QUEUE;
