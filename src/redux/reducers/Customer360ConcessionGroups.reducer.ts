import {
  CUSTOMER360_CONCESSION_GROUPS_FAILED,
  CUSTOMER360_CONCESSION_GROUPS_REQUEST,
  CUSTOMER360_CONCESSION_GROUPS_SUCCESS,
} from 'Redux/constants/Customer360ConcessionGroups.constants'

export const getCustomer360ConcessionGroupsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_CONCESSION_GROUPS_REQUEST:
      return { loading: true }

    case CUSTOMER360_CONCESSION_GROUPS_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_CONCESSION_GROUPS_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
