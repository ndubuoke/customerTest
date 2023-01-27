import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unfilledRequiredSignatoryListAction, unfilledRequiredSignatoryListButtonAction } from 'Redux/actions/FormManagement.actions'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import FieldLabel from './FieldLabel'

type Props = {
  required: 'on' | 'off'
  id: SignatoryDetailType
  colspan?: number
  text: SignatoryDetailType
  value: string
  setValue: (value: any) => any
  type?: 'text' | 'number' | 'date'
  placeholder: string
  maximumNumbersOfCharacters: number
}

const TextArea = ({ id, required, setValue, value, text, colspan = 1, type = 'text', placeholder, maximumNumbersOfCharacters }: Props) => {
  const dispatch = useDispatch()
  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType
  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev: any) => ({
      ...prev,
      [camelize(replaceSpecialCharacters(text))]: e.target.value,
    }))
    // handleRedispatchOfRequiredFields()
  }

  const handleRedispatchOfRequiredFields = () => {
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === camelize(replaceSpecialCharacters(text)))

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== camelize(replaceSpecialCharacters(text)))
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }

    const isPresentInRequiredListButton = unfilledRequiredSignatoryListButton?.list?.find((x) => x[0] === camelize(replaceSpecialCharacters(text)))

    if (isPresentInRequiredListButton) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryListButton?.list?.filter((x) => x?.[0] !== camelize(replaceSpecialCharacters(text)))
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListButtonAction(newUnfilledRequiredFields) as any)
    }
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

      <div className={`relative w-full border border-[#AAAAAA]`}>
        <textarea
          className={`flex w-full  py-1 leading-6 `}
          required={required.toLowerCase() === 'on'}
          placeholder={placeholder}
          title={placeholder}
          onChange={(e) => handleChange(e)}
          maxLength={Number(maximumNumbersOfCharacters)}
          value={value}
          style={{
            height: '9.375rem',
          }}
        ></textarea>
        {maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 text-sm text-[#9ca3af] z-10 bg-white'>
            {value?.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default TextArea
