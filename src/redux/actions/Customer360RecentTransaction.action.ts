import axios from 'axios'
import {
  CUSTOMER360_RECENT_TRANSACTIONS_FAILED,
  CUSTOMER360_RECENT_TRANSACTIONS_REQUEST,
  CUSTOMER360_RECENT_TRANSACTIONS_SUCCESS,
} from 'Redux/constants/Customer360RecentTransactions.constants'

export const customer360RecentTransactionAction = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_RECENT_TRANSACTIONS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_RECENT_TRANSACTIONS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_RECENT_TRANSACTIONS_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
