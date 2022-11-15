import { caret } from 'Assets/svgs'
import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { PageInstance } from '../Types'

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
      className={`cursor-pointer w-[150px] flex flex-col items-center gap-4 text-center relative z-10 after:absolute after:w-[100%] after:left-[50%] after:bg-[#696767] after:h-[7px] after:top-[18%] after:-z-[2]  ${
        index === 1 ? 'after:w-[100%]' : ''
      } ${last ? 'after:w-0' : '0'}  text-[#636363] text-[12px] font-[700]  `}
      onClick={() => onClick(index)}
    >
      <div
        className={` w-[30px] h-[30px] rounded-full  text-[#636363]  border-4 ${
          isActive ? ' border-[#636363]' : 'border-green-700'
        }  flex justify-center items-center bg-white`}
      >
        {index + 1}
      </div>

      <div className='flex flex-col items-center gap-2 uppercase'>
        <div className='rotate-180 opacity-[0.2]'>
          <img src={caret} width={10} height={10} />
        </div>
        {getProperty(page?.pageProperties, 'Page name', 'value').text}
      </div>
    </div>
  )
}

export default StepNumbers
