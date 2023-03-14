import { rewardVctor } from 'Assets/svgs'
import React, { useState } from 'react'
import { BiCertification } from 'react-icons/bi'

type Props = {}

const RewardPoints = (props: Props) => {
  const [point, setPoint] = useState(100)
  return (
    <div className='min-w-[27.125rem] mt-4 font-roboto rounded-[.25rem] bg-[#fff] z-30 relative'>
      <header className=' text-[#636363] border-b border-[#cccccc] p-3'>
        <h6 className='text-base capitalize'>Reward Points</h6>
      </header>
      <div className='absolute bottom-0 right-0 left-0 top-[4rem] flex items-center pl-[2rem] gap-6'>
        <span>
          <img src={rewardVctor} alt='reward' />{' '}
        </span>{' '}
        <span className='text-[#636363] font-bold'>{point} Points</span>
      </div>
    </div>
  )
}

export default RewardPoints
