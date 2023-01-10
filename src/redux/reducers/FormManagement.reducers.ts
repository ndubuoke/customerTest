import { publishedForm, defaultPublishedFormPages } from 'Components/Form/Form-UIs/sampleForm'
import { UnfilledRequiredSignatoryListType } from 'Redux/actions/FormManagement.actions'
import { SET_REQUIRED_FORM_FIELDS } from 'Redux/constants/CustomerManagement.constants'
import {
  ACTIVE_PAGE,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_FORM_FAIL,
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_PUBLISHED_FORM_SECTION_FAIL,
  GET_PUBLISHED_FORM_SECTION_REQUEST,
  GET_PUBLISHED_FORM_SECTION_SUCCESS,
  GET_STATES_FAIL,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  SHOW_WAIVER_MODAL_IN_FORM,
  STATUS_FOR_CAN_PROCEED,
  SUBMIT_FORM_FAIL,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  UNFILLED_REQUIRED_SIGNATORY_LIST,
  UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON,
} from 'Redux/constants/FormManagement.constants'

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
      console.log('action.payload', action.payload)
      return {
        ...state,
        loading: false,
        success: true,
        serverResponse: {
          ...action.payload,
          data: {
            ...action.payload.data,
            builtFormMetadata: {
              ...action.payload.data.builtFormMetadata,
              pages: [...action.payload.data.builtFormMetadata.pages, ...defaultPublishedFormPages],
            },
          },
        },
        serverError: {},
      }
    // return { ...state, ...publishedForm }

    case GET_FORM_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}

export const getPublishedFormSectionReducer = (state: ResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_PUBLISHED_FORM_SECTION_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_PUBLISHED_FORM_SECTION_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case GET_PUBLISHED_FORM_SECTION_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}

export const setRequiredFormFieldsReducer = (state = { list: [] }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_REQUIRED_FORM_FIELDS:
      return { ...state, list: action.payload }

    default:
      return state
  }
}

export const statusForCanProceedReducer = (state = { status: false }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case STATUS_FOR_CAN_PROCEED:
      return { ...state, status: action.payload }

    default:
      return state
  }
}

export type ShowModalInFormType = { status: 'show' | 'hide' }

export const showWaiverModalInFormReducer = (state: ShowModalInFormType = { status: 'hide' }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SHOW_WAIVER_MODAL_IN_FORM:
      return { ...state, status: action.payload }

    default:
      return state
  }
}

export const activePageReducer = (state: { page: any; theIndex: number } = { page: {}, theIndex: null }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIVE_PAGE:
      return { ...state, page: action.payload.page, theIndex: action.payload.theIndex }

    default:
      return state
  }
}

export type UnfilledRequiredSignatoryListReducerType = { list: UnfilledRequiredSignatoryListType }
export const unfilledRequiredSignatoryListReducer = (
  state: { list: UnfilledRequiredSignatoryListType } = { list: [] },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UNFILLED_REQUIRED_SIGNATORY_LIST:
      return { ...state, list: action.payload?.list }

    default:
      return state
  }
}
export const unfilledRequiredSignatoryListButtonReducer = (
  state: { list: UnfilledRequiredSignatoryListType } = { list: [] },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON:
      return { ...state, list: action.payload?.list }

    default:
      return state
  }
}

export const submitFormReducer = (state: ResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case SUBMIT_FORM_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }
    // return { ...state, ...publishedForm }

    case SUBMIT_FORM_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}

export const getCountriesReducer = (state: ResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_COUNTRIES_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }
    // return { ...state, ...publishedForm }

    case GET_COUNTRIES_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}

export const getStatesReducer = (state: ResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_STATES_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_STATES_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }
    // return { ...state, ...publishedForm }

    case GET_STATES_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    //   case RESET_STATe:
    //     return { ...state, loading: false, success: false, serverResponse: {}, serverError: {} }
    default:
      return state
  }
}
