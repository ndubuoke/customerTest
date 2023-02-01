import { Plus } from 'Assets/svgs'
import React from 'react'

type Props = {
  onClick: () => any
  text: string
}

const MiniButton = ({ onClick, text }: Props) => {
  console.log({ text })
  return (
    <button
      className='flex cursor-pointer  rounded-md justify-between px-2 items-center
py-1'
      onClick={onClick}
    >
      <span>
        <img src={Plus} className='w-6 h-6' />
      </span>
      <div>
        {/* {selectedList} */}
        {/* <span className={`text-white`}>{text}</span> */}
      </div>
    </button>
  )
}

export default MiniButton
