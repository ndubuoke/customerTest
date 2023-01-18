import axios from 'axios'
import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'
import { SignatoryDetailsRequiredDataStatusType } from 'Components/Form/Signatory/InitialData'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { Dispatch } from 'redux'
import { SET_REQUIRED_FORM_FIELDS } from 'Redux/constants/CustomerManagement.constants'
import {
  ACTIVE_PAGE,
  GET_CITIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_COLUMN_MAP_FAIL,
  GET_COLUMN_MAP_REQUEST,
  GET_COLUMN_MAP_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_FORM_FAIL,
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_PUBLISHED_FORM_SECTION_FAIL,
  GET_PUBLISHED_FORM_SECTION_REQUEST,
  GET_PUBLISHED_FORM_SECTION_SUCCESS,
  GET_STATES_FAIL,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  SHOW_WAIVER_MODAL_IN_FORM,
  STATUS_FOR_CAN_PROCEED,
  SUBMIT_FORM_FAIL,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  UNFILLED_REQUIRED_SIGNATORY_LIST,
  UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON,
} from 'Redux/constants/FormManagement.constants'
import { ReducersType } from 'Redux/store'
import { CustomerTypeType, FormTypeType } from 'Screens/ProcessSummary'

// const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/'
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'
// const SERVER_URL = 'https://9e39-102-89-46-93.eu.ngrok.io'

const SERVER_URL_PUBLISHED_FORM = 'https://formbuilder-api-dev.reventtechnologies.com'

export const getFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  console.log('formtype', formType)
  try {
    dispatch({ type: GET_FORM_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form/customer/published/type/${formType}`, config)
    // const data = null

    // 74448975208 -bvn

    dispatch({ type: GET_FORM_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    dispatch({
      type: GET_FORM_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

// https://retailcore-customerservice.herokuapp.com/v1/section/form/

export const getPublishedFormSectionAction = (formId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_PUBLISHED_FORM_SECTION_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/section/form/${formId}`, config)

    dispatch({ type: GET_PUBLISHED_FORM_SECTION_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    dispatch({
      type: GET_PUBLISHED_FORM_SECTION_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}

// SET_REQUIRED_FORM_FIELDS
export const setRequiredFormFieldsAction =
  (requiredFields: Array<any>) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    dispatch({
      type: SET_REQUIRED_FORM_FIELDS,
      // payload: requiredFields, //old
      payload: requiredFields,
    })
  }

export const statusForCanProceedAction = (canProceed: boolean) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({
    type: STATUS_FOR_CAN_PROCEED,
    payload: canProceed,
  })
}
export const showWaiverModalInFormAction =
  (status: 'show' | 'hide') => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    dispatch({
      type: SHOW_WAIVER_MODAL_IN_FORM,
      payload: status,
    })
  }

export const activePageAction = (page: any, theIndex: number) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({
    type: ACTIVE_PAGE,
    payload: { page, theIndex },
  })
}
export type UnfilledRequiredSignatoryListType = Array<[string, string]>
export const unfilledRequiredSignatoryListAction =
  (list: UnfilledRequiredSignatoryListType) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    dispatch({
      type: UNFILLED_REQUIRED_SIGNATORY_LIST,
      payload: { list },
    })
  }
export const unfilledRequiredSignatoryListButtonAction =
  (list: UnfilledRequiredSignatoryListType) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    dispatch({
      type: UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON,
      payload: { list },
    })
  }

export const submitFormAction =
  (formType: FormTypeType, customerType: CustomerTypeType, filledForm: FormStructureType) =>
  async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: SUBMIT_FORM_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(`${SERVER_URL}/v1/customer/${customerType}/${formType}`, filledForm, config)

      dispatch({ type: SUBMIT_FORM_SUCCESS, payload: data })

      // localStorage.removeItem('form')
    } catch (error) {
      // localStorage.removeItem('form')
      console.log(error)
      dispatch({
        type: SUBMIT_FORM_FAIL,
        payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
      })
    }
  }

export const getCountriesAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_COUNTRIES_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/country`, config)

    dispatch({ type: GET_COUNTRIES_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    console.log(error)
    dispatch({
      type: GET_COUNTRIES_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const getStatesAction = (stateId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_STATES_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/country/city/${stateId}`, config)

    dispatch({ type: GET_STATES_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    console.log(error)
    dispatch({
      type: GET_STATES_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const getCitiesAction = (cityId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_CITIES_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/country/city/${cityId}`, config)

    dispatch({ type: GET_CITIES_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    console.log(error)
    dispatch({
      type: GET_CITIES_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const getColumnMapAction = (formId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_COLUMN_MAP_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/column-map/form/${formId}`, config)

    dispatch({ type: GET_COLUMN_MAP_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    console.log(error)
    dispatch({
      type: GET_COLUMN_MAP_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}
