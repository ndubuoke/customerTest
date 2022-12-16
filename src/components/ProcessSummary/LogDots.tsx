import React from 'react'

type Props = {}

const LogDots = () => {
  return (
    <div className='flex flex-col gap-1 items-center'>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full'></div>
      <div className='border border-[#636363] rounded-full w-[24px] h-[24px] min-w-[24px] min-h-[24px] flex items-center justify-center'>
        <div className='border border-[#aaaaaa]  rounded-full min-w-[19px] min-h-[19px] w-[19px] h-[19px]'></div>
      </div>
    </div>
  )
}

export default LogDots
