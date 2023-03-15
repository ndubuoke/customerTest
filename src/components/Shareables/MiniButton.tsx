import { plusIcon } from 'Assets/svgs'
import { ReactNode } from 'react'

type Props = {
  onClick: () => any
  text: string
  children?: ReactNode
}

const MiniButton = ({ onClick, text, children }: Props) => {
  console.log({ text })
  return (
    <button
      className='flex  cursor-pointer  px-2 items-center
py-1'
      onClick={onClick}
    >
      <span className='flex items-center gap-[.5rem] capitalize'>
        {!children && <img src={plusIcon} className='w-[.625rem] h-[.625rem] fill-[#CF2A2A]' />}
        { children }
        <span className='text-[1rem] font-medium'>{text}</span>
      </span>

      {/* {selectedList} */}
      {/* <span className={` capitalize text-[#636363]`}>{text}</span> */}
    </button>
  )
}

export default MiniButton
