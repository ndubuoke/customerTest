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

type ButtonType = 'Submit' | 'Reset' | 'Next Page' | 'Previous Page' | 'Custom'

const FormButton = ({ item, collapsed }: Props) => {
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const buttonType = formGetProperty(item.formControlProperties, 'Button Type', '') as ButtonType

  const [inactive, setInactive] = useState<boolean>(false)

  //   const [text, setText] = useState<string>('')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // if(buttonType === )
    // setText(e.target.value)
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
        <button
          type={
            buttonType === 'Next Page' || buttonType === 'Previous Page' || buttonType === 'Custom'
              ? 'button'
              : buttonType === 'Reset'
              ? 'reset'
              : 'submit'
          }
          onClick={(e) => handleClick(e)}
          className={`h-[34px] w-[227px] flex justify-center items-center rounded-[8px] capitalize leading-[24px] text-white ${
            inactive ? 'bg-[#aaaaaa] border border-[#d8dae5]' : 'bg-primay-main border border-primary-dark'
          }`}
          style={{
            letterSpacing: '-0.5px',
          }}
        >
          {fieldLabel}
        </button>
      </div>
    </div>
  )
}

export default FormButton
