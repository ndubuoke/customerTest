import { caret } from 'Assets/svgs'
import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useEffect, useState } from 'react'
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

const FormDropdown = memo(
  ({
    item,
    collapsed,
    publishedFormState,
    activePageState,
    fillingFormState,
    setFillingFormState,
    setBackupForSwitchFormState,
    backupForSwitchFormState,
  }: Props) => {
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

    const optionsField = _optionsField?.split(',')?.map((oneItem) => oneItem.trim())

    const theItemFieldNameCamelCase = camelize(fieldLabel)

    const [showLists, setShowLists] = useState<boolean>(false)
    const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)
    const [multipleSelectedDropdownItems, setMultipleSelectedDropdownItems] = useState<Array<string>>([])

    const handleSelectedDropdownItem = (selectedItem: string, theItemFromChange) => {
      setSelectedDropdownItem(selectedItem.trim())
    }

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

    useEffect(() => {
      if (enableMultipleSelection.toLowerCase() === 'on') {
        //   console.log(multipleSelectedDropdownItems)

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
      }
    }, [multipleSelectedDropdownItems])

    useEffect(() => {
      if (enableMultipleSelection.toLowerCase() === 'off') {
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
        if (theData) {
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
      if (multipleSelectedDropdownItems) {
        setBackupForSwitchFormState((prev) => {
          const copiedPrev = { ...prev }
          copiedPrev[theItemFieldNameCamelCase] = multipleSelectedDropdownItems
          return copiedPrev
        })
      }
    }, [multipleSelectedDropdownItems])

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

        <div className={`relative`}>
          <div
            className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA] cursor-pointer'
            onClick={() => setShowLists((prev) => !prev)}
            title={selectedDropdownItem && selectedDropdownItem}
          >
            {enableMultipleSelection.toLowerCase() === 'off' ? (
              <div className='overflow-hidden'>
                {selectedDropdownItem && selectedDropdownItem}
                <span className={`text-text-disabled`}>{!selectedDropdownItem && 'Select'}</span>
              </div>
            ) : null}
            {enableMultipleSelection.toLowerCase() === 'on' ? (
              <div className='max-w-[100%] overflow-x-auto text-text-disabled'>
                {multipleSelectedDropdownItems.toString().replace(/[,]/g, ', ') || 'Select'}
              </div>
            ) : null}
            <span>
              <img src={caret} width={15} height={10} />
            </span>
          </div>
          {showLists && (
            <div
              className='absolute w-full bg-background-paper   flex flex-col z-50 border rounded-lg'
              style={{
                zIndex: 999,
              }}
            >
              {enableMultipleSelection.toLowerCase() === 'off'
                ? optionsField?.length > 0 &&
                  optionsField?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-slate-200 cursor-pointer px-3 py-2 capitalize ${
                          selected === selectedDropdownItem ? 'bg-slate-200' : ''
                        } `}
                        onClick={() => {
                          handleSelectedDropdownItem(selected, item)

                          setShowLists((prev) => !prev)
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
                      <MultipleSelectionItem
                        multipleSelectedDropdownItems={multipleSelectedDropdownItems}
                        handleMultipleSelectedDropdownItem={handleMultipleSelectedDropdownItem}
                        selected={selected}
                        key={index}
                      />
                    )
                  })
                : null}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default FormDropdown
