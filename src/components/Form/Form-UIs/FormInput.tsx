import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { generateID } from 'Utilities/generateId'
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
  setBackupForSwitchFormState: (value: any) => void
  backupForSwitchFormState: any
}

const FormInput = ({
  item,
  collapsed,
  setFillingFormState,
  publishedFormState,
  activePageState,
  fillingFormState,
  setBackupForSwitchFormState,
  backupForSwitchFormState,
}: Props) => {
  const theForm = publishedFormState?.serverResponse?.data as Form

  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const theItemFieldNameCamelCase = camelize(fieldLabel)
  // const pageName = theForm?.builtFormMetadata?.pages?.find((x) => formGetProperty(x.pageProperties, "Page name", "Page Name") )

  // const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  // console.log(item)

  const [text, setText] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
    setText(e.target.value)

    setFillingFormState((prev: FormStructureType) => {
      // console.log('prev', prev)
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

    // [theItemFieldNameCamelCase]: e.target.value.trim()
  }

  useEffect(() => {
    // console.log({ fillingFormState, backupForSwitchFormState })
    // console.log({ runni: fillingFormState?.data?.customerData })
    if (fillingFormState?.data?.customerData?.length === 0) {
      const exists = fillingFormState[theItemFieldNameCamelCase]

      // console.log({ exists })

      if (exists) {
        setText(exists)
      }
      return
    }
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x.sectionId === item.sectionId
      } else {
        return x.pageId === item.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]
    // console.log

    if (theData) {
      // console.log({ theData })
      setText(theData)
    }
  }, [])

  useEffect(() => {
    // console.log({ text })
    if (text) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = text

        return copiedPrev
      })
    }
  }, [text])

  useEffect(() => {
    const backup = backupForSwitchFormState[theItemFieldNameCamelCase]

    if (backup) {
      setText(backup)
    }
  }, [fillingFormState, publishedFormState])

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
      <div className='relative w-full border-b border-b-[#AAAAAA]'>
        {item.name === fieldsNames.NUMBERCOUNTER ? (
          <input
            className={`flex w-full  py-1 leading-6 `}
            type='number'
            required={required.toLowerCase() === 'on'}
            placeholder={placeholder}
            title={helpText}
            onChange={(e) => handleChange(e, item)}
            maxLength={Number(maximumNumbersOfCharacters)}
            value={text}
            min='0'
          />
        ) : null}
        {item.name !== fieldsNames.NUMBERCOUNTER ? (
          <input
            className={`flex w-full  py-1 leading-6 `}
            type={
              item.name === fieldsNames.INFOTEXT || item.name === fieldsNames.SHORTEXT
                ? 'text'
                : item.name === fieldsNames.PHONEINPUT
                ? 'tel'
                : item.name === fieldsNames.PASSWORD
                ? 'password'
                : item.name === fieldsNames.URL
                ? 'url'
                : item.name === fieldsNames.EMAIL
                ? 'email'
                : 'text'
            }
            required={required.toLowerCase() === 'on'}
            placeholder={placeholder}
            title={helpText}
            onChange={(e) => handleChange(e, item)}
            maxLength={Number(maximumNumbersOfCharacters)}
            value={text}
          />
        ) : null}

        {item.name !== fieldsNames.NUMBERCOUNTER && maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 text-sm text-[#9ca3af] z-10 bg-white'>
            {text.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FormInput
