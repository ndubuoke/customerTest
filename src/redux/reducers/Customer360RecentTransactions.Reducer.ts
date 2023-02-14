import {
  CUSTOMER360_RECENT_TRANSACTIONS_FAILED,
  CUSTOMER360_RECENT_TRANSACTIONS_REQUEST,
  CUSTOMER360_RECENT_TRANSACTIONS_SUCCESS,
} from 'Redux/constants/Customer360RecentTransactions.constants'

export const getCustomer369RecentTransactionsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_RECENT_TRANSACTIONS_REQUEST:
      return { loading: true }

    case CUSTOMER360_RECENT_TRANSACTIONS_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_RECENT_TRANSACTIONS_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
