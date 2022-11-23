// import axios from 'axios'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  GET_USER_ROLE_AND_PERMISSIONS_FAILED,
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS
} from 'Redux/constants/UserPersmissions'

const SERVER_URL = `https://api.sterlingv2.prunedge.org/api`
interface ActionTypes {
  GET_USER_ROLE_AND_PERMISSIONS_FAILED: any
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST: any
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS: any
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}

export type setRolesAndPermissionsActionTypes = MessageAction

export const getRolesAndPermissions = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("@sterling_core_token") ? localStorage.getItem("@sterling_core_token") : null

    dispatch({
      type: GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4OTg2MDM2LCJpYXQiOjE2Njg5Nzg4MzYsImp0aSI6IjdlNmM5MzdmNTY1ZDQ2MWZhYmViZDZmOTVmMzQ5OGVhIiwidXNlcl9pZCI6ImFiZjkzZWZiLTE4YzUtNGM1ZS1hOGQzLTI2OTI2NzVlZTNlNiIsImZpcnN0bmFtZSI6IkpvaG4iLCJsYXN0bmFtZSI6Ik9sYXdhbGUiLCJmb3JjZV9jaGFuZ2VfcGFzc3dvcmQiOmZhbHNlLCJmaXJzdF90aW1lX2xvZ2luIjpmYWxzZSwidGVuYW50X2lkIjoiMzFjZjhhZjMtODhmOC00OTUyLTk3MzMtNmFkNzJmNDFmYzUzIn0.nfUmsV-Eza4ajewn3qA7Cy30dRe6HtEmSy-Du_IhcCw`
      }
    }
    // Authorization: `Bearer ${token}`
    const { data } = await axios.get(`${SERVER_URL}/v1/roles/?page_size=50`, config)
    console.log(data)
    if (data) {
      dispatch({
        type: GET_USER_ROLE_AND_PERMISSIONS_SUCCESS,
        payload: data?.results
      })
    }
  } catch (error) {
    dispatch({
      type: GET_USER_ROLE_AND_PERMISSIONS_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}
