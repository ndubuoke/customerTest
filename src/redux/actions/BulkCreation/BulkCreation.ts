// import axios from 'axios'
import { Dispatch } from 'redux'
import {
  SET_BULK_CREATION_SUMMARY
} from 'Redux/constants/BulkCreation'

const SERVER_URL = `https://retailcore-formconfigapi.herokuapp.com`
interface ActionTypes {
  SET_BULK_CREATION_SUMMARY: any
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

// export const getFormBehavioursData = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch({
//       type: BEHAVIOURS_DATA_GET_REQUEST,
//     })
//     const formType = sessionStorage.getItem("selectedFormType") ? JSON.parse(sessionStorage.getItem("selectedFormType")).code : "individualAccelerated"
//     const { data } = await axios.get(`${SERVER_URL}/v1/form-behaviours-data?form=${formType}`)

//     if (data?.status === 'success') {
//       const status = localStorage.getItem("formBehaviourStatus") && JSON.parse(localStorage.getItem("formBehaviourStatus"))

//       if (status === BehaviourStatus.Saved || status !== BehaviourStatus.Editing) {
//         if (data?.data) {
//           localStorage.setItem('behaviours', JSON.stringify(data?.data?.behaviours))
//           dispatch({
//             type: BEHAVIOURS_DATA_GET_SUCCESS,
//             payload: data?.data?.behaviours,
//           })
//         } else {
//           localStorage.setItem('behaviours', JSON.stringify([]))
//           dispatch({
//             type: BEHAVIOURS_DATA_GET_SUCCESS,
//             payload: [],
//           })
//         }
//       }

//     }
//   } catch (error) {
//     dispatch({
//       type: BEHAVIOURS_DATA_GET_FAIL,
//       payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
//     })
//   }
// }

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