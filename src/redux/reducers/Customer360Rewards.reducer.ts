import { CUSTOMER360_REWARDS_FAILED, CUSTOMER360_REWARDS_REQUEST, CUSTOMER360_REWARDS_SUCCESS } from 'Redux/constants/Customer360Rewards.constants'

export const getCustomer360RewardReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_REWARDS_REQUEST:
      return { loading: true }

    case CUSTOMER360_REWARDS_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_REWARDS_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
