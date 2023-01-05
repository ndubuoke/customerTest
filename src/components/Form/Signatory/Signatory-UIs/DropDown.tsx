import { caret } from 'Assets/svgs'
import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect, useState } from 'react'
import FieldLabel from './FieldLabel'
import { ReducersType } from 'Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { unfilledRequiredSignatoryListAction, unfilledRequiredSignatoryListButtonAction } from 'Redux/actions/FormManagement.actions'

type Props = {
  required: 'on' | 'off'
  text: string
  id: SignatoryDetailType
  optionsField: Array<string>
  colspan?: number
  setSelectedDropdownItem: (value: any) => any
  selectedDropdownItem: string
}

const SignatoryDropDown = ({ required, text, id, optionsField, colspan = 1, selectedDropdownItem, setSelectedDropdownItem }: Props) => {
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const [showLists, setShowLists] = useState<boolean>(false)

  const handleSelectedDropdownItem = (selectedItem: string) => {
    setShowLists((prev) => !prev)
    setSelectedDropdownItem((prev: any) => ({
      ...prev,
      [text]: selectedItem.trim(),
    }))
    // handleRedispatchOfRequiredFields()
  }

  const handleRedispatchOfRequiredFields = () => {
    // console.log({ text, unfilledRequiredSignatoryList })
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }

    const isPresentInRequiredListButton = unfilledRequiredSignatoryListButton?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredListButton) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryListButton?.list?.filter((x) => x?.[0] !== text)
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

      <div className={`relative`}>
        <div
          className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA] cursor-pointer'
          onClick={() => setShowLists((prev) => !prev)}
          title={selectedDropdownItem && selectedDropdownItem}
        >
          <div className='overflow-hidden'>
            {selectedDropdownItem ? (
              typeof selectedDropdownItem !== 'string' ? (
                [].concat(selectedDropdownItem).toString()
              ) : (
                selectedDropdownItem
              )
            ) : (
              <span className={`text-text-disabled`}>Select</span>
            )}
          </div>

          <span>
            <img src={caret} width={15} height={10} />
          </span>

          {showLists && (
            <div
              className='absolute w-full top-8 bg-background-paper   flex flex-col z-50 border rounded-lg'
              style={{
                zIndex: 999,
              }}
            >
              {optionsField?.length > 0
                ? optionsField?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-red-200 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-red-200' : ''} `}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectedDropdownItem(selected)
                        }}
                      >
                        {selected.trim()}
                      </div>
                    )
                  })
                : null}
            </div>
          )}
        </div>
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default SignatoryDropDown
