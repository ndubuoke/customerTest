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
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_ALL_PRODUCT_TYPE_REQUEST,
  GET_ALL_PRODUCT_TYPE_SUCCESS,
  GET_ALL_PRODUCT_TYPE_FAIL,
  GET_CUSTOMER_PROFILE_REQUEST,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_CUSTOMER_PROFILE_FAIL,
  DEACTIVATE_CUSTOMER_REQUEST,
  DEACTIVATE_CUSTOMER_SUCCESS,
  DEACTIVATE_CUSTOMER_FAIL,
  ASSIGN_PRODUCT_REQUEST,
  ASSIGN_PRODUCT_SUCCESS,
  ASSIGN_PRODUCT_FAIL,
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

export const deactivateCustomerAction = (body: any) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: DEACTIVATE_CUSTOMER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${SERVER_URL}/request/`, body)

    dispatch({ type: DEACTIVATE_CUSTOMER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DEACTIVATE_CUSTOMER_FAIL,
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

export const getCustomerProfileAction = (customerId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_CUSTOMER_PROFILE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/customer/profile/${customerId}`, config)

    dispatch({ type: GET_CUSTOMER_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_PROFILE_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

//  {*  PRODUCT ACTIONS *}

export const getCategorizedProductsAction =
  (productCategory: string, product_type_id: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
     
      dispatch({ type: GET_CATEGORIZED_PRODUCTS_REQUEST })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      if (product_type_id == '' || undefined) {
        
        const { data } = await axios.get(`${PRODUCT_URL}/product?product_category=${productCategory}`, config)
        dispatch({ type: GET_CATEGORIZED_PRODUCTS_SUCCESS, payload: data })
      } else {
        const { data } = await axios.get(`${PRODUCT_URL}/product?product_category=${productCategory}&product_type_id=${product_type_id}`, config)
        dispatch({ type: GET_CATEGORIZED_PRODUCTS_SUCCESS, payload: data })
      }
    } catch (error) {
      dispatch({
        type: GET_CATEGORIZED_PRODUCTS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getAllProductsAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
     const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
     
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
 
    const { data } = await axios.get(`${PRODUCT_URL}/product`,config)

    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const getSingleProductAction = (productId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
     const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${PRODUCT_URL}/product/${productId}`,config)

    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const getAllProductTypesAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
    dispatch({ type: GET_ALL_PRODUCT_TYPE_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

   
    const { data } = await axios.get(`${PRODUCT_URL}/product-type`,config)

    dispatch({ type: GET_ALL_PRODUCT_TYPE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_TYPE_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

export const assignProductAction =
  (body = {}, requestId: string) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: ASSIGN_PRODUCT_REQUEST })

      

      const { data } = await axios.post(`${SERVER_URL}/request/assign-products/${requestId}`, body)

      dispatch({ type: ASSIGN_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ASSIGN_PRODUCT_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }
