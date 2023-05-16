import axios from 'axios'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { PageInstance } from 'Components/types/FormControl.types'
import { Dispatch } from 'redux'
import { SET_REQUIRED_FORM_FIELDS } from 'Redux/constants/CustomerManagement.constants'
import {
  ACTIVE_PAGE,
  CREATE_COLUMN_MAP_FAIL,
  CREATE_COLUMN_MAP_REQUEST,
  CREATE_COLUMN_MAP_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITIES_RESET,
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
  GET_DEFAULT_FORM_FAIL,
  GET_DEFAULT_FORM_REQUEST,
  GET_DEFAULT_FORM_SUCCESS,
  GET_PUBLISHED_FORM_SECTION_FAIL,
  GET_PUBLISHED_FORM_SECTION_REQUEST,
  GET_PUBLISHED_FORM_SECTION_SUCCESS,
  GET_STATES_FAIL,
  GET_STATES_RESET,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  GET_LGA_REQUEST,
  GET_LGA_SUCCESS,
  GET_LGA_FAIL,
  GET_RELATIONSHIP_OFFICERS_REQUEST,
  GET_RELATIONSHIP_OFFICERS_SUCCESS,
  GET_RELATIONSHIP_OFFICERS_FAIL,
  SHOW_WAIVER_MODAL_IN_FORM,
  STATUS_FOR_CAN_PROCEED,
  SUBMIT_FORM_FAIL,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  UNFILLED_REQUIRED_SIGNATORY_LIST,
  UNFILLED_REQUIRED_SIGNATORY_LIST_BUTTON,
  GET_FORM_BEHAVIOUR_REQUEST,
  GET_FORM_BEHAVIOUR_SUCCESS,
  GET_FORM_BEHAVIOUR_FAIL,
} from 'Redux/constants/FormManagement.constants'
import store, { ReducersType } from 'Redux/store'
import { CustomerTypeType, FormTypeType } from 'Screens/ProcessSummary'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { parseBehavior } from 'Utilities/parseFormbehaviours'
import { getProperty } from 'Utilities/getProperty'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import { camelize } from 'Utilities/convertStringToCamelCase'

// const SERVER_URL = 'https://retailcore-customerservice.herokuapp.com/'
const SERVER_URL = 'https://customer-management-api-dev.reventtechnologies.com'
// const SERVER_URL = 'https://9e39-102-89-46-93.eu.ngrok.io'

const SERVER_URL_PUBLISHED_FORM = 'https://formbuilder-api-dev.reventtechnologies.com'

const PRUNEDGE_AUTH_URL = process.env.PRUNEDGE_AUTH_URL

