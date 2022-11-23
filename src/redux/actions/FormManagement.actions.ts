import axios from 'axios'
import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'
import { Dispatch } from 'redux'
import {
  GET_FORM_FAIL,
  GET_FORM_REQUEST,
  GET_FORM_SUCCESS,
  GET_PUBLISHED_FORM_SECTION_FAIL,
  GET_PUBLISHED_FORM_SECTION_REQUEST,
  GET_PUBLISHED_FORM_SECTION_SUCCESS,
} from 'Redux/constants/FormManagement.constants'
import { ReducersType } from 'Redux/store'

// const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/'
const SERVER_URL = 'https://retailcore-formconfigapi.herokuapp.com'

export const getFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_FORM_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/form/customer/published/type/${formType}`, config)
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
