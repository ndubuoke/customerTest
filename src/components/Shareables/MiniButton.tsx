import { plusIcon } from 'Assets/svgs'
import React from 'react'

type Props = {
  onClick: () => any
  text: string
}

const MiniButton = ({ onClick, text }: Props) => {
  console.log({ text })
  return (
    <button
      className='flex  cursor-pointer  px-2 items-center
py-1'
      onClick={onClick}
    >
      <span className='flex items-center gap-[.5rem] capitalize'>
        <img src={plusIcon} className='w-[.625rem] h-[.625rem] fill-[#CF2A2A]' />
        <span>{text}</span>
      </span>

      {/* {selectedList} */}
      {/* <span className={` capitalize text-[#636363]`}>{text}</span> */}
    </button>
  )
}

export default MiniButton
