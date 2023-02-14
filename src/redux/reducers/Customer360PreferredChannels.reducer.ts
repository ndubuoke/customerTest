import {
  CUSTOMER360_PREFERRED_CHANNELS_FAILED,
  CUSTOMER360_PREFERRED_CHANNELS_REQUEST,
  CUSTOMER360_PREFERRED_CHANNELS_SUCCESS,
} from 'Redux/constants/Customer360PreferredChannels.constants'

export const getCustomer360PreferredChannelsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_PREFERRED_CHANNELS_REQUEST:
      return { loading: true }

    case CUSTOMER360_PREFERRED_CHANNELS_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_PREFERRED_CHANNELS_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
