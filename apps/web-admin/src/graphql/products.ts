import { gql } from '@apollo/client';

export const getProducts = gql`
  query GetProducts {
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
`;
