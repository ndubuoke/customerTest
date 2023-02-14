import axios from 'axios'
import {
  CUSTOMER360_RECOMMENDED_PRODUCTS_FAILED,
  CUSTOMER360_RECOMMENDED_PRODUCTS_REQUEST,
  CUSTOMER360_RECOMMENDED_PRODUCTS_SUCCESS,
} from 'Redux/constants/Customer360RecommendedProducts.constants'

export const customer360RecommendeProductsAction = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_RECOMMENDED_PRODUCTS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_RECOMMENDED_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_RECOMMENDED_PRODUCTS_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
