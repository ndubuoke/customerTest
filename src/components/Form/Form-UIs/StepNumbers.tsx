import { DownRedCaret } from 'Assets/svgs'
import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { PageInstance } from '../Types'
import { secondsInDay } from 'date-fns'

type Props = {
  page: PageInstance
  index: number
  last: boolean
  onClick: (val: number) => void
  isActive: boolean
}

const StepNumbers = ({ page, index, last, onClick, isActive }: Props) => {
  return (
    <div
      className={`cursor-pointer w-[10.375rem] flex flex-col items-center  text-center relative z-10 after:absolute  after:left-[50%] after:bg-[#CCCCCC] after:h-[.1rem] after:top-[33%] after:-z-[2]  ${
        index === 1 ? 'after:w-[100%]' : ''
      } ${last ? '' : 'after:w-[100%]'}  text-[#636363] text-[.75rem] font-[300]  `}
      onClick={() => onClick(index)}
    >
      {/* {isActive ? (
        <div className='rotate-360 opacity-[0.2]'>
          <img src={caret} width={10} height={10} />
        </div>
      ) : (
        ''
      )} */}
      <div className={`rotate-360  ${isActive === false ? 'opacity-[-2]' : ''}`}>
        <img src={DownRedCaret} width={10} height={10} />
      </div>

      <div
        className={` w-[1.875rem] h-[1.875rem] rounded-full   text-[#636363]  border-4 ${
          isActive ? ' border-green-700' : 'border-[#636363]'
        }  flex justify-center items-center bg-white`}
        style={{
          margin: '0.5rem 0 1rem 0',
        }}
      >
        {index + 1}
      </div>
      <div></div>
      <div className='flex flex-col items-center gap-2 uppercase'>{getProperty(page?.pageProperties, 'Page name', 'value').text}</div>
    </div>
  )
}

export default StepNumbers
