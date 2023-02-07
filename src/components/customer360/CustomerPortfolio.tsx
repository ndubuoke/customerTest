import React, { useEffect, useState } from 'react'
import { infoVector } from 'Assets/svgs'
import DonoughtChart from './DonoughtChart'

type Props = {
  //   type: 'all' | 'deposit' | 'loan' | 'investment'
}

const CustomerPortfolio = (Props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <div className='min-w-[27.125rem] h-[26.875rem] border-2 border-[#968f8f] p-2  mt-4 font-roboto rounded-[.25rem] bg-[#fff] relative mx-3'>
      <header className='flex justify-between text-[#636363]  border-b-2 border-[#968f8f] p-2'>
        <h6 className='capitalize'> customer portfolio</h6>
        <div className='flex items-center gap-4 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span>view more</span>
        </div>
      </header>
      <nav className='mt-2 capitalize text-[#8F8F8F] cursor-pointer'>
        <ul className='flex gap-4'>
          <li className={`border-b-2  ${activeTab === 'all' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('all')}>
            all
          </li>
          <li className={`border-b-2  ${activeTab === 'deposit' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('deposit')}>
            deposit
          </li>
          <li className={`border-b-2  ${activeTab === 'loan' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('loan')}>
            loan
          </li>
          <li
            className={`border-b-2  ${activeTab === 'investment' ? 'border-[#CF2A2A] text-[#636363]' : null}`}
            onClick={() => setActiveTab('investment')}
          >
            investment
          </li>
        </ul>
      </nav>

      <div className='mt-[2.125rem]'>
        <p className='text-[1.5rem] text-[#636363]'>
          <sup className='text-[#4F4F4F] text-[.75rem]'>NGN</sup> 100,000,000.00
        </p>
      </div>

      {/* Circle that displays deposit loan and investment percentage */}

      <div className='h-[120px] w-[120px] border-2 border-[red] m-auto rounded-[50%]'></div>

      <footer className='flex justify-center gap-4 capitalize mt-3 absolute bottom-3 w-full'>
        <div className='flex items-center gap-3'>
          <p className='w-[.5625rem] h-[.5625rem] bg-[#837777] rounded-[50%]'></p> <span>deposit</span>
        </div>

        <div className='flex items-center gap-3'>
          {' '}
          <p className='w-[.5625rem] h-[.5625rem] bg-[#F94144] rounded-[50%]'></p> <span>loan</span>
        </div>
        <div className='flex items-center gap-3'>
          {' '}
          <p className='w-[.5625rem] h-[.5625rem] bg-[#F8961E] rounded-[50%]'></p> <span>Investment</span>
        </div>
      </footer>
    </div>
  )
}

export default CustomerPortfolio
