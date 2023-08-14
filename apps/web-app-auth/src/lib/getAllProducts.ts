import { gql } from '@/lib/types';

export const query = gql(`
  query getAllProducts {
    products {
      id
      name
      disabled
      categories {
        id
        name
      }
    }
  }
`);
