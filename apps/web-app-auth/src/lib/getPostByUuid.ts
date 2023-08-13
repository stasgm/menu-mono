import { gql } from '@apollo/client';

import { getClient } from '@/lib/apolloClient';

const query = gql`
  query GetPostByUuid($uuid: String!) {
    getPostByUuid(uuid: $uuid) {
      uuid
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export default async function getPostByUuid(postUuid: string) {
  const { data } = await getClient().query({
    query,
    variables: { uuid: postUuid },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
      cache: 'must-revalidate',
    },
  });

  if (!data.getPostByUuid) return {};

  return data.getPostByUuid;
}
