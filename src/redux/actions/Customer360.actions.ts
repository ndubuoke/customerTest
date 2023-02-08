import { CUSTOMER_SEARCH_FAIL, CUSTOMER_SEARCH_REQUEST, CUSTOMER_SEARCH_SUCCESS } from 'Redux/constants/Customer360.constants'

// Customer360Search

import { Dispatch } from 'redux'
import axios from 'axios'

// CUSTOMER URL
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'

export const customer360SearchAction = (id) => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch({ type: CUSTOMER_SEARCH_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/customer/search?search=${id}`, config)
    dispatch({ type: CUSTOMER_SEARCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER_SEARCH_FAIL, payload: error?.response && error?.response?.data?.message })
  }
}
