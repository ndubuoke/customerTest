import { caret } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCitiesAction, getCountriesAction, getStatesAction, setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'

import { camelize } from 'Utilities/convertStringToCamelCase'
import { generateID } from 'Utilities/generateId'
import { getProperty } from 'Utilities/getProperty'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import { Form, FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import MultipleSelectionItem from './MultipleSelectionItem'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
  setFillingFormState: any
  publishedFormState: ResponseType
  activePageState?: PageInstance

  fillingFormState: FormStructureType
  setBackupForSwitchFormState: (value: any) => void
  backupForSwitchFormState: any
}

const FormDropdown = ({
  item,
  collapsed,
  publishedFormState,
  activePageState,
  fillingFormState,
  setFillingFormState,
  setBackupForSwitchFormState,
  backupForSwitchFormState,
}: Props) => {
  const dispatch = useDispatch()
  const theForm = publishedFormState?.serverResponse?.data as Form
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text
  const fieldLabel = getProperty(item.formControlProperties, 'Field label', 'value').text
    ? getProperty(item.formControlProperties, 'Field label', 'value').text
    : getProperty(item.formControlProperties, 'Field label', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Field label', 'defaultState').text
    : ''
  const required = getProperty(item.formControlProperties, 'Set as Required', 'value').text
    ? getProperty(item.formControlProperties, 'Set as Required', 'value').text
    : getProperty(item.formControlProperties, 'Set as Required', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Set as Required', 'defaultState').text
    : 'off'
  const enableMultipleSelection = getProperty(item.formControlProperties, 'Enable multiple selection of options', 'value').text
    ? getProperty(item.formControlProperties, 'Enable multiple selection of options', 'value').text
    : getProperty(item.formControlProperties, 'Enable multiple selection of options', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Enable multiple selection of options', 'defaultState').text
    : 'off'
  const placeholder = getProperty(item.formControlProperties, 'Placeholder', 'value').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'value').text
    : getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    : ''
  const helpText = getProperty(item.formControlProperties, 'Help text', 'value').text
    ? getProperty(item.formControlProperties, 'Help text', 'value').text
    : getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    : fieldLabel
  const dropdownList = getProperty(item.formControlProperties, 'Help text', 'value').text
    ? getProperty(item.formControlProperties, 'Help text', 'value').text
    : getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    : fieldLabel

  const dropdownOptionsListValue = getProperty(item.formControlProperties, 'Dropdown Options List', 'value').text
    ? getProperty(item.formControlProperties, 'Dropdown Options List', 'value').text
    : getProperty(item.formControlProperties, 'Dropdown Options List', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Dropdown Options List', 'defaultState').text
    : ''
  const specifyOptionsListValue = getProperty(item.formControlProperties, 'Specify Options List', 'value').text
    ? getProperty(item.formControlProperties, 'Specify Options List', 'value').text
    : getProperty(item.formControlProperties, 'Specify Options List', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Specify Options List', 'defaultState').text
    : ''
  const importFromFileListValue = getProperty(item.formControlProperties, 'Upload List', 'value').text
    ? getProperty(item.formControlProperties, 'Upload List', 'value').text
    : getProperty(item.formControlProperties, 'Upload List', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Upload List', 'defaultState').text
    : ''

  const importFromAPIListValue = getProperty(item.formControlProperties, 'Specify API', 'value').text
    ? getProperty(item.formControlProperties, 'Specify API', 'value').text
    : getProperty(item.formControlProperties, 'Specify API', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Specify API', 'defaultState').text
    : ''

  const importFromURLListValue = getProperty(item.formControlProperties, 'Specify URL', 'value').text
    ? getProperty(item.formControlProperties, 'Specify URL', 'value').text
    : getProperty(item.formControlProperties, 'Specify URL', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Specify URL', 'defaultState').text
    : ''

  const _optionsField =
    dropdownOptionsListValue.toLowerCase() === 'manual input'
      ? specifyOptionsListValue
      : dropdownOptionsListValue.toLowerCase() === 'import from file'
      ? importFromFileListValue
      : dropdownOptionsListValue.toLowerCase() === 'import from api'
      ? importFromAPIListValue
      : dropdownOptionsListValue.toLowerCase() === 'import from url'
      ? importFromURLListValue
      : null

  const _optionsFieldForm = _optionsField?.split(',')?.map((oneItem) => oneItem.trim())

  const [optionsField, setOptionsField] = useState<any>([])

  // Save countries locally
  const [countries, setCountries] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [states, setStates] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [cities, setCities] = useState<Array<any>>([])

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

  const [showLists, setShowLists] = useState<boolean>(false)
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)
  const [multipleSelectedDropdownItems, setMultipleSelectedDropdownItems] = useState<Array<string>>([])

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any
  const getCountriesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCountries) as ResponseType
  const getStatesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getStates) as ResponseType
  const getCitiesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCities) as ResponseType

  const handleSelectedDropdownItem = (selectedItem: string, theItemFromChange) => {
    setSelectedDropdownItem(selectedItem.trim())

    const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

    if (requiredFieldsFromRedux) {
      const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

      dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
    }
  }
  // Get Countries list if it contains country in the field lable
  useEffect(() => {
    if (fieldLabel.toLowerCase().includes('country')) {
      // if (!getCountriesRedux?.success) {
      dispatch(getCountriesAction() as any)
      // }
    }
  }, [])

  useEffect(() => {
    if (fieldLabel.toLowerCase().includes('country')) {
      if (getCountriesRedux?.success) {
        setOptionsField(getCountriesRedux?.serverResponse?.data?.map((x) => x?.countryName))
        setCountries(
          getCountriesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName }
          })
        )
        // console.log({ getCountriesRedux: getCountriesRedux?.serverResponse })
      }
    }
  }, [getCountriesRedux])

  const checkIfItemIsState = (_item: FormControlType | FormControlTypeWithSection) => {
    const checkCountriesInStorage = sessionStorage.getItem(`${item?.sectionId || item?.pageId}`)
      ? JSON.parse(sessionStorage.getItem(`${item?.sectionId || item?.pageId}`))
      : null

    if (checkCountriesInStorage?.sectionId === item?.sectionId || checkCountriesInStorage?.pageId === item?.pageId) {
      dispatch(getStatesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }

  const checkIfItemIsCity = () => {
    const checkCountriesInStorage = sessionStorage.getItem(`${item?.sectionId || item?.pageId}`)
      ? JSON.parse(sessionStorage.getItem(`${item?.sectionId || item?.pageId}`))
      : null

    if (checkCountriesInStorage?.sectionId === item?.sectionId || checkCountriesInStorage?.pageId === item?.pageId) {
      dispatch(getCitiesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }

  // Save states lists to state

  // TODO---
  // CHange this to state and not city
  useEffect(() => {
    if (fieldLabel.toLowerCase().includes('state') && getStatesRedux) {
      if (getStatesRedux?.success) {
        setOptionsField(getStatesRedux?.serverResponse?.data?.map((x) => x?.cityName))
        setStates(
          getStatesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName, stateId: x?.cityId, stateName: x?.cityName }
          })
        )
        // console.log({ getStatesRedux: getStatesRedux?.serverResponse })
      }
    }
  }, [getStatesRedux])

  const handleMultipleSelectedDropdownItem = (selectedItem, action: 'remove' | 'add') => {
    if (action === 'add') {
      setMultipleSelectedDropdownItems((prev) => [...prev, selectedItem.trim()])
    }

    if (action === 'remove') {
      setMultipleSelectedDropdownItems((prev) => {
        return prev.filter((x) => x !== selectedItem.trim())
      })
    }
    // setSelectedDropdownItem(prev => ([]...prev, }))
  }

  //This is city
  useEffect(() => {
    // console.log(first)
    if (fieldLabel.toLowerCase().includes('city') && getCitiesRedux) {
      if (getCitiesRedux?.success) {
        setOptionsField(getCitiesRedux?.serverResponse?.data?.map((x) => x?.cityName))
        setCities(
          getCitiesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName, cityId: x?.cityId, cityName: x?.cityName }
          })
        )
        // console.log({ getStatesRedux: getStatesRedux?.serverResponse })
      }
    }
  }, [getCitiesRedux])

  useEffect(()=> {
if(!fieldLabel.toLowerCase().includes('country') && !fieldLabel.toLowerCase().includes('state') && !fieldLabel.toLowerCase().includes('city')){
  setOptionsField(_optionsFieldForm)
}
  }, [])

  // This fills the filling form state with the data input
  useEffect(() => {
    if (enableMultipleSelection.toLowerCase() === 'on') {
      //   console.log(multipleSelectedDropdownItems)
      // if (multipleSelectedDropdownItems.length === 0) {
      //   return
      // } else {
      // Remove the item from required when a value is selected
      if (multipleSelectedDropdownItems.length > 0) {
        const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

        if (requiredFieldsFromRedux) {
          const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

          dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
        }
        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId

          if (!copiedPrev?.data?.formInfomation?.formId) {
            copiedPrev.data.formInfomation.formId = theForm?._id
            copiedPrev.data.formInfomation.formType = theForm?.formType
          }

          // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

          const sectionId = item?.sectionId
          let sectionIndex

          if (sectionId) {
            const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
            const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
            const theItemSectionNameCamelCase = camelize(theItemSectionName)

            const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

            if (theSection) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

              theSection.data[theItemFieldNameCamelCase] = multipleSelectedDropdownItems.toString()
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: multipleSelectedDropdownItems.toString(),
                },
                pageId,
                sectionId,
              })
            }
          }

          if (!sectionId) {
            const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
            const pageNameCamelCase = camelize(pageName)
            const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

            const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

            if (theSectionlessPage) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

              theSectionlessPage.data[theItemFieldNameCamelCase] = multipleSelectedDropdownItems.toString()
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: multipleSelectedDropdownItems.toString(),
                },
                pageId,
                sectionId: null,
              })
            }
          }

          return copiedPrev
        })
      } else {
        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId

          if (!copiedPrev?.data?.formInfomation?.formId) {
            copiedPrev.data.formInfomation.formId = theForm?._id
            copiedPrev.data.formInfomation.formType = theForm?.formType
          }

          // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

          const sectionId = item?.sectionId
          let sectionIndex

          if (sectionId) {
            const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
            const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
            const theItemSectionNameCamelCase = camelize(theItemSectionName)

            const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

            if (theSection) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

              theSection.data[theItemFieldNameCamelCase] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: '',
                },
                pageId,
                sectionId,
              })
            }
          }

          if (!sectionId) {
            const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
            const pageNameCamelCase = camelize(pageName)
            const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

            const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

            if (theSectionlessPage) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

              theSectionlessPage.data[theItemFieldNameCamelCase] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: '',
                },
                pageId,
                sectionId: null,
              })
            }
          }

          return copiedPrev
        })
      }
      // }
    }
  }, [multipleSelectedDropdownItems])

  useEffect(() => {
    if (enableMultipleSelection.toLowerCase() === 'off') {
      // if (!selectedDropdownItem) {
      //   return
      // } else {
      if (selectedDropdownItem?.length > 0) {
        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId

          if (!copiedPrev?.data?.formInfomation?.formId) {
            copiedPrev.data.formInfomation.formId = theForm?._id
            copiedPrev.data.formInfomation.formType = theForm?.formType
          }

          // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

          const sectionId = item?.sectionId
          let sectionIndex

          if (sectionId) {
            const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
            const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
            const theItemSectionNameCamelCase = camelize(theItemSectionName)

            const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

            if (theSection) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

              theSection.data[theItemFieldNameCamelCase] = selectedDropdownItem
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: selectedDropdownItem,
                },
                pageId,
                sectionId,
              })
            }
          }

          if (!sectionId) {
            const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
            const pageNameCamelCase = camelize(pageName)
            const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

            const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

            if (theSectionlessPage) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

              theSectionlessPage.data[theItemFieldNameCamelCase] = selectedDropdownItem
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: selectedDropdownItem,
                },
                pageId,
                sectionId: null,
              })
            }
          }

          return copiedPrev
        })
      } else {
        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId

          if (!copiedPrev?.data?.formInfomation?.formId) {
            copiedPrev.data.formInfomation.formId = theForm?._id
            copiedPrev.data.formInfomation.formType = theForm?.formType
          }

          // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

          const sectionId = item?.sectionId
          let sectionIndex

          if (sectionId) {
            const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
            const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
            const theItemSectionNameCamelCase = camelize(theItemSectionName)

            const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

            if (theSection) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

              theSection.data[theItemFieldNameCamelCase] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: '',
                },
                pageId,
                sectionId,
              })
            }
          }

          if (!sectionId) {
            const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
            const pageNameCamelCase = camelize(pageName)
            const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

            const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

            if (theSectionlessPage) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

              theSectionlessPage.data[theItemFieldNameCamelCase] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: '',
                },
                pageId,
                sectionId: null,
              })
            }
          }

          return copiedPrev
        })
      }
      // }
    }
  }, [selectedDropdownItem])

  useEffect(() => {
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x?.sectionId === item?.sectionId
      } else {
        return x?.pageId === item?.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]

    if (enableMultipleSelection.toLowerCase() === 'on') {
      if (theData?.length > 0) {
        setMultipleSelectedDropdownItems(theData?.split(','))
      }
    } else {
      setSelectedDropdownItem(theData)
    }
  }, [])

  useEffect(() => {
    if (selectedDropdownItem) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = selectedDropdownItem

        return copiedPrev
      })
    }
  }, [selectedDropdownItem])

  useEffect(() => {
    if (multipleSelectedDropdownItems.length > 0) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = multipleSelectedDropdownItems

        return copiedPrev
      })
    }
  }, [multipleSelectedDropdownItems])

  useEffect(() => {
    const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null

    if (backup) {
      if (enableMultipleSelection.toLowerCase() === 'off') {
        if (!selectedDropdownItem) {
          setSelectedDropdownItem(backup)
        }
      } else {
        if (multipleSelectedDropdownItems.length === 0) {
          setMultipleSelectedDropdownItems(backup)
        }
      }
    } else {
      if (enableMultipleSelection.toLowerCase() === 'off') {
        setSelectedDropdownItem('')
      }

      if (enableMultipleSelection.toLowerCase() === 'on') {
        setMultipleSelectedDropdownItems([])
      }
    }
  }, [publishedFormState])

  return (
    <div
      className={`${collapsed ? 'hidden' : ''}`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `2px dotted green` : '',
      }}
      title={helpText}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>

      <div className={`relative`}>
        <div
          className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA] cursor-pointer'
          onClick={() => {
            setShowLists((prev) => !prev)
            if (fieldLabel.toLowerCase().includes('state')) {
              checkIfItemIsState(item)
            }
            if (fieldLabel.toLowerCase().includes('city')) {
              checkIfItemIsCity()
            }
          }}
          title={selectedDropdownItem && selectedDropdownItem}
        >
          {enableMultipleSelection.toLowerCase() === 'off' ? (
            <div className='overflow-hidden'>
              {selectedDropdownItem ? (
                typeof selectedDropdownItem !== 'string' ? (
                  [].concat(selectedDropdownItem).toString()
                ) : (
                  selectedDropdownItem
                )
              ) : (
                <span className={`text-text-disabled`}>Select</span>
              )}
            </div>
          ) : null}
          {enableMultipleSelection.toLowerCase() === 'on' ? (
            <div className='max-w-[100%] overflow-x-auto text-text-disabled'>
              {multipleSelectedDropdownItems.length === 0 ? 'Select' : multipleSelectedDropdownItems.toString().replace(/[,]/g, ', ')}
            </div>
          ) : null}
          <span>
            <img src={caret} width={15} height={10} />
          </span>
        </div>
        {!showLists && required.toLowerCase() === 'on' ? (
          <p className='text-red-500'>
            {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase) ? `${fieldLabel} is required!` : null}
          </p>
        ) : null}
        {showLists && (
          <div
            className='absolute w-full bg-background-paper   flex flex-col z-50 border rounded-lg h-[200px] overflow-y-auto'
            style={{
              zIndex: 999,
            }}
          >
            {enableMultipleSelection?.toLowerCase() === 'off' && fieldLabel.toLowerCase().includes('country') && getCountriesRedux?.loading ? (
              <div className='h-full flex justify-center items-center w-full'>
                <Spinner size='large' />
              </div>
            ) : null}
            {enableMultipleSelection?.toLowerCase() === 'off' && fieldLabel.toLowerCase().includes('state') && getStatesRedux?.loading ? (
              <div className='h-full flex justify-center items-center w-full'>
                <Spinner size='large' />
              </div>
            ) : null}
            {enableMultipleSelection?.toLowerCase() === 'off' && fieldLabel.toLowerCase().includes('city') && getCitiesRedux?.loading ? (
              <div className='h-full flex justify-center items-center w-full'>
                <Spinner size='large' />
              </div>
            ) : null}
            {enableMultipleSelection.toLowerCase() === 'off'
              ? optionsField?.length > 0 &&
                optionsField?.map((selected, index) => {
                  return (
                    <div
                      key={index}
                      className={`hover:bg-red-200 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-red-200' : ''} `}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectedDropdownItem(selected, item)

                        const country = countries.find((x) => x.countryName === selected)
                        if (country) {
                          sessionStorage.setItem(
                            `${item?.sectionId || item?.pageId}`,
                            JSON.stringify({ selected, country, sectionId: item?.sectionId, pageId: item?.pageId })
                          )
                        }

                        setShowLists(false)
                      }}
                    >
                      {selected.trim()}
                    </div>
                  )
                })
              : null}
            {enableMultipleSelection.toLowerCase() === 'on'
              ? optionsField?.length > 0 &&
                optionsField?.map((selected: string, index: number) => {
                  return (
                    <>
                      {
                        <MultipleSelectionItem
                          multipleSelectedDropdownItems={multipleSelectedDropdownItems}
                          handleMultipleSelectedDropdownItem={handleMultipleSelectedDropdownItem}
                          selected={selected}
                          key={index}
                        />
                      }
                    </>
                  )
                })
              : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormDropdown
