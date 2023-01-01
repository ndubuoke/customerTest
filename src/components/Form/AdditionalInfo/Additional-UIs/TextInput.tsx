import { AdditionalDetailType } from 'Components/Form/Types/AdditionalTypes'
import React from 'react'
import FieldLabel from './FieldLabel'

type Props = {
  required: 'on' | 'off'
  colspan?: number
  label: AdditionalDetailType
  value: string
  setValue: (val: string) => void
  type?: 'text' | 'number' | 'date' | 'email'
  placeholder: string
  maximumNumbersOfCharacters: number
}

const AdditionalTextInput = ({ required, setValue, value, label, colspan = 1, type = 'text', placeholder, maximumNumbersOfCharacters }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim())
  }
  return (
    <div
      style={{
        gridColumn: `span ${colspan}`,
      }}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel text={label} colspan={colspan} id={label} />
      </div>

      <div className={`relative w-full border-b border-b-[#AAAAAA]`}>
        <input
          className={`flex w-full  py-1 leading-6 `}
          type={type}
          required={required.toLowerCase() === 'on'}
          placeholder={placeholder}
          title={placeholder}
          onChange={(e) => handleChange(e)}
          maxLength={Number(maximumNumbersOfCharacters)}
          value={value}
        />
        {type !== 'date' && maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 text-sm text-[#9ca3af] z-10 bg-white'>
            {value.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AdditionalTextInput
