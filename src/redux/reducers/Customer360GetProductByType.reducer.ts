import {
  CUSTOMER360_GET_PRODUCT_BY_TYPE_FAILED,
  CUSTOMER360_GET_PRODUCT_BY_TYPE_REQUEST,
  CUSTOMER360_GET_PRODUCT_BY_TYPE_SUCCESS,
} from 'Redux/constants/Customer360GetProductsByTypes'

export const getCustomer360ProductTypeReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_GET_PRODUCT_BY_TYPE_REQUEST:
      return { loading: true }

    case CUSTOMER360_GET_PRODUCT_BY_TYPE_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_GET_PRODUCT_BY_TYPE_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
