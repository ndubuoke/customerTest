import { caret } from 'Assets/svgs'
import { AdditionalDetailType, AffiliatedCompanyDetailType } from 'Components/Form/Types/AdditionalTypes'
import React, { useEffect, useState } from 'react'
import FieldLabel from './FieldLabel'

type Props = {
  required: 'on' | 'off'
  label: AdditionalDetailType | AffiliatedCompanyDetailType
  optionsField: Array<string>
  colspan?: number
  setSelectedDropdownItem: (val: string) => void
  selectedDropdownItem: string
}

const AdditionalDropDown = ({ required, label, optionsField, colspan = 1, selectedDropdownItem, setSelectedDropdownItem }: Props) => {
  const [showLists, setShowLists] = useState<boolean>(false)

  const handleSelectedDropdownItem = (selectedItem: string) => {
    setShowLists((prev) => !prev)
    setSelectedDropdownItem(selectedItem.trim())
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
              className='absolute z-50 flex flex-col w-full border rounded-lg top-8 bg-background-paper'
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
    </div>
  )
}

export default AdditionalDropDown
