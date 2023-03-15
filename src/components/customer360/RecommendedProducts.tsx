import { caret, infoVector, redCaret, savingsTier1 } from 'Assets/svgs'
import React, { useEffect, useState, useRef } from 'react'

type Props = {}

const accountType = [
  {
    account: 'savings tier1',
  },
  {
    account: 'current tier 1',
  },
  // {
  //   account: '  savings for salary earners',
  // },
  // {
  //   account: 'savings tier1',
  // },
  // {
  //   account: 'current tier 1',
  // },
  {
    account: 'savings for salary earners',
  },
]

const RecommendedProducts = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [accountTypeState, setAccountTypestate] = useState([])
  const scrollBarRef = useRef(null)

  useEffect(() => {
    setAccountTypestate(accountType)
  }, [])

  const handleNext = () => {
    // const lastIndex = accountTypeState.length - 1
    let value = scrollBarRef.current
    value.scrollTo(200, 0)
  }

  const handleBackClick = () => {
    let value = scrollBarRef.current
    value.scrollTo(-100, 0)
  }

  return (
    <div className='relative min-w-[27.125rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff]'>
      <header className='text-[#636363]  border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'>recommended products</h6>
      </header>
      <nav className='mt-2 capitalize px-4 text-[#8F8F8F] cursor-pointer'>
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
      <div className='absolute w-full px-4 top-[8rem]'>
        <img src={caret} alt='caret' className='rotate-90 absolute left-4 z-30' onClick={handleBackClick} />
        <img src={redCaret} alt='caret' className='absolute right-4 top-[-7.5px] z-30' onClick={handleNext} />
      </div>
      <div className='flex justify-around gap-4 px-12 overflow-x-auto w-full py-6' ref={scrollBarRef}>
        {accountTypeState?.length > 0 &&
          accountTypeState?.map((account: any, index: any) => {
            return (
              <div key={index} className=' text-[#636363] min-w-[6rem] flex items-center flex-col'>
                <div>
                  <img src={savingsTier1} alt='savings icon' className='mb-3' />
                </div>
                <span className='capitalize text-[.85rem]  text-center'>{account?.account}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default RecommendedProducts
