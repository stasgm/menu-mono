import { gql } from '@apollo/client';

export const getOrders = gql`
  query getOrders {
    orders {
      id
      createdAt
      updatedAt
      date
      number
      status
      user {
        id
        name
        phoneNumber
      }
      lines {
        id
        price
        quantity
        totalAmount
        product {
          id
          name
          disabled
          categories {
            id
            name
          }
        }
      }
      totalAmount
      totalProductQuantity
    }
  }
`;
