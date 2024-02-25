import { gql } from 'apollo-server-express';

export const loginUserQuery = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
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

export const currentUserQuery = gql`
  query CurrentUser {
    getCurrentUser {
      id
      name
      role
      customer {
        id
        email
        firstName
        lastName
        phoneNumber
      }
    }
  }
`.loc?.source.body;

export const refreshActivationCodeQuery = gql`
  mutation RefreshActivationCode {
    refreshActivationCode {
      activationToken
    }
  }
`.loc?.source.body;

export const refreshTokensQuery = gql`
  mutation RefreshTokens {
    refreshTokens {
      accessToken
      refreshToken
    }
  }
`.loc?.source.body;
