import { error, GreenCheck, closeRed } from 'Assets/svgs'
import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unfilledRequiredSignatoryListAction } from 'Redux/actions/FormManagement.actions'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'

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
  idPrefiller?: boolean
  loading?: boolean
  success?: boolean
  error?: boolean
}

const TextInput = ({
  id,
  required,
  setValue,
  value,
  text,
  colspan = 1,
  type = 'text',
  placeholder,
  maximumNumbersOfCharacters,
  idPrefiller = false,
  loading = false,
  success = false,
  error = false,
}: Props) => {
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev: any) => ({
      ...prev,
      [text]: e.target.value.trim(),
    }))
    handleRedispatchOfRequiredFields()
  }

  const handleRedispatchOfRequiredFields = () => {
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
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
            {value?.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
        <div className='absolute bottom-2 right-4  z-10 '>
          {loading ? (
            <Spinner size='medium' />
          ) : success ? (
            <GreenCheck />
          ) : error ? (
            <img src={closeRed} alt='error' width={30} height={30} className='w-10 h-10' />
          ) : null}
        </div>
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default TextInput
