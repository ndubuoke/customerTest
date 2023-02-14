import {
  CUSTOMER360_RECOMMENDED_PRODUCTS_FAILED,
  CUSTOMER360_RECOMMENDED_PRODUCTS_REQUEST,
  CUSTOMER360_RECOMMENDED_PRODUCTS_SUCCESS,
} from 'Redux/constants/Customer360RecommendedProducts.constants'

export const getCustomer360RecommendedProductsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_RECOMMENDED_PRODUCTS_REQUEST:
      return { loading: true }

    case CUSTOMER360_RECOMMENDED_PRODUCTS_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_RECOMMENDED_PRODUCTS_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
