import { EmailData } from './mail.types';

export const utils = {
  maskEmails: (to: EmailData[] | EmailData): string[] => {
    return (Array.isArray(to) ? to : [to]).map((emailData) => {
      const email = emailData.address;
      return email.indexOf('@') > 0
        ? email[0] + '*'.repeat(email.indexOf('@') - 1) + email.slice(Math.max(0, email.indexOf('@')))
        : email;
    });
  },
};
