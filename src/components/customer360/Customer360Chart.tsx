import { infoVector } from 'Assets/svgs'
import React, { useState } from 'react'
import WaveChart from './WaveChart'

type Props = {}

const Customer360Chart = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('ngn')

  return (
    <div className='min-w-[27.125rem] h-[26.875rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff] relative'>
      <header className='flex justify-between text-[#636363]  border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'>overflow/outflow analysis</h6>
        <div className='flex items-center gap-2 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /><span className='text-sm'>view more</span>
        </div>
      </header>
      <nav className='mt-2 uppercase text-sm text-[#8F8F8F] px-4 cursor-pointer'>
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
      <div className='text-center mt-8 px-4 h-[14.4256rem]'>
        <WaveChart />
      </div>

      <footer className='flex justify-start gap-4 px-4 capitalize absolute bottom-3'>
        <div className='flex items-center gap-3'>
          {' '}
          <p className='w-[.5625rem] h-[.5625rem] bg-[#F94144] rounded-[50%]'></p> <span className='text-sm'>cash outflow</span>
        </div>
        <div className='flex items-center gap-3'>
          {' '}
          <p className='w-[.5625rem] h-[.5625rem] bg-[#F8961E] rounded-[50%]'></p> <span className='text-sm'>cash inflow</span>
        </div>
      </footer>
    </div>
  )
}

export default Customer360Chart
