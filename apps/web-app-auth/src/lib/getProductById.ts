import { gql } from '@apollo/client';

import { getClient } from '@/lib/apolloClient';

const query = gql`
  query getProductById($productId: String!) {
    product(id: $productId) {
      id
      name
    }
  }
`;

export default async function getProductById(productId: string) {
  const { data } = await getClient().query({
    query,
    variables: { productId },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
      cache: 'must-revalidate',
    },
  });

  if (!data.getPostByUuid) return {};

  return data.product;
}
