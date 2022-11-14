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
import { ReducersType } from 'Redux/store'

const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/v1'

export const getCustomersAction =
  (customerType: string, customerStatus: string = '') =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: GET_CUSTOMERS_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${SERVER_URL}/customer/profile/type/${customerType}?filter=${customerStatus}`, config)

      dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const getCustomersRequestsAction = (customerType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_REQUESTS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/request/customer/${customerType}`, config)

    dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_REQUESTS_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}
