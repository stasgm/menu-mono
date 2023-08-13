import { FieldError } from './gql/graphql';

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  for (const { field, message } of errors) {
    errorMap[field] = message;
  }

  return errorMap;
};
