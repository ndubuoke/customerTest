import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React from 'react'
import FieldLabel from './FieldLabel'

type Props = {
  required: 'on' | 'off'
  id: SignatoryDetailType
  colspan?: number
  text: SignatoryDetailType
  value: string
  setValue: (value: any) => any
  type?: 'text' | 'number' | 'date' | 'email'
  placeholder: string
  maximumNumbersOfCharacters: number
}

const TextInput = ({ id, required, setValue, value, text, colspan = 1, type = 'text', placeholder, maximumNumbersOfCharacters }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev: any) => ({
      ...prev,
      [text]: e.target.value.trim(),
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

export default TextInput
