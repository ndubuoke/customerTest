import React from 'react'
import { caret } from 'Assets/svgs';

type props = {
  fieldlabel: string
}

const SearchAndSelect = ({ fieldlabel }: props) => {
  return (
    <div className='w-full p-1 '>
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <label className='capitalize text-[#636363] '>{fieldlabel}</label>
      </div>
      <div className='w-full  relative  '>
        <div className='flex absolute inset-y-0 left-0 items-center pointer-events-none '>
          <svg className='w-5 h-5 text-gray-500 ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <button className='flex items-center justify-between w-full gap-6 py-2 leading-6 border-b pl-6 border-b-text-secondary' title={''}>
          <div className={`text-text-disabled capitalize`}></div>
          <span>
            <img src={caret} width={15} height={10} />
          </span>
        </button>
      </div>
    </div>
  )
}

export default SearchAndSelect
