/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
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
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
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
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
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
export const createPractice = /* GraphQL */ `
  mutation CreatePractice(
    $input: CreatePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    createPractice(input: $input, condition: $condition) {
      id
      quota
      lab
      createdAt
      updatedAt
    }
  }
`;
export const updatePractice = /* GraphQL */ `
  mutation UpdatePractice(
    $input: UpdatePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    updatePractice(input: $input, condition: $condition) {
      id
      quota
      lab
      createdAt
      updatedAt
    }
  }
`;
export const deletePractice = /* GraphQL */ `
  mutation DeletePractice(
    $input: DeletePracticeInput!
    $condition: ModelPracticeConditionInput
  ) {
    deletePractice(input: $input, condition: $condition) {
      id
      quota
      lab
      createdAt
      updatedAt
    }
  }
`;
