import {
  VALIDATE_CUSTOMER_REQUEST,
  VALIDATE_CUSTOMER_SUCCESS,
  VALIDATE_CUSTOMER_FAIL,
  VALIDATE_CUSTOMER_RESULT_MODAL,
} from 'Redux/constants/ValidateCustomer.constant'

export type validateCustomerResponseType = {
  loading: boolean
  success?: boolean
  showResultModal: boolean
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
  showResultModal: false,
  serverResponse: {},
  serverError: {},
}

export const validateCustomerReducer = (state: validateCustomerResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case VALIDATE_CUSTOMER_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case VALIDATE_CUSTOMER_SUCCESS:
      return { ...state, loading: false, success: true, showResultModal: true, serverResponse: action.payload, serverError: {} }

    case VALIDATE_CUSTOMER_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }
    case VALIDATE_CUSTOMER_RESULT_MODAL:
      return { ...state, showResultModal: action.payload }
    default:
      return state
  }
}
