import axios from 'axios'
import { CUSTOMER360_REWARDS_FAILED, CUSTOMER360_REWARDS_REQUEST, CUSTOMER360_REWARDS_SUCCESS } from 'Redux/constants/Customer360Rewards.constants'

export const customer360RewardsAction = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_REWARDS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_REWARDS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_REWARDS_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
