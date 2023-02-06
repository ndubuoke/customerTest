import React, { useState } from 'react'
import { BiCertification } from 'react-icons/bi'

type Props = {}

const RewardPoints = (props: Props) => {
  const [point, setPoint] = useState(100)
  return (
    <div className='w-full max-w-[27.125rem] border-2 border-[#f1ebeb] px-2  mt-4 font-roboto rounded-[.25rem] bg-[#fff] z-30 relative'>
      <header className=' text-[#636363]  border-b-2 border-[#968f8f] p-2'>
        <h6 className='capitalize'>concession groups</h6>
      </header>
      <div className='absolute bottom-0 right-0 left-0 top-[4rem] border-2  flex items-center pl-[2rem] gap-6'>
        <span>
          <BiCertification className='w-[6rem] h-[6rem] fill-[gray]' />
        </span>{' '}
        <span className='text-[#636363] font-bold'>{point} Points</span>
      </div>
    </div>
  )
}

export default RewardPoints
