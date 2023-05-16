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

const FormRadio = ({ item, collapsed }: Props) => {
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
  const isDisabled = formGetProperty(item.formControlProperties, 'Disable') === 'true' ? true : false

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} flex items-center`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `.125rem dotted green` : '',
      }}
      title={helpText}
    >
      <div className={` flex    w-full  h-fit gap-2 items-center`}>
        <input type='radio' disabled={isDisabled} className={`accent-primay-main w-4 h-4 `} />
        <div className={`relative w-fit ${labelPosition === 'left' ? 'order-2' : 'order-1'}`}>
          {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
          <FieldLabel fieldItem={item} />
        </div>
      </div>
    </div>
  )
}

export default FormRadio
