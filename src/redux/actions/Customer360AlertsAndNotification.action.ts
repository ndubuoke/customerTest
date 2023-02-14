import axios from 'axios'
import {
  CUSTOMER360_ALERTS_AND_NOTIFICATION_FAILED,
  CUSTOMER360_ALERTS_AND_NOTIFICATION_REQUEST,
  CUSTOMER360_ALERTS_AND_NOTIFICATION_SUCCESS,
} from 'Redux/constants/Customer360AlertsAndNotification.constants'

export const customer360AlertsAndNotificationAction = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_ALERTS_AND_NOTIFICATION_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_ALERTS_AND_NOTIFICATION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_ALERTS_AND_NOTIFICATION_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
