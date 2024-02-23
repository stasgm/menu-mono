import { gql } from 'apollo-server-express';

export const loginUserQuery = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      ... on ActivationToken {
        activationToken
      }
      ... on Auth {
        accessToken
        refreshToken
        user {
          active
          id
          name
          role
        }
      }
    }
  }
`.loc?.source.body;

export const activateUserQuery = gql`
  mutation ActivateUser($activateUserInput: ActivateUserInput!) {
    activateUser(activateUserInput: $activateUserInput) {
      accessToken
      refreshToken
      user {
        id
        name
        role
        active
      }
    }
  }
`.loc?.source.body;
