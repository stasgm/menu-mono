import { gql } from '@apollo/client';

import { getClient } from '@/lib/apolloClient';

const query = gql`
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
`;

export default async function getAllProducts() {
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
        cache: 'no-store',
      },
    },
  });

  if (!data.getPosts) return {};

  return data.products;
}
