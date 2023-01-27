import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { getProperty } from 'Utilities/getProperty'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import { Form, FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'

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

type DisplayTypeType = 'checkbox' | 'toggle switch'

const FormActionToggle = ({
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

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')

  const displayType = formGetProperty(item.formControlProperties, 'Type', 'checkbox') as DisplayTypeType
  let _labelPosition = getProperty(item.formControlProperties, 'Swap label position', 'value').text
    ? getProperty(item.formControlProperties, 'Swap label position', 'value').text
    : getProperty(item.formControlProperties, 'Swap label position', 'defaultState').text

  let labelPosition = _labelPosition.toLowerCase() === 'on' ? 'right' : 'left'

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState('off')

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
    const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

    if (requiredFieldsFromRedux) {
      const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

      dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
    }
    if (e.target.checked) {
      setChecked('on')
    } else {
      setChecked('off')
    }

    setFillingFormState((prev: FormStructureType) => {
      const copiedPrev = { ...prev }
      const pageId = theItemFromChange?.pageId

      if (!copiedPrev?.data?.formInfomation?.formId) {
        copiedPrev.data.formInfomation.formId = theForm?._id
        copiedPrev.data.formInfomation.formType = theForm?.formType
      }

      // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

      const sectionId = theItemFromChange?.sectionId
      let sectionIndex

      if (sectionId) {
        const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
        const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
        const theItemSectionNameCamelCase = camelize(theItemSectionName)

        const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

        if (theSection) {
          sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

          theSection.data[theItemFieldNameCamelCase] = e.target.checked ? 'on' : 'off'
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: theItemSectionNameCamelCase,
            data: {
              [theItemFieldNameCamelCase]: e.target.checked ? 'on' : 'off',
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

          theSectionlessPage.data[theItemFieldNameCamelCase] = e.target.checked ? 'on' : 'off'
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: pageNameToBeUsed,
            data: {
              [theItemFieldNameCamelCase]: e.target.checked ? 'on' : 'off',
            },
            pageId,
            sectionId: null,
          })
        }
      }

      return copiedPrev
    })
  }

  useEffect(() => {
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x.sectionId === item.sectionId
      } else {
        return x.pageId === item.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]

    if (theData) {
      setChecked(theData)
    }
  }, [])

  useEffect(() => {
    if (checked) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = checked

        return copiedPrev
      })
    }
  }, [checked])

  useEffect(() => {
    const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null

    if (!text) {
      if (backup) {
        setChecked(backup)
      } else {
        setChecked('off')
        setFillingFormState((prev: FormStructureType) => {
          // console.log('prev', prev)
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

              theSection.data[theItemFieldNameCamelCase] = 'off'
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: 'off',
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

              theSectionlessPage.data[theItemFieldNameCamelCase] = 'off'
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: 'off',
                },
                pageId,
                sectionId: null,
              })
            }
          }

          return copiedPrev
        })
      }
    }
  }, [publishedFormState])

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} flex items-center`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `.125rem dotted green` : '',
      }}
      title={helpText}
    >
      {displayType === 'toggle switch' && (
        <div className={` flex    w-full  h-fit gap-2 `}>
          <label className={`inline-flex relative items-center cursor-pointer ${labelPosition === 'left' ? 'order-1' : 'order-2'} `}>
            <input
              type='checkbox'
              value=''
              id='default-toggle'
              className='sr-only peer cursor-pointer'
              checked={checked === 'on'}
              onChange={(e) => handleChange(e, item)}
            />
            <div className="w-11 h-6 border-primay-main border peer-focus:outline-none  peer-focus:ring-0 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[.125rem] after:left-[.125rem] after:bg-white after:border-primay-main after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primay-main"></div>
          </label>
          <div className={`relative w-fit  ${labelPosition === 'left' ? 'order-2' : 'order-1'}`}>
            {required.toLowerCase() === 'on' ? <div className={`absolute text-red-500 -right-3 top-0 text-xl`}>*</div> : null}
            <FieldLabel fieldItem={item} />
          </div>
        </div>
      )}

      {displayType === 'checkbox' && (
        <div className={` flex    w-full  h-fit gap-2 items-center`}>
          <input
            type='checkbox'
            className={`accent-primay-main w-4 h-4 ${labelPosition === 'left' ? 'order-1' : 'order-2'}`}
            checked={checked === 'on'}
            onChange={(e) => handleChange(e, item)}
          />
          <div className={`relative w-fit ${labelPosition === 'left' ? 'order-2' : 'order-1'}`}>
            {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
            <FieldLabel fieldItem={item} />
          </div>
        </div>
      )}
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>
          {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase) ? `${fieldLabel} is required!` : null}
        </p>
      ) : null}
    </div>
  )
}

export default FormActionToggle
