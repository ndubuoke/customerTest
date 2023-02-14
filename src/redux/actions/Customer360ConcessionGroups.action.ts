import axios from 'axios'
import {
  CUSTOMER360_CONCESSION_GROUPS_FAILED,
  CUSTOMER360_CONCESSION_GROUPS_REQUEST,
  CUSTOMER360_CONCESSION_GROUPS_SUCCESS,
} from 'Redux/constants/Customer360ConcessionGroups.constants'

export const customer360ConcessionGroupsAction = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CUSTOMER360_CONCESSION_GROUPS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`#`, config)

    dispatch({ type: CUSTOMER360_CONCESSION_GROUPS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CUSTOMER360_CONCESSION_GROUPS_FAILED, payload: error?.response && error?.response?.data?.message })
  }
}
