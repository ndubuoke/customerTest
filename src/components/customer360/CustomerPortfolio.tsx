import React, { useState } from 'react'
import { infoVector } from 'Assets/svgs'

type Props = {
  //   type: 'all' | 'deposit' | 'loan' | 'investment'
  activeTab: any
  setActiveTab: any
}

const CustomerPortfolio = ({ activeTab, setActiveTab }: Props) => {
  //   const [activeTab, setactiveTab] = useState<string>('')
  return (
    <div className='w-[28.125rem] border-2 border-[#968f8f] p-2 py-6 mt-4 font-roboto rounded-[.25rem] bg-[#fff]'>
      <header className='flex justify-between text-[#636363]  border-b-2 border-[#968f8f]'>
        <h6> customer portfolio</h6>
        <div className='flex items-center gap-4 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span>view more</span>
        </div>
      </header>
      {/* 'border-b-2  active:border-[#CF2A2A] hover:text-[#636363] ' */}
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

      <div className='h-[135px] w-[135px] rounded-[50%] my-6 border-2 border-[red] m-auto'></div>

      <footer className='flex justify-center gap-4 capitalize'>
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
