import { caret, search } from 'Assets/svgs'
import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { getProperty } from 'Utilities/getProperty'
import { Form, FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import DataListInput from 'react-datalist-input'

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

const FormSearchAndSelect = memo(
  ({
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
    const enableMultipleSelection = formGetProperty(item.formControlProperties, 'Enable multiple selection of options', 'off')
    const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
    const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)

    const dropdownOptionsListValue = formGetProperty(item.formControlProperties, 'Dropdown Options List', '')
    const specifyOptionsListValue = formGetProperty(item.formControlProperties, 'Specify Options List', '')
    const importFromFileListValue = formGetProperty(item.formControlProperties, 'Upload List', '')
    const importFromAPIListValue = formGetProperty(item.formControlProperties, 'Specify API', '')
    const importFromURLListValue = formGetProperty(item.formControlProperties, 'Specify URL', '')

    const optionsField =
      dropdownOptionsListValue.toLowerCase() === 'manual input'
        ? specifyOptionsListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from file'
        ? importFromFileListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from api'
        ? importFromAPIListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from url'
        ? importFromURLListValue
        : null

    const theItemFieldNameCamelCase = camelize(fieldLabel)

    const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)

    //   console.log(optionsField.split(",").map(function (value) {
    //     return value.trim();
    //  }))

    const items = useMemo(
      () =>
        optionsField?.split(',')?.map((oneItem) => ({
          label: oneItem?.trim(),
          key: oneItem?.trim(),
        })),
      [optionsField]
    )

    const onSelect = useCallback((theSelectedItem, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
      setSelectedDropdownItem(theSelectedItem.label)

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

            theSection.data[theItemFieldNameCamelCase] = theSelectedItem?.label
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: theItemSectionNameCamelCase,
              data: {
                [theItemFieldNameCamelCase]: theSelectedItem?.label,
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

            theSectionlessPage.data[theItemFieldNameCamelCase] = theSelectedItem?.label
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: pageNameToBeUsed,
              data: {
                [theItemFieldNameCamelCase]: theSelectedItem?.label,
              },
              pageId,
              sectionId: null,
            })
          }
        }

        return copiedPrev
      })
    }, [])

    useEffect(() => {
      const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
        if (x.sectionId) {
          return x?.sectionId === item?.sectionId
        } else {
          return x?.pageId === item?.pageId
        }
      })

      const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]

      if (theData) {
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
      const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null

      if (!selectedDropdownItem) {
        if (backup) {
          setSelectedDropdownItem(backup)
        }
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

        <div className='w-full border-b border-b-[#AAAAAA] relative mt-2 pl-2'>
          <div className=' w-full   py-1 pl-2 ml-1`'>
            <DataListInput
              placeholder={selectedDropdownItem || placeholder}
              items={items}
              onSelect={(theSelectedItem) => onSelect(theSelectedItem, item)}
              value={selectedDropdownItem ? selectedDropdownItem : ''}
            />
          </div>
          <span
            className='absolute z-50 -left-1   h-full pt-4'
            style={{
              top: '-6px',
              right: '4.7px',
              pointerEvents: 'none',
            }}
          >
            <img src={search} width={15} height={10} />
          </span>
          <span
            className='absolute z-50 -right-1   h-full pt-4'
            style={{
              top: '-6px',
              right: '4.7px',
              pointerEvents: 'none',
            }}
          >
            <img src={caret} width={15} height={10} />
          </span>
        </div>
      </div>
    )
  }
)

export default FormSearchAndSelect
