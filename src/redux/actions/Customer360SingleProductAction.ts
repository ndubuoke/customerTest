import axios from 'axios'
import { Dispatch } from 'react'
import { CUSTOMER360_PRODUCT_FAILED, CUSTOMER360_PRODUCT_REQUEST, CUSTOMER360_PRODUCT_SUCCESS } from 'Redux/constants/Customer360Products.constants'

const SERVER_URL = `https://product-management-api-dev.reventtechnologies.com`

// export const customer360SingleProductAction = () => async (dispatch: any, getState: any) => {
//   try {
//     dispatch({ type: CUSTOMER360_PRODUCT_REQUEST })
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//     const { data } = await axios.get(`${SERVER_URL}/v1/product`, config)

//     if (data?.status === 'success') {
//       console.log({ product: data })

//       dispatch({ type: CUSTOMER360_PRODUCT_SUCCESS, payload: data })
//     }
//   } catch (error) {
//     dispatch({ type: CUSTOMER360_PRODUCT_FAILED, payload: error?.response && error?.response?.data?.message })
//   }
// }

export const customer360SingleProductAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: CUSTOMER360_PRODUCT_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`https://product-management-api-dev.reventtechnologies.com/v1/product`, config)

    console.log({ ttthhh: data })

    dispatch({ type: CUSTOMER360_PRODUCT_SUCCESS, payload: data })

    // console.log(data)
  } catch (error) {
    dispatch({ type: CUSTOMER360_PRODUCT_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