export const getFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  console.log('formtype', formType)
  try {
    dispatch({ type: GET_FORM_REQUEST })
    dispatch({ type: GET_DEFAULT_FORM_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // const formBehaviours = await getFormBehaviourAction(formType)
    const { data: formBehaviourData } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form-behaviours-data`, {
      ...config,
      params: {
        form: formType,
      },
    })

    const parsedBehaviour = parseBehavior(formBehaviourData?.data?.behaviours || [])

    const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form/customer/published/type/${formType}`, config)
    // const data = null

    // 74448975208 -bvn

    // console.log('parsedBehaviour', parsedBehaviour)

    parsedBehaviour.forEach((b) => {
      if (b.condition === 'is Empty') {
      }
    })

    console.log('form', data)

    dispatch({ type: GET_FORM_SUCCESS, payload: data })
    dispatch({ type: GET_DEFAULT_FORM_SUCCESS, payload: data })

    // localStorage.removeItem('form')
  } catch (error) {
    // localStorage.removeItem('form')
    dispatch({
      type: GET_FORM_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
    dispatch({
      type: GET_DEFAULT_FORM_FAIL,
      payload: error?.response && error?.response?.data?.message,
    })
  }
}
// export const getDefaultFormAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
//   console.log('formtype', formType)
//   try {
//     dispatch({ type: GET_DEFAULT_FORM_REQUEST })

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }

//     const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form/customer/published/type/${formType}`, config)

//     dispatch({ type: GET_DEFAULT_FORM_SUCCESS, payload: data })

//     // localStorage.removeItem('form')
//   } catch (error) {
//     // localStorage.removeItem('form')
//     dispatch({
//       type: GET_DEFAULT_FORM_FAIL,
//       payload: error?.response && error?.response?.data?.message,
//     })
//   }
// }

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
  async (dispatch: Dispatch, getState: (store: any) => ReducersType) => {
    try {
      const { userProfile } = getState(store)

      dispatch({ type: SUBMIT_FORM_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          superAdmin: userProfile?.user?.tenant_admin || undefined,
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
    dispatch(resetStatesAction() as any)

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

export const getStatesAction = (countryId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_STATES_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/country/state/${countryId}`, config)

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
export const resetStatesAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({ type: GET_STATES_RESET })
}

export const getCitiesAction = (stateId: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_CITIES_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`${SERVER_URL}/v1/country/lga/${stateId}`, config)

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

export const resetCitiesAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({ type: GET_CITIES_RESET })
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

export const createColumnMapAction =
  (formId: string, builtFormMetaData: any) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
    try {
      dispatch({ type: CREATE_COLUMN_MAP_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }

      const { data } = await axios.post(`${SERVER_URL}/v1/column-map`, { data: { formId, data: builtFormMetaData } }, config)

      dispatch({ type: CREATE_COLUMN_MAP_SUCCESS, payload: data })

      // localStorage.removeItem('form')
    } catch (error) {
      // localStorage.removeItem('form')
      console.log(error)
      dispatch({
        type: CREATE_COLUMN_MAP_FAIL,
        payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
      })
    }
  }

export const getRelationshipOfficersAction = () => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
    dispatch({ type: GET_RELATIONSHIP_OFFICERS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        page_size: 100000,
      },
    }

    const { data } = await axios.get(`${PRUNEDGE_AUTH_URL}/users`, config)

    dispatch({ type: GET_RELATIONSHIP_OFFICERS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_RELATIONSHIP_OFFICERS_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const getFormBehaviourAction = (formType: string) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  try {
    dispatch({ type: GET_FORM_BEHAVIOUR_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        form: formType,
      },
    }

    const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form-behaviours-data`, config)

    sessionStorage.setItem(STORAGE_NAMES.FORM_BEHAVIOUR_IN_STORAGE, JSON.stringify(data))
    dispatch({ type: GET_FORM_BEHAVIOUR_SUCCESS, payload: data })
  } catch (error) {
    console.log(error)
    sessionStorage.removeItem(STORAGE_NAMES.FORM_BEHAVIOUR_IN_STORAGE)
    dispatch({
      type: GET_FORM_BEHAVIOUR_FAIL,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const updateFormViaBehaviourAction = (fillingFormState: FormStructureType) => (dispatch: Dispatch, getState: (store: any) => ReducersType) => {
  const { defaultPublishedForm, publishedForm, formBehaviour } = getState(store)
  console.log('incoming-fillingFormState', fillingFormState)
  console.log('defaultPublishedForm', defaultPublishedForm)
  console.log('formBehaviour', formBehaviour)
  // let defaultPublishedFormCopy = JSON.parse(JSON.stringify(defaultPublishedForm));
  let formPages: PageInstance[] = defaultPublishedForm.serverResponse.data?.builtFormMetadata?.pages || []
  const parsedBehaviour = parseBehavior(formBehaviour.serverResponse?.data?.behaviours || [])
  const cleanText = (text: string) => text.replace(/[-\s?]/g, '').toLowerCase()
  console.log('form-pages', formPages)
  console.log('form-parsedBehaviour', parsedBehaviour)
  parsedBehaviour.forEach((b) => {
    const customerData = fillingFormState?.data?.customerData || []
    const customerDataSection = customerData.find((c) => cleanText(c.sectionName) === cleanText(b.sectionName))
    console.log('customerDataSection', customerDataSection)
    if (customerDataSection) {
      if (b.condition === 'is Empty' || b.condition === 'is Filled') {
        // const isEmpty = !customerDataSection.data[camelize(replaceSpecialCharacters(b.fieldName))]
        const status = !!customerDataSection.data[camelize(replaceSpecialCharacters(b.fieldName))]
        const track = {
          'is Empty': {
            false: {
              disable: 'true',
              hide: 'Off',
              show: 'On',
            },
          },
          'is Filled': {
            true: {
              disable: 'true',
              hide: 'Off',
              show: 'On',
            },
          },
        }
        // console.log('isEmpty', isEmpty)
        b.actions.forEach((action) => {
          if (action.type === 'Show/Hide') {
            if (action.pageName && !action.sectionName && !action.fieldName) {
              formPages = formPages.map((p) => {
                if (getProperty(p.pageProperties, 'Page name', 'value').text === action.pageName) {
                  p.pageProperties = p.pageProperties.map((property) => {
                    if (property.name === 'Visibility') {
                      // property.value = isEmpty ? 'Off' : 'On'
                      if (track[b.condition][status.toString()]) {
                        property.value = track[b.condition][status][action.option.split(' ')[0].toLowerCase()]
                      } else {
                        property.value = 'On'
                      }
                    }
                    return property
                  })
                }
                return p
              })
              console.log('filter-form', formPages)
            } else if (action.pageName && action.sectionName && !action.fieldName) {
              formPages = formPages.map((p) => {
                if (getProperty(p.pageProperties, 'Page name', 'value').text === action.pageName) {
                  p.sections = p.sections.map((sect) => {
                    console.log('sect', sect)
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.formControlProperties = sect.formControlProperties.map((property) => {
                        if (property.name === 'Visibility') {
                          if (track[b.condition][status.toString()]) {
                            property.value = track[b.condition][status][action.option.split(' ')[0].toLowerCase()]
                          } else {
                            property.value = 'On'
                          }
                        }
                        return property
                      })
                    }
                    return sect
                  })
                }
                return p
              })
            } else if (action.pageName && action.sectionName && action.fieldName) {
              formPages = formPages.map((page) => {
                if (getProperty(page.pageProperties, 'Page name', 'value').text === action.pageName) {
                  page.sections = page.sections.map((sect) => {
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.fields = sect.fields.map((field) => {
                        if (getProperty(field.formControlProperties, 'Field label', 'value').text.trim() === action.fieldName.trim()) {
                          field.formControlProperties = field.formControlProperties.map((property) => {
                            if (property.name === 'Visibility') {
                              if (track[b.condition][status.toString()]) {
                                property.value = track[b.condition][status][action.option.split(' ')[0].toLowerCase()]
                              } else {
                                property.value = 'On'
                              }
                            }
                            return property
                          })
                        }
                        return field
                      })
                    }
                    return sect
                  })
                }
                return page
              })
            }
          } else if (action.type === 'Update/Calculate') {
            if (action.pageName && action.sectionName && action.fieldName) {
              if (fillingFormState) {
                const fillingFormStateCopy = { ...fillingFormState }
                const column = camelize(replaceSpecialCharacters(action.fieldName))
                fillingFormStateCopy.data.customerData = fillingFormStateCopy.data.customerData.map((customerData) => {
                  if (cleanText(customerData.sectionName) === cleanText(action.sectionName)) {
                    if (b.condition === 'is Empty') {
                      customerData.data[column] = status ? '' : action.to
                    } else if (b.condition === 'is Filled') {
                      customerData.data[column] = status ? action.to : ''
                    }
                  }
                  return customerData
                })
                // sessionStorage.removeItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
                sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormStateCopy))
              }
            }
          } else if (action.type === 'Enable/Require') {
            if (action.pageName && !action.sectionName && !action.fieldName) {
            } else if (action.pageName && action.sectionName && !action.fieldName) {
            } else if (action.pageName && action.sectionName && action.fieldName) {
              formPages = formPages.map((page) => {
                if (getProperty(page.pageProperties, 'Page name', 'value').text === action.pageName) {
                  page.sections = page.sections.map((sect) => {
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.fields = sect.fields.map((field) => {
                        if (getProperty(field.formControlProperties, 'Field label', 'value').text.trim() === action.fieldName.trim()) {
                          field.formControlProperties = field.formControlProperties.map((property) => {
                            if (action.option === 'Disable Field') {
                              if (property.name === 'Disable') {
                                if (track[b.condition][status.toString()]) {
                                  property.value = track[b.condition][status][action.option.split(' ')[0].toLowerCase()]
                                } else {
                                  property.value = 'false'
                                }
                              }
                            }

                            return property
                          })
                        }
                        return field
                      })
                    }
                    return sect
                  })
                }
                return page
              })
            }
          }
        })

        // console.log('check', check)
        // const page = form.find((p) => getProperty(p.pageProperties, 'Page name', 'value').text === b.pageName)
        // console.log('found-page', page)
        // if (page) {
        //   const section = page.sections.find((s) => getProperty(s.formControlProperties, 'Section name', 'value').text === b.sectionName)
        //   console.log('found-section', section)
        //   if (section) {
        //     const field = section.fields.find((f) => getProperty(f.formControlProperties, 'Field label', 'value').text === b.fieldName)
        //     console.log('found-field', field)
        //   }
        // }
      } else if (b.condition === 'is Equal To' || b.condition === 'is Not Equal To') {
        const isEqualTo = customerDataSection.data[camelize(replaceSpecialCharacters(b.fieldName))]?.toLowerCase() === b.value?.toLowerCase()
        const track = {
          'is Equal To': {
            true: {
              disable: 'true',
              hide: 'Off',
              show: 'On',
            },
          },
          'is Not Equal To': {
            false: {
              disable: 'true',
              hide: 'Off',
              show: 'On',
            },
          },
        }
        console.log('isEqualTo', isEqualTo)
        b.actions.forEach((action) => {
          if (action.type === 'Show/Hide') {
            if (action.pageName && !action.sectionName && !action.fieldName) {
              formPages = formPages.map((p) => {
                if (getProperty(p.pageProperties, 'Page name', 'value').text === action.pageName) {
                  p.pageProperties = p.pageProperties.map((property) => {
                    if (property.name === 'Visibility') {
                      // property.value = isEqualTo ? 'Off' : 'On'
                      if (track[b.condition][isEqualTo.toString()]) {
                        property.value = track[b.condition][isEqualTo][action.option.split(' ')[0].toLowerCase()]
                      } else {
                        property.value = 'On'
                      }
                    }
                    return property
                  })
                }
                return p
              })
              console.log('filter-form', formPages)
            } else if (action.pageName && action.sectionName && !action.fieldName) {
              formPages = formPages.map((p) => {
                if (getProperty(p.pageProperties, 'Page name', 'value').text === action.pageName) {
                  p.sections = p.sections.map((sect) => {
                    console.log('sect', sect)
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.formControlProperties = sect.formControlProperties.map((property) => {
                        if (property.name === 'Visibility') {
                          // property.value = isEqualTo ? 'Off' : 'On'
                          if (track[b.condition][isEqualTo.toString()]) {
                            property.value = track[b.condition][isEqualTo][action.option.split(' ')[0].toLowerCase()]
                          } else {
                            property.value = 'On'
                          }
                        }
                        return property
                      })
                    }
                    return sect
                  })
                }
                return p
              })
            } else if (action.pageName && action.sectionName && action.fieldName) {
              formPages = formPages.map((page) => {
                if (getProperty(page.pageProperties, 'Page name', 'value').text === action.pageName) {
                  page.sections = page.sections.map((sect) => {
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.fields = sect.fields.map((field) => {
                        if (getProperty(field.formControlProperties, 'Field label', 'value').text.trim() === action.fieldName.trim()) {
                          field.formControlProperties = field.formControlProperties.map((property) => {
                            if (property.name === 'Visibility') {
                              // property.value = isEqualTo ? 'Off' : 'On'
                              if (track[b.condition][isEqualTo.toString()]) {
                                property.value = track[b.condition][isEqualTo][action.option.split(' ')[0].toLowerCase()]
                              } else {
                                property.value = 'On'
                              }
                            }
                            return property
                          })
                        }
                        return field
                      })
                    }
                    return sect
                  })
                }
                return page
              })
            }
          } else if (action.type === 'Enable/Require') {
            if (action.pageName && !action.sectionName && !action.fieldName) {
            } else if (action.pageName && action.sectionName && !action.fieldName) {
            } else if (action.pageName && action.sectionName && action.fieldName) {
              formPages = formPages.map((page) => {
                if (getProperty(page.pageProperties, 'Page name', 'value').text === action.pageName) {
                  page.sections = page.sections.map((sect) => {
                    if (getProperty(sect.formControlProperties, 'Section name', 'value').text.trim() === action.sectionName.trim()) {
                      sect.fields = sect.fields.map((field) => {
                        if (getProperty(field.formControlProperties, 'Field label', 'value').text.trim() === action.fieldName.trim()) {
                          field.formControlProperties = field.formControlProperties.map((property) => {
                            if (action.option === 'Disable Field') {
                              if (property.name === 'Disable') {
                                if (track[b.condition][isEqualTo.toString()]) {
                                  property.value = track[b.condition][isEqualTo][action.option.split(' ')[0].toLowerCase()]
                                } else {
                                  property.value = 'false'
                                }
                              }
                            }
                            return property
                          })
                        }
                        return field
                      })
                    }
                    return sect
                  })
                }
                return page
              })
            }
          }
        })
      }
    }
  })

  dispatch({
    type: GET_FORM_SUCCESS,
    payload: {
      ...publishedForm.serverResponse,
      data: {
        ...publishedForm.serverResponse.data,
        builtFormMetadata: {
          ...publishedForm.serverResponse.data?.builtFormMetadata,
          pages: [...formPages],
        },
      },
    },
  })
  console.log('parsedBehaviour', parsedBehaviour)
  // dispatch({ type: GET_FORM_BEHAVIOUR_REQUEST })

  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   params: {
  //     form: formType,
  //   },
  // }

  // const { data } = await axios.get(`${SERVER_URL_PUBLISHED_FORM}/v1/form-behaviours-data`, config)

  // sessionStorage.setItem(STORAGE_NAMES.FORM_BEHAVIOUR_IN_STORAGE, JSON.stringify(data))
  // dispatch({ type: GET_FORM_BEHAVIOUR_SUCCESS, payload: data })
}
