import { gql } from '@apollo/client';
import { getClient } from '@/lib/apolloClient';

const query = gql`
  query getAllPosts {
    getPosts {
      uuid
      title
      content
      abstract
      coverImg
      updatedAt
      createdAt
    }
  }
`;

export default async function getAllPosts() {
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

  return data.getPosts;
}
