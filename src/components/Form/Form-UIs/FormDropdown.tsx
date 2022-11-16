import { caret } from 'Assets/svgs'
import React, { useEffect, useState } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import MultipleSelectionItem from './MultipleSelectionItem'

const sampleList = ['sample 1', 'sample 2', 'sample 3']

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

const FormDropdown = ({ item, collapsed }: Props) => {
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
  const specifyOptionsListValue = getProperty(item.formControlProperties, 'Specify Options List', 'value').list
    ? getProperty(item.formControlProperties, 'Specify Options List', 'value').list
    : getProperty(item.formControlProperties, 'Specify Options List', 'defaultState').list
    ? getProperty(item.formControlProperties, 'Specify Options List', 'defaultState').list
    : ''
  const importFromFileListValue = getProperty(item.formControlProperties, 'Upload List', 'value').list
    ? getProperty(item.formControlProperties, 'Upload List', 'value').list
    : getProperty(item.formControlProperties, 'Upload List', 'defaultState').list
    ? getProperty(item.formControlProperties, 'Upload List', 'defaultState').list
    : ''

  const importFromAPIListValue = getProperty(item.formControlProperties, 'Specify API', 'value').list
    ? getProperty(item.formControlProperties, 'Specify API', 'value').list
    : getProperty(item.formControlProperties, 'Specify API', 'defaultState').list
    ? getProperty(item.formControlProperties, 'Specify API', 'defaultState').list
    : ''

  const importFromURLListValue = getProperty(item.formControlProperties, 'Specify URL', 'value').list
    ? getProperty(item.formControlProperties, 'Specify URL', 'value').list
    : getProperty(item.formControlProperties, 'Specify URL', 'defaultState').list
    ? getProperty(item.formControlProperties, 'Specify URL', 'defaultState').list
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

  const [showLists, setShowLists] = useState<Boolean>(false)
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
    // console.log(selectedItem)
    // setSelectedDropdownItem(prev => ([]...prev, }))
  }

  // useEffect(() => {
  //   console.log(multipleSelectedDropdownItems)
  // }, [multipleSelectedDropdownItems.length])

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
          <div className='overflow-hidden'>
            {selectedDropdownItem && selectedDropdownItem}
            <span className={`text-text-disabled`}>{!selectedDropdownItem && 'Select'}</span>
          </div>
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
              ? optionsField?.length > 0
                ? optionsField?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-slate-100 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-white' : ''} `}
                        onClick={() => handleSelectedDropdownItem(selected)}
                      >
                        {selected}
                      </div>
                    )
                  })
                : sampleList?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-slate-100 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-white' : ''} `}
                        onClick={() => handleSelectedDropdownItem(selected)}
                      >
                        {selected}
                      </div>
                    )
                  })
              : null}
            {enableMultipleSelection.toLowerCase() === 'on'
              ? optionsField?.length > 0
                ? optionsField?.map((selected: string, index: number) => {
                    return (
                      <MultipleSelectionItem
                        handleMultipleSelectedDropdownItem={handleMultipleSelectedDropdownItem}
                        selected={selected}
                        key={index}
                      />
                    )
                  })
                : sampleList?.map((selected: string, index: number) => {
                    return (
                      <MultipleSelectionItem
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

export default FormDropdown
