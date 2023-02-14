import axios from 'axios'
import {
  CUSTOMER360_GET_PRODUCT_BY_TYPE_FAILED,
  CUSTOMER360_GET_PRODUCT_BY_TYPE_REQUEST,
  CUSTOMER360_GET_PRODUCT_BY_TYPE_SUCCESS,
} from 'Redux/constants/Customer360GetProductsByTypes'

const SERVER_URL = `https://product-management-api-dev.reventtechnologies.com`
const SERVER_URL2 = `https://product-management-api-dev.reventtechnologies.com`

export const customer360ProductTypeAction = (productType: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_GET_PRODUCT_BY_TYPE_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let response

    if (productType === 'all') {
      response = await axios.get(`${SERVER_URL2}/v1/product`, config)
    } else {
      response = await axios.get(`${SERVER_URL}/v1/product?product_category=${productType}`, config)
    }
    dispatch({ type: CUSTOMER360_GET_PRODUCT_BY_TYPE_SUCCESS, payload: response?.data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_GET_PRODUCT_BY_TYPE_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
