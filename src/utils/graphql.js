import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
        phone
        type
    }
}
`;

export const LOGIN_USER = gql`
  query Query($loginInput: LoginInput) {
  login(loginInput: $loginInput) {
    token
    tokenExpiration
    userId
  }
}
`;

export const GET_ACCOUNT = gql`
  query AccountBalance($userId: String) {
  accountBalance(userId: $userId) {
    balance
    user {
      phone
    }
  }
}
`;

export const CREATE_BET = gql`
  mutation CreateBet($betInput: BetInput) {
  createBet(betInput: $betInput) {
    clientSeed
    amount
    nonce
    serverSeed
    nonce
    point
    user {
      phone
    }
  }
}
`;

export const DEDUCT_ACCOUNT = gql`
  query DeductAccountBalance($userId: String, $amount: String) {
    deductAccountBalance(userId: $userId, amount: $amount) {
        balance
        user {
          phone
        }
      }
  }

`;