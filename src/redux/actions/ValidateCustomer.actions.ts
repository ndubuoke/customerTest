import { Dispatch } from 'redux'
import { ReducersType } from 'Redux/store'
import { API } from 'Utilities/api'
import {
  VALIDATE_CUSTOMER_REQUEST,
  VALIDATE_CUSTOMER_SUCCESS,
  VALIDATE_CUSTOMER_FAIL,
  VALIDATE_CUSTOMER_RESULT_MODAL,
} from '../constants/ValidateCustomer.constant'

export const validateCustomerAction =
  (identificationType: string, extractedData: { documentType: string; data: string[] }[], identityData: any) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: VALIDATE_CUSTOMER_REQUEST })

      const { data } = await API.post(`/verification/match/${identificationType}`, {
        extractedData,
        identityData,
      })

      dispatch({ type: VALIDATE_CUSTOMER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: VALIDATE_CUSTOMER_FAIL,
        payload: error?.response && error?.response?.data?.message,
      })
    }
  }

export const validateCustomerResultModalAction =
  (isVisible: boolean) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    dispatch({ type: VALIDATE_CUSTOMER_RESULT_MODAL, payload: isVisible })
  }
