import { EmailData, FAKE_EMAILS } from './mail.types';

export const utils = {
  maskEmails: (to: EmailData[] | EmailData): string[] => {
    return (Array.isArray(to) ? to : [to]).map((emailData) => {
      const email = emailData.address;
      return email.indexOf('@') > 0
        ? email[0] + '*'.repeat(email.indexOf('@') - 1) + email.slice(Math.max(0, email.indexOf('@')))
        : email;
    });
  },
  removeEmpty: (to: EmailData | EmailData[]) => {
    return (Array.isArray(to) ? to : [to]).filter((emailData) => {
      return emailData.address.trim().length > 0 && !FAKE_EMAILS.includes(emailData.address);
    });
  },
};
