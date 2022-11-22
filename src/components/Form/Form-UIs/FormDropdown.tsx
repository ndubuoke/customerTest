import { caret } from 'Assets/svgs'
import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
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
}

const FormDropdown = memo(({ item, collapsed, publishedFormState, activePageState, fillingFormState, setFillingFormState }: Props) => {
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

  const [showLists, setShowLists] = useState<boolean>(false)
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)
  const [multipleSelectedDropdownItems, setMultipleSelectedDropdownItems] = useState<Array<string>>([])

  const handleSelectedDropdownItem = (selectedItem: string) => {
    setSelectedDropdownItem(selectedItem)
  }

  const handleMultipleSelectedDropdownItem = (selectedItem, action: 'remove' | 'add') => {
    if (action === 'add') {
      setMultipleSelectedDropdownItems((prev) => [...prev, selectedItem])
    }

    if (action === 'remove') {
      setMultipleSelectedDropdownItems((prev) => {
        return prev.filter((x) => x !== selectedItem)
      })
    }
    console.log(selectedItem)
    // setSelectedDropdownItem(prev => ([]...prev, }))
  }

  // useEffect(() => {
  //   console.log({ specifyOptionsListValue, optionsField })
  // }, [optionsField])

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
        <button
          className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA]'
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
        </button>
        {showLists && (
          <div
            className='absolute w-full bg-background-paper   flex flex-col z-50 border rounded-lg'
            style={{
              zIndex: 999,
            }}
          >
            {enableMultipleSelection.toLowerCase() === 'off'
              ? optionsField?.length > 0 &&
                optionsField?.split(',')?.map((selected, index) => {
                  return (
                    <div
                      key={index}
                      className={`hover:bg-slate-100 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-white' : ''} `}
                      onClick={() => handleSelectedDropdownItem(selected)}
                    >
                      {selected.trim()}
                    </div>
                  )
                })
              : null}
            {enableMultipleSelection.toLowerCase() === 'on'
              ? optionsField?.length > 0 &&
                optionsField?.split(',')?.map((selected: string, index: number) => {
                  return (
                    <MultipleSelectionItem handleMultipleSelectedDropdownItem={handleMultipleSelectedDropdownItem} selected={selected} key={index} />
                  )
                })
              : null}
          </div>
        )}
      </div>
    </div>
  )
})

export default FormDropdown
