import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { getProperty } from 'Utilities/getProperty'
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
}

const FormTextArea = ({ item, collapsed, setFillingFormState, publishedFormState, activePageState, fillingFormState }: Props) => {
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

  const maximumNumbersOfCharacters = getProperty(item.formControlProperties, 'Maximum Number of characters', 'value').text
    ? getProperty(item.formControlProperties, 'Maximum Number of characters', 'value').text
    : getProperty(item.formControlProperties, 'Maximum Number of characters', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Maximum Number of characters', 'defaultState').text
    : '250'
  const theItemFieldNameCamelCase = camelize(fieldLabel)

  const [text, setText] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
    setText(e.target.value)

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

          theSection.data[theItemFieldNameCamelCase] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: theItemSectionNameCamelCase,
            data: {
              [theItemFieldNameCamelCase]: e.target.value.trim(),
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

          theSectionlessPage.data[theItemFieldNameCamelCase] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: pageNameToBeUsed,
            data: {
              [theItemFieldNameCamelCase]: e.target.value.trim(),
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
      setText(theData)
    }
  }, [])

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} `}
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
      <div className='relative w-full border border-[#AAAAAA] h-fit pr-1'>
        <textarea
          className={`flex w-full  p-1 leading-6 `}
          required={required.toLowerCase() === 'on'}
          placeholder={placeholder}
          title={helpText}
          onChange={(e) => handleChange(e, item)}
          style={{
            height: '150px',
          }}
          maxLength={Number(maximumNumbersOfCharacters)}
          value={text}
        />

        {maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 pr-4 text-sm text-[#9ca3af] z-10 bg-white'>
            {text.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FormTextArea
