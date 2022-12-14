import DataListInput from 'react-datalist-input'
import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import { caret, search } from 'Assets/svgs'
import React, { useCallback, useEffect, useState } from 'react'
import FieldLabel from './FieldLabel'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { unfilledRequiredSignatoryListAction } from 'Redux/actions/FormManagement.actions'

type Props = {
  required: 'on' | 'off'
  text: string
  id: SignatoryDetailType
  optionsField: Array<{ label: string; key: string }>
  colspan?: number
  setSelectedDropdownItem: (value: any) => any
  selectedDropdownItem: string
  placeholder: string
}

const SearchAndSelectSignatory = ({
  required,
  text,
  id,
  optionsField,
  colspan = 1,
  selectedDropdownItem,
  setSelectedDropdownItem,
  placeholder,
}: Props) => {
  const dispatch = useDispatch()
  const [showLists, setShowLists] = useState<boolean>(false)

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const onSelect = useCallback((theSelectedItem: { label: string; key: string }) => {
    setSelectedDropdownItem((prev: any) => ({
      ...prev,
      [text]: theSelectedItem.label.trim(),
    }))
    handleRedispatchOfRequiredFields()
  }, [])

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

      <div className='w-full border-b border-b-[#AAAAAA] relative  pl-2'>
        <div className=' w-full   py-1 pl-2 ml-1`'>
          <DataListInput
            placeholder={selectedDropdownItem || placeholder}
            items={optionsField}
            onSelect={(theSelectedItem: { label: string; key: string }) => {
              onSelect(theSelectedItem)
            }}
            value={selectedDropdownItem ? selectedDropdownItem : ''}
          />
        </div>
        <span
          className='absolute z-50 -left-1   h-full pt-4'
          style={{
            top: '-6px',
            right: '4.7px',
            pointerEvents: 'none',
          }}
        >
          <img src={search} width={15} height={10} />
        </span>
        <span
          className='absolute z-50 -right-1   h-full pt-4'
          style={{
            top: '-6px',
            right: '4.7px',
            pointerEvents: 'none',
          }}
        >
          <img src={caret} width={15} height={10} />
        </span>
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default SearchAndSelectSignatory
