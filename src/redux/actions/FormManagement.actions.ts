import axios from 'axios'
import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'
import { SignatoryDetailsRequiredDataStatusType } from 'Components/Form/Signatory/InitialData'
import { Dispatch } from 'redux'
import { SET_REQUIRED_FORM_FIELDS } from 'Redux/constants/CustomerManagement.constants'
import {
  ACTIVE_PAGE,
  GET_FORM_FAIL,
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_PUBLISHED_FORM_SECTION_FAIL,
  GET_PUBLISHED_FORM_SECTION_REQUEST,
  GET_PUBLISHED_FORM_SECTION_SUCCESS,
  SHOW_WAIVER_MODAL_IN_FORM,
  STATUS_FOR_CAN_PROCEED,
  UNFILLED_REQUIRED_SIGNATORY_LIST,
  UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON,
} from 'Redux/constants/FormManagement.constants'
import { ReducersType } from 'Redux/store'

// const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/'
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'

const SERVER_URL_PUBLISHED_FORM = 'https://formbuilder-api-dev.reventtechnologies.com'

export const getFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_FORM_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form/customer/published/type/${formType}`, config)
    const data = null

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
