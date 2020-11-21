/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
      id
      date
      timeFrame
      contextID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        timeFrame
        contextID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPractice = /* GraphQL */ `
  query GetPractice($id: ID!) {
    getPractice(id: $id) {
      id
      quota
      lab
      createdAt
      updatedAt
    }
  }
`;
export const listPractices = /* GraphQL */ `
  query ListPractices(
    $filter: ModelPracticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPractices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quota
        lab
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
