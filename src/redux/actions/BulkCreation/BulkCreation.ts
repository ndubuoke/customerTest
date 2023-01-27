// import axios from 'axios'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  SET_BULK_CREATION_SUMMARY,
  SET_FILE_UPLOADED,
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
  VALIDATE_BULK_CUSTOMER_FAILED,
  VALIDATE_BULK_CUSTOMER_REQUEST,
  VALIDATE_BULK_CUSTOMER_SUCCESS,
  SAVE_BULK_CUSTOMER_FAILED,
  SAVE_BULK_CUSTOMER_REQUEST,
  SAVE_BULK_CUSTOMER_SUCCESS
} from 'Redux/constants/BulkCreation'

const SERVER_URL = `https://customer-management-api-dev.reventtechnologies.com`

interface ActionTypes {
  SET_FILE_UPLOADED: any,
  SET_BULK_CREATION_SUMMARY: any
  VALIDATE_BULK_CUSTOMER_FAILED: any
  VALIDATE_BULK_CUSTOMER_REQUEST: any
  VALIDATE_BULK_CUSTOMER_SUCCESS: any
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE: any
  SAVE_BULK_CUSTOMER_FAILED: any,
  SAVE_BULK_CUSTOMER_REQUEST: any,
  SAVE_BULK_CUSTOMER_SUCCESS: any,
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}

export type setBulkCreationActionTypes = MessageAction

export const setBulkCreationSummary = (summary: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_BULK_CREATION_SUMMARY,
    payload: summary,
  })
}

export const updateValidatedCustomers = (customers: any) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
    payload: customers,
  })
}
export const setFileUploaded = (payload: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_FILE_UPLOADED,
    payload
  })
}

export const validateCustomers = (customers: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: VALIDATE_BULK_CUSTOMER_REQUEST,
    })
    const config = {
      headers: {

      }
    }
    const { data } = await axios.post(`${SERVER_URL}/v1/bulk-customer/validate`, customers)
    console.log(data)
    if (data?.status === 'success') {
      dispatch({
        type: VALIDATE_BULK_CUSTOMER_SUCCESS,
        payload: data?.data
      })
    }
  } catch (error) {
    dispatch({
      type: VALIDATE_BULK_CUSTOMER_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const saveCustomers = (customerData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SAVE_BULK_CUSTOMER_REQUEST,
    })
    const config = {
      headers: {

      }
    }
    // https://retailcore-customerservice.herokuapp.com/v1/bulk-customer/create
    const { data } = await axios.post(`${SERVER_URL}/v1/bulk-customer/create`, customerData)

    if (data?.status === 'success') {
      dispatch({
        type: SAVE_BULK_CUSTOMER_SUCCESS,
        payload: data?.message
      })
    }
  } catch (error) {
    dispatch({
      type: SAVE_BULK_CUSTOMER_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}