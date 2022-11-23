import React, { useEffect, useState } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

type DisplayTypeType = 'checkbox' | 'toggle switch'

const FormActionToggle = ({ item, collapsed }: Props) => {
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

  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState(false)

  const handleSelect = (selectedItem, action: 'remove' | 'add') => {
    // setText(selectedItem)
  }

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} flex items-center`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `2px dotted green` : '',
      }}
      title={helpText}
    >
      {displayType === 'toggle switch' && (
        <div className={` flex    w-full  h-fit gap-2 `}>
          <label className={`inline-flex relative items-center cursor-pointer ${labelPosition === 'left' ? 'order-1' : 'order-2'} `}>
            <input type='checkbox' value='' id='default-toggle' className='sr-only peer cursor-pointer' />
            <div className="w-11 h-6 border-primay-main border peer-focus:outline-none  peer-focus:ring-0 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-primay-main after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primay-main"></div>
          </label>
          <div className={`relative w-fit  ${labelPosition === 'left' ? 'order-2' : 'order-1'}`}>
            {required.toLowerCase() === 'on' ? <div className={`absolute text-red-500 -right-3 top-0 text-xl`}>*</div> : null}
            <FieldLabel fieldItem={item} />
          </div>
        </div>
      )}

      {displayType === 'checkbox' && (
        <div className={` flex    w-full  h-fit gap-2 items-center`}>
          <input type='checkbox' className={`accent-primay-main w-4 h-4 ${labelPosition === 'left' ? 'order-1' : 'order-2'}`} />
          <div className={`relative w-fit ${labelPosition === 'left' ? 'order-2' : 'order-1'}`}>
            {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
            <FieldLabel fieldItem={item} />
          </div>
        </div>
      )}
    </div>
  )
}

export default FormActionToggle
