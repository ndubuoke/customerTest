import React from 'react'

type Props = {}

const LogDots = () => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[.25rem] h-[.25rem] bg-[#aaaaaa] rounded-full'></div>
      <div className='border border-[#636363] rounded-full w-[1.5rem] h-[1.5rem] min-w-[1.5rem] min-h-[1.5rem] flex items-center justify-center'>
        <div className='border border-[#aaaaaa]  rounded-full min-w-[1.1875rem] min-h-[1.1875rem] w-[1.1875rem] h-[1.1875rem]'></div>
      </div>
    </div>
  )
}

export default LogDots
