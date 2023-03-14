import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { getColumnName } from 'Utilities/getColumnName'
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

const FormDate = ({
  item,
  collapsed,
  setFillingFormState,
  publishedFormState,
  activePageState,
  fillingFormState,
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
  const placeholder = getProperty(item.formControlProperties, 'Placeholder', 'value').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'value').text
    : getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    : `Enter ${fieldLabel}`
  const helpText = getProperty(item.formControlProperties, 'Help text', 'value').text
    ? getProperty(item.formControlProperties, 'Help text', 'value').text
    : getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    : fieldLabel

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const getColumnMap = useSelector<ReducersType>((state: ReducersType) => state?.getColumnMap) as ResponseType

  const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

  const [text, setText] = useState<string>('')
  const [columnName, setColumnName] = useState<string>('')

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
    setText(e.target.value)

    const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

    if (requiredFieldsFromRedux) {
      const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

      dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
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

          theSection.data[columnName] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: theItemSectionNameCamelCase,
            data: {
              [columnName]: e.target.value.trim(),
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

          theSectionlessPage.data[columnName] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: pageNameToBeUsed,
            data: {
              [columnName]: e.target.value.trim(),
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
    if (getColumnMap?.serverResponse?.status) {
      // console.log({
      const _columnName = getColumnName({
        columns: getColumnMap?.serverResponse?.data,
        sectionId: item?.sectionId,
        pageId: item?.pageId,
        fieldId: item?.id,
        fieldName: theItemFieldNameCamelCase,
      })

      if (_columnName) {
        setColumnName(_columnName)
      }
    }
  }, [getColumnMap?.serverResponse?.status])

  useEffect(() => {
    if (!columnName) {
      return
    }
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x.sectionId === item.sectionId
      } else {
        return x.pageId === item.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[columnName]

    if (theData) {
      setText(theData)
    }
  }, [columnName])

  useEffect(() => {
    if (text) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[columnName] = text

        return copiedPrev
      })
    }
  }, [text])

  useEffect(() => {
    const backup = backupForSwitchFormState?.hasOwnProperty(columnName) ? backupForSwitchFormState[columnName] : null

    if (!text) {
      if (backup) {
        setText(backup)
      } else {
        setText('')

        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId

          if (!copiedPrev?.data?.formInfomation?.formId) {
            if (copiedPrev.data) {
              copiedPrev.data.formInfomation.formId = theForm?._id
              copiedPrev.data.formInfomation.formType = theForm?.formType
            }
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

              theSection.data[columnName] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [columnName]: '',
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

              theSectionlessPage.data[columnName] = ''
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [columnName]: '',
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
  }, [publishedFormState, columnName])

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} bg-transparent`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `.125rem dotted green` : '',
      }}
      title={helpText}
    >
      <div className='relative bg-transparent w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>
      <div className='bg-transparent'>
        <input
          className={`flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA]`}
          style={{
            background: 'transparent',
          }}
          type={
            item.name === fieldsNames.DATE
              ? 'date'
              : item.name === fieldsNames.DATETIME
              ? 'datetime-local'
              : item.name === fieldsNames.TIME
              ? 'time'
              : item.name === fieldsNames.MONTH
              ? 'month'
              : item.name === fieldsNames.WEEK
              ? 'week'
              : ''
          }
          required={required.toLowerCase() === 'on'}
          placeholder={placeholder}
          title={helpText}
          onChange={(e) => handleChange(e, item)}
          value={text}
        />
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>
          {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === columnName) ? `${fieldLabel} is required!` : null}
        </p>
      ) : null}
    </div>
  )
}

export default FormDate
