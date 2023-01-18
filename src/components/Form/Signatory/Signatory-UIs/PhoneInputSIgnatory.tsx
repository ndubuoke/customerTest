import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
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
  type?: 'tel'
  placeholder: string
  maximumNumbersOfCharacters: number
}

const PhoneInputSignatory = ({ id, required, setValue, value, text, colspan = 1, type = 'tel', placeholder, maximumNumbersOfCharacters }: Props) => {
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType
  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const handleChange = (phone: string) => {
    setValue((prev: any) => ({
      ...prev,
      [camelize(replaceSpecialCharacters(text))]: phone,
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
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default PhoneInputSignatory
