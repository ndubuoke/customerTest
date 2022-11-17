import axios from 'axios'
import { publishedForm } from 'Components/Form/Form-UIs/sampleForm'
import { Dispatch } from 'redux'
import { GET_FORM_FAIL, GET_FORM_REQUEST, GET_FORM_SUCCESS } from 'Redux/constants/FormManagement.constants'
import { ReducersType } from 'Redux/store'

// const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/v1/form'
const SERVER_URL = 'https://retailcore-formconfigapi.herokuapp.com/v1/form'

export const getFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_FORM_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // const { data } = await axios.get(`${SERVER_URL}/customer/published/type/${formType}`, config)
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
