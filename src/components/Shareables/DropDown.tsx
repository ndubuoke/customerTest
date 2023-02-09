import React, { useState } from 'react'
import { caret } from 'Assets/svgs'

type Props = {
  options: Array<string>
  defaultOption?: string
  getValue: (val: any) => void
}

const DropDown = ({ options, defaultOption = '', getValue }: Props) => {
  const [value, setValue] = useState<string>(defaultOption)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  return (
    <div className='relative w-full cursor-pointer'>
      <div
        className='w-full flex justify-between py-1 leading-6 border-b border-[#96989A] text-text-disabled '
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className=''>{value ? <span className='uppercase'>{value}</span> : 'Select'}</span>
        <img src={caret} width={15} height={10} />
      </div>

      {showDropdown ? (
        <div
          className='absolute w-3/4 uppercase rounded-lg top-[2.1rem] text-text-secondary bg-[#fff] '
          style={{
            borderRadius: '0 0 8px 8px',

            overflow: 'hidden',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          {options.map((x, i) => {
            return (
              <div
                key={i}
                className={`hover:bg-[#FFD4D2]    border-[#EBE9E9]    p-1
                ${value === x ? 'bg-background-dark' : 'bg-inherit'} `}
                onClick={() => {
                  setValue(x)
                  getValue(x)
                  setShowDropdown((prev) => !prev)
                }}
              >
                {x}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default DropDown
