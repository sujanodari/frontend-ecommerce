import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query Users($input: UserQueryInput) {
    Users(input: $input) {
      data {
        id: _id
        role
        email
        name
        disable
      }
    }
  }
`;

export const FETCH_USER = gql`
  query User($input: GetByIdInput) {
    User(input: $input) {
      _id
      role
      name
      email
      disable
    }
  }
`;
