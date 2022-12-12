import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import FieldLabel from './FieldLabel'

type Props = {
  required: 'on' | 'off'
  id: SignatoryDetailType
  colspan?: number
  text: SignatoryDetailType
  value: string
  setValue: (value: any) => any
  type?: 'tel'
  placeholder: string
  maximumNumbersOfCharacters: number
}

const PhoneInputSignatory = ({ id, required, setValue, value, text, colspan = 1, type = 'tel', placeholder, maximumNumbersOfCharacters }: Props) => {
  const handleChange = (phone: string) => {
    setValue((prev: any) => ({
      ...prev,
      [text]: phone,
    }))
  }
  return (
    <div
      style={{
        gridColumn: `span ${colspan}`,
      }}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel text={text} colspan={colspan} id={id} />
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
      </div>
    </div>
  )
}

export default PhoneInputSignatory
