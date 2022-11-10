import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'
import { GET_FORM_FAIL, GET_FORM_REQUEST, GET_FORM_SUCCESS } from 'Redux/constants/FormManagement.constants'

export type ResponseType = {
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

export const getFormReducer = (state: ResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_FORM_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_FORM_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }
    // return { ...state, ...publishedForm }

    case GET_FORM_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}
