import { caret, search } from 'Assets/svgs'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import MultipleSelectionItem from './MultipleSelectionItem'
import DataListInput from 'react-datalist-input'
import { formGetProperty } from './formGetProperty'

const sampleList = ['sample 1', 'sample 2', 'sample 3']

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

const FormSearchAndSelect = ({ item, collapsed }: Props) => {
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

  const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)

  const items = useMemo(
    () =>
      sampleList.map((oneItem) => ({
        label: oneItem,
        key: oneItem,
      })),
    [sampleList]
  )

  const onSelect = useCallback((theSelectedItem) => {
    setSelectedDropdownItem(theSelectedItem.label)
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

      <div className='w-full border-b border-b-[#AAAAAA] relative mt-2 pl-2'>
        <div className=' w-full   py-1 pl-2 ml-1`'>
          <DataListInput placeholder={placeholder} items={items} onSelect={onSelect} />
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
      </div>
    </div>
  )
}

export default FormSearchAndSelect
