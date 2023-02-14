import { CUSTOMER360_PRODUCT_FAILED, CUSTOMER360_PRODUCT_REQUEST, CUSTOMER360_PRODUCT_SUCCESS } from 'Redux/constants/Customer360Products.constants'

export const getCustomer360SingleProductReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_PRODUCT_REQUEST:
      // console.log('product loading')
      return { loading: true }

    case CUSTOMER360_PRODUCT_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_PRODUCT_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
