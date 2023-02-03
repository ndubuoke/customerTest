import { infoVector } from 'Assets/svgs'
import React, { useState } from 'react'

type Props = {}

const Customer360Chart = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('ngn')

  return (
    <div className='w-full max-w-[28.125rem] border-2 border-[#968f8f] p-4  mt-4 font-roboto rounded-[.25rem] bg-[#fff] relative'>
      <header className='flex justify-between text-[#636363]  border-b-2 border-[#968f8f]'>
        <h6 className='capitalize'>overflow/outflow analysis</h6>
        <div className='flex items-center gap-4 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span>view more</span>
        </div>
      </header>

      <nav className='mt-2 uppercase text-[#8F8F8F] cursor-pointer'>
        <ul className='flex gap-4'>
          <li className={`border-b-2  ${activeTab === 'ngn' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('ngn')}>
            ngn
          </li>
          <li className={`border-b-2  ${activeTab === 'usd' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('usd')}>
            usd
          </li>
          <li className={`border-b-2  ${activeTab === 'euro' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('euro')}>
            euro
          </li>
          <li className={`border-b-2  ${activeTab === 'card' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => setActiveTab('card')}>
            card
          </li>
        </ul>
      </nav>
      <div className='text-center mt-8 border-2 h-[14.4256rem]'>Wave Chart here</div>

      <footer className='flex justify-start gap-4 capitalize mt-3 absolute bottom-3'>
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

export default Customer360Chart
