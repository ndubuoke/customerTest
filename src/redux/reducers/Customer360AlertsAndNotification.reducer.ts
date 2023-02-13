import {
  CUSTOMER360_ALERTS_AND_NOTIFICATION_FAILED,
  CUSTOMER360_ALERTS_AND_NOTIFICATION_REQUEST,
  CUSTOMER360_ALERTS_AND_NOTIFICATION_SUCCESS,
} from 'Redux/constants/Customer360AlertsAndNotification.constants'

export const getCustomer360AlertsAndNotificationReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case CUSTOMER360_ALERTS_AND_NOTIFICATION_REQUEST:
      return { loading: true }

    case CUSTOMER360_ALERTS_AND_NOTIFICATION_SUCCESS:
      return { loading: false, success: true, serverResponse: action.payload }

    case CUSTOMER360_ALERTS_AND_NOTIFICATION_FAILED:
      return { success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}
