/* Jobs */

export const MAIL_QUEUE = 'mailQueue';

export type MailJob<T = never> = {
  transporterName: 'gmail';
  to: string;
  subject: string;
  template: string;
  context: T;
};

export const getBullmqPrefix = (env: string) => `${env.toUpperCase()}-BULLMQ-SCHEDULED-JOBS`;

export type JobTypes = typeof MAIL_QUEUE;
