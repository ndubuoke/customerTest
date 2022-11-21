import {
  GET_USER_ROLE_AND_PERMISSIONS_FAILED,
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS
} from 'Redux/constants/UserPersmissions'

import {
  setRolesAndPermissionsActionTypes
} from 'Redux/actions/UserPersmissions'


const UserRolesAndPersmissionsInitialState = {
  roles: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}

export interface UserRolesAndPersmissionsTypes {
  roles: any[],
  message: string,
  loading: boolean,
  success: boolean,
  error: boolean,
}


export const userRolesAndPermissionsReducer = (state: UserRolesAndPersmissionsTypes = UserRolesAndPersmissionsInitialState, action: setRolesAndPermissionsActionTypes) => {
  switch (action.type) {
    case GET_USER_ROLE_AND_PERMISSIONS_REQUEST:
      return { ...state, loading: true, success: false }
    case GET_USER_ROLE_AND_PERMISSIONS_SUCCESS:
      return { ...state, loading: false, success: true, roles: action.payload }
    case GET_USER_ROLE_AND_PERMISSIONS_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    default:
      return state
  }
}
