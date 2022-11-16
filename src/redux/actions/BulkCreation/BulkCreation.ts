// import axios from 'axios'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  SET_BULK_CREATION_SUMMARY,
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
  VALIDATE_BULK_CUSTOMER_FAILED,
  VALIDATE_BULK_CUSTOMER_REQUEST,
  VALIDATE_BULK_CUSTOMER_SUCCESS,
} from 'Redux/constants/BulkCreation'

const SERVER_URL = `https://retailcore-customerservice.herokuapp.com`
interface ActionTypes {
  SET_BULK_CREATION_SUMMARY: any
  VALIDATE_BULK_CUSTOMER_FAILED: any
  VALIDATE_BULK_CUSTOMER_REQUEST: any
  VALIDATE_BULK_CUSTOMER_SUCCESS: any
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE: any
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}

export type setBulkCreationActionTypes = MessageAction

export const setBulkCreationSummary = (summary: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_BULK_CREATION_SUMMARY,
    payload: summary,
  })
}

export const updateValidatedCustomers = (customers: any) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
    payload: customers,
  })
}

// export const setFormBehaviours = (behaviours: any) => (dispatch: Dispatch) => {
//   dispatch({
//     type: SET_FORM_BEHAVIOURS,
//     payload: behaviours,
//   })
// }

// export const setFormBehaviour = (behaviour: any) => (dispatch: Dispatch) => {
//   dispatch({
//     type: SET_FORM_BEHAVIOUR,
//     payload: behaviour,
//   })
// }

// export const setFormBehaviourEdited = (payload: any) => (dispatch: Dispatch) => {
//   dispatch({
//     type: SET_FORM_BEHAVIOUR_EDITED,
//     payload,
//   })
// }

// export const getFormBehaviourConfig = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch({
//       type: BEHAVIOUR_CONFIG_REQUEST,
//     })

//     const { data } = await axios.get(`${SERVER_URL}/v1/form-behaviour`)

//     if (data.status === "success") {
//       // console.log(data?.data)
//       dispatch({
//         type: BEHAVIOUR_CONFIG_SUCCESS,
//         payload: data?.data,
//       })
//     }
//   } catch (error) {
//     dispatch({
//       type: BEHAVIOUR_CONFIG_FAIL,
//       payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
//     })
//   }
// }

export const validateCustomers = (customers: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: VALIDATE_BULK_CUSTOMER_REQUEST,
    })
    const config = {
      headers: {

      }
    }
    const { data } = await axios.post(`${SERVER_URL}/v1/bulk-customer/validate`, customers)

    if (data?.status === 'success') {
      dispatch({
        type: VALIDATE_BULK_CUSTOMER_SUCCESS,
        payload: data?.data
      })
    }
  } catch (error) {
    dispatch({
      type: VALIDATE_BULK_CUSTOMER_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

// export const createFormBehavioursData = (behaviourData: any) => async (dispatch: Dispatch & any) => {
//   try {
//     dispatch({
//       type: BEHAVIOURS_DATA_SAVE_REQUEST,
//     })
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//     const formType = sessionStorage.getItem('selectedFormType') ? JSON.parse(sessionStorage.getItem('selectedFormType')).code : null
//     if (formType === null) {
//       dispatch({
//         type: BEHAVIOURS_DATA_SAVE_FAIL,
//         payload: 'Please Select a Form Type',
//       })

//       return
//     }

//     const { data } = await axios.post(`${SERVER_URL}/v1/form-behaviours-data`, { formType, behaviours: behaviourData }, config)

//     if (data.status === 'success') {
//       // console.log(data)
//       localStorage.setItem("formBehaviourStatus", JSON.stringify(BehaviourStatus.Saved))
//       localStorage.removeItem("behaviours")
//       // console.log(data?.data)
//       dispatch({
//         type: BEHAVIOURS_DATA_SAVE_SUCCESS,
//         payload: data?.message,
//       })
//       dispatch(setFormBehaviourEdited(false))
//     }
//   } catch (error) {
//     dispatch({
//       type: BEHAVIOURS_DATA_SAVE_FAIL,
//       payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
//     })
//   }
// }