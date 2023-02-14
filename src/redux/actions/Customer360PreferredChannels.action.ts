import axios from 'axios'
import {
  CUSTOMER360_PREFERRED_CHANNELS_FAILED,
  CUSTOMER360_PREFERRED_CHANNELS_REQUEST,
  CUSTOMER360_PREFERRED_CHANNELS_SUCCESS,
} from 'Redux/constants/Customer360PreferredChannels.constants'

export const customer360PreferredChannelsAction = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_PREFERRED_CHANNELS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_PREFERRED_CHANNELS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_PREFERRED_CHANNELS_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
