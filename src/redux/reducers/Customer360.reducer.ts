import {
  CUSTOMER_SEARCH_FAIL,
  CUSTOMER_SEARCH_REQUEST,
  CUSTOMER_SEARCH_SUCCESS,
  GET_SINGLE_CUSTOMER_FAIL,
  GET_SINGLE_CUSTOMER_REQUEST,
  GET_SINGLE_CUSTOMER_SUCCESS,
} from 'Redux/constants/Customer360.constants'

// export type ResponseType = {
//   loading: boolean
//   success?: boolean
//   serverResponse?: {
//     status?: string
//     message?: string
//     data?: any
//   }
//   serverError?: {
//     status?: string
//     error?: {
//       message?: string
//     }
//   }
// }
// export const initialStateRequest = {
//   loading: false,
//   success: false,
//   serverResponse: {},
//   serverError: {},
// }

export const customerSearchReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER_SEARCH_REQUEST:
      return { loading: true }

    case CUSTOMER_SEARCH_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER_SEARCH_FAIL:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}

export const getSingleCustomer360Reducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case GET_SINGLE_CUSTOMER_REQUEST:
      return { loading: true }

    case GET_SINGLE_CUSTOMER_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case GET_SINGLE_CUSTOMER_FAIL:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
