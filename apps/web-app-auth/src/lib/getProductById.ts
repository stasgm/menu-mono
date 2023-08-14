import { gql } from '@/lib/types';

export const query = gql(`
  query getProductById($productId: String!) {
    product(id: $productId) {
      id
      name
    }
  }
`);
