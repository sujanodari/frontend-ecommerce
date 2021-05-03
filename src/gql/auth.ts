import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    Login(input: $loginInput) {
      accessToken
      role
      _id
    }
  }
`;

export const AUTHENTICATED_USER = gql`
  query AuthenticatedUser {
    AuthenticatedUser @client {
      accessToken
      isLoggedIn
      user {
        _id
        role
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    Logout
  }
`;
export const FORGET_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    ForgotPassword(input: $input) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    ResetPassword(input: $input) {
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    ChangePassword(input: $input) {
      message
    }
  }
`;
