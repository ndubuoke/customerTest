import { ACTIVATE_CUSTOMER_REQUEST, ACTIVATE_CUSTOMER_SUCCESS, ACTIVATE_CUSTOMER_FAIL } from '../constants/CustomerManagement.constants';
import {
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  GET_CUSTOMERS_BY_DATE_REQUEST,
  GET_CUSTOMERS_BY_DATE_SUCCESS,
  GET_CUSTOMERS_BY_DATE_FAIL,
} from '../constants/CustomerManagement.constants'

import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  GET_REQUESTS_FAIL,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  SORT_CUSTOMERS_ALPHABETICALLY_REQUEST,
  SORT_CUSTOMERS_ALPHABETICALLY_SUCCESS,
  SORT_CUSTOMERS_ALPHABETICALLY_FAIL,
} from 'Redux/constants/CustomerManagement.constants'
export type customersManagementResponseType = {
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

export const getCustomersReducer = (state: customersManagementResponseType = initialStateRequest, action: { type: string; payload: any }) => {
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

export const getCustomersRequestReducer = (state: customersManagementResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_REQUESTS_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case GET_REQUESTS_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}

export const deleteRequestReducer = (state: customersManagementResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case DELETE_REQUEST_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case DELETE_REQUEST_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case DELETE_REQUEST_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}

export const activateCustomerReducer = (state: customersManagementResponseType = initialStateRequest, action: { type: string; payload: any }) => {
    switch (action.type) {
      case ACTIVATE_CUSTOMER_REQUEST:
        return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

      case ACTIVATE_CUSTOMER_SUCCESS:
        return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

      case ACTIVATE_CUSTOMER_FAIL:
        return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

      default:
        return state
    }
}

export const getCustomersByDateReducer = (state: customersManagementResponseType = initialStateRequest, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_CUSTOMERS_BY_DATE_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_CUSTOMERS_BY_DATE_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case GET_CUSTOMERS_BY_DATE_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
