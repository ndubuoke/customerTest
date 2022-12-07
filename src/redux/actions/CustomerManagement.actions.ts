import axios from 'axios'
import { Dispatch } from 'redux'
import {
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_FAIL,
  GET_REQUESTS_SUCCESS,
} from '../constants/CustomerManagement.constants'
import store, { ReducersType } from 'Redux/store'
import { GET_SINGLE_REQUEST_REQUEST, GET_SINGLE_REQUEST_SUCESS, GET_SINGLE_REQUEST_FAIL, GET_CUSTOMERS_ACTIVITY_LOG_REQUEST, GET_CUSTOMERS_ACTIVITY_LOG_SUCCESS, GET_CUSTOMERS_ACTIVITY_LOG_FAIL } from '../constants/CustomerManagement.constants';
import {
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
} from '../constants/CustomerManagement.constants'
import {
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  GET_CUSTOMERS_BY_DATE_REQUEST,
  GET_CUSTOMERS_BY_DATE_SUCCESS,
  GET_CUSTOMERS_BY_DATE_FAIL,
} from '../constants/CustomerManagement.constants'

type order = '' | 'asc' | 'desc'

type dateFilterType = 'day' | 'month'
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com/v1'

export const getCustomersAction =
  (customerType: string, customerStatus: string = '', order: order = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/customer/profile/type/${customerType}?filter=${customerStatus}&sort=${order}`, config)

      dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getCustomersRequestsAction =
  (customerType: string, requestStatus: string = '', requestType: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_REQUESTS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/request/customer/${customerType}?filter=${requestStatus}&requestType=${requestType}`, config)

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

      const { data } = await axios.get(`${SERVER_URL}/customer/by/date?filterBy=${filter}&number=${number}`, config)

      dispatch({ type: GET_CUSTOMERS_BY_DATE_SUCCESS, payload: data })
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
  (requestStatus: string, customerType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_REQUESTS_FOR_CHECKER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/request/data/checker?status=${requestStatus}&customerType=${customerType}`, config)

      dispatch({ type: GET_REQUESTS_FOR_CHECKER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_REQUESTS_FOR_CHECKER_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }




  export const getSingleRequestAction =
    (requestId:string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
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
          type: GET_SINGLE_REQUEST_FAIL ,
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