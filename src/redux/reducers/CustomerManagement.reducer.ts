import { GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_FAIL, GET_CUSTOMERS_SUCCESS } from 'Redux/constants/CustomerManagement.constants'
export type customersResponseType = {
  loading: boolean
  success?: boolean
  serverResponse?: {
    status?: string
    message?: string
    data?: any
  }
  serverError?: {
    status?: string
    error?: {
      message?: string
    }
  }
}
export const initialStateRequest = {
  loading: false,
  success: false,
  serverResponse: {},
  serverError: {},
}

export const getCustomersReducer = (state: customersResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case GET_CUSTOMERS_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
