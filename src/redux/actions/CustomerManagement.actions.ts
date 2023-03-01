import axios from 'axios'
import { Dispatch } from 'redux'

import store, { ReducersType } from 'Redux/store'

import {
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_FAIL,
  GET_REQUESTS_SUCCESS,
  UPDATE_REQUEST_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  GET_SINGLE_REQUEST_REQUEST,
  GET_SINGLE_REQUEST_SUCESS,
  GET_SINGLE_REQUEST_FAIL,
  GET_CUSTOMERS_ACTIVITY_LOG_REQUEST,
  GET_CUSTOMERS_ACTIVITY_LOG_SUCCESS,
  GET_CUSTOMERS_ACTIVITY_LOG_FAIL,
  ACTIVATE_CUSTOMER_FAIL,
  ACTIVATE_CUSTOMER_REQUEST,
  ACTIVATE_CUSTOMER_SUCCESS,
  GET_REQUESTS_BY_DATE_REQUEST,
  GET_REQUESTS_BY_DATE_SUCCESS,
  GET_REQEUSTS_BY_DATE_FAIL,
  GET_TOTAL_REQUEST_STATUS_REQUEST,
  GET_TOTAL_REQUEST_STATUS_SUCCESS,
  GET_TOTAL_REQUEST_STATUS_FAIL,
  GET_REQUESTS_FOR_CHECKER_REQUEST,
  GET_REQUESTS_FOR_CHECKER_SUCCESS,
  GET_REQUESTS_FOR_CHECKER_FAIL,
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  GET_CUSTOMERS_BY_DATE_REQUEST,
  GET_CUSTOMERS_BY_DATE_SUCCESS,
  GET_CUSTOMERS_BY_DATE_FAIL,
  GET_CATEGORIZED_PRODUCTS_SUCCESS,
  GET_CATEGORIZED_PRODUCTS_REQUEST,
  GET_CATEGORIZED_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
} from '../constants/CustomerManagement.constants'

type order = '' | 'asc' | 'desc'

type dateFilterType = 'day' | 'month' | ''
// const SERVER_URL = 'https://9e99-18-133-131-7.eu.ngrok.io/v1'
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com/v1'
const PRODUCT_URL = 'https://product-management-api-dev.reventtechnologies.com/v1'

export const getCustomersAction =
  (customerType: string, customerStatus: string = '', order: order = '', initiatorId: string = '', approverId: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (initiatorId === '' && approverId === '') {
        const { data } = await axios.get(`${SERVER_URL}/customer/profile/type/${customerType}?filter=${customerStatus}&sort=${order}`, config)

        dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data })
      }
      if (initiatorId != '') {
        const { data } = await axios.get(
          `${SERVER_URL}/customer/profile/type/${customerType}?filter=${customerStatus}&sort=${order}&initiator=${initiatorId}`,
          config
        )

        dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data })
      }
      if (approverId != '') {
        const { data } = await axios.get(
          `${SERVER_URL}/customer/profile/type/${customerType}?filter=${customerStatus}&sort=${order}&approver=${approverId}`,
          config
        )

        dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data })
      }
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getCustomersRequestsAction =
  (customerType: string, requestStatus: string = '', requestType: string = '', initiatorId: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_REQUESTS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(
        `${SERVER_URL}/request/customer/${customerType}?filter=${requestStatus}&requestType=${requestType}&initiator=${initiatorId}`,
        config
      )

      dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_REQUESTS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const deleteRequestAction = (requestId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: DELETE_REQUEST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.delete(`${SERVER_URL}/request/${requestId}`, config)

    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_REQUEST_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const activateCustomerAction = (body: any) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: ACTIVATE_CUSTOMER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${SERVER_URL}/request/`, body)

    dispatch({ type: ACTIVATE_CUSTOMER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACTIVATE_CUSTOMER_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const getCustomersByDateAction =
  (filter: dateFilterType, number: number = 0) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_CUSTOMERS_BY_DATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (number === 0 && filter === '') {
        const { data } = await axios.get(`${SERVER_URL}/customer/by/date`, config)
        dispatch({ type: GET_CUSTOMERS_BY_DATE_SUCCESS, payload: data })
      } else {
        const { data } = await axios.get(`${SERVER_URL}/customer/by/date?filterBy=${filter}&number=${number}`, config)
        dispatch({ type: GET_CUSTOMERS_BY_DATE_SUCCESS, payload: data })
      }
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_BY_DATE_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getRequestsByDateAction =
  (filter: dateFilterType, number: number = 0) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_REQUESTS_BY_DATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/request/by/date?filterBy=${filter}&number=${number}`, config)

      dispatch({ type: GET_REQUESTS_BY_DATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_REQEUSTS_BY_DATE_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getTotalRequestStatusCustomersAction =
  (status: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_TOTAL_REQUEST_STATUS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/request?status=${status}`, config)

      dispatch({ type: GET_TOTAL_REQUEST_STATUS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_TOTAL_REQUEST_STATUS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getRequestsForCheckerAction =
  (requestStatus: string, customerType: string, requestType: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_REQUESTS_FOR_CHECKER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(
        `${SERVER_URL}/request/data/checker?status=${requestStatus}&customerType=${customerType}&requestType=${requestType}`,
        config
      )

      dispatch({ type: GET_REQUESTS_FOR_CHECKER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_REQUESTS_FOR_CHECKER_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getSingleRequestAction = (requestId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_SINGLE_REQUEST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/request/${requestId}`, config)

    dispatch({ type: GET_SINGLE_REQUEST_SUCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_SINGLE_REQUEST_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const getActivityLogAction = (customerId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_CUSTOMERS_ACTIVITY_LOG_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/activity-log/customer/${customerId}`, config)

    dispatch({ type: GET_CUSTOMERS_ACTIVITY_LOG_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_ACTIVITY_LOG_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const updateRequestAction =
  (body = {}, requestId: string) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: UPDATE_REQUEST_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.patch(`${SERVER_URL}/request/${requestId}`, body)

      dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: UPDATE_REQUEST_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

//  {*  PRODUCT ACTIONS *}

export const getCategorizedProductsAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_CATEGORIZED_PRODUCTS_REQUEST })

    const { data } = await axios.get(`${PRODUCT_URL}/product-category`)

    dispatch({ type: GET_CATEGORIZED_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CATEGORIZED_PRODUCTS_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}


export const getAllProductsAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })

    const { data } = await axios.get(`${PRODUCT_URL}/product`)

    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}
