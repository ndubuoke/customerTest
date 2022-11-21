import React, { useEffect, useState } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

const FormPhoneInput = ({ item, collapsed }: Props) => {
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')

  const [text, setText] = useState<string>('')

  const handleChange = (phone: string) => {
    setText(phone)
  }

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
        <PhoneInput
          country={'ng'}
          value={text.length <= Number(maximumNumbersOfCharacters) ? text : text.slice(0, Number(maximumNumbersOfCharacters))}
          onChange={(phone) => handleChange(phone)}
          inputStyle={{
            width: '100%',
          }}
        />

        {maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 text-sm text-[#9ca3af] z-10 bg-white'>
            {text.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FormPhoneInput
