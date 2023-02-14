import { caret, infoVector, redCaret } from 'Assets/svgs'
import React, { useEffect, useState, useRef } from 'react'

type Props = {}

const accountType = [
  {
    account: 'savings tier1',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: 'current tier 1',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
]

const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat']

const date = new Date()

const day = daysOfTheWeek[date.getDay()]
const newDate = date.getDate()
const year = date.getFullYear()

const Customer360Products = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [accountTypeState, setAccountTypestate] = useState([])
  // const scrollBarRef = useRef(null)

  useEffect(() => {
    setAccountTypestate(accountType)
  }, [])

  // const handleNext = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(200, 0)
  // }

  // const handleBackClick = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(-100, 0)
  // }

  return (
    <div className=' min-w-[27.125rem] h-[26.875rem] border-2 border-[#f1ebeb]   mt-4 font-roboto rounded-[.25rem] bg-[#fff] '>
      <header className=' text-[#636363]  border-b-2 border-[#968f8f] p-2 pl-[1.25rem] h-[3.375rem] '>
        <h6 className='capitalize p-2'>products</h6>
      </header>
      <nav className='mt-2 capitalize text-[#8F8F8F] cursor-pointer pl-[1.25rem] mb-[1.5rem]'>
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
      {/* <div className=' flex justify-between my-10 '>
        <img src={caret} alt='caret' className='rotate-90' onClick={handleBackClick} />
        <img src={redCaret} alt='caret' onClick={handleNext} />
      </div> */}
      <div className=' overflow-y-auto w-full py-2 h-[18.9375rem]'>
        {accountTypeState?.length > 0 &&
          accountTypeState?.map((account: any, index: any) => {
            return (
              <div key={index} className=' text-[#636363] min-w-[6rem] border-b border-[#636363] pl-[1.25rem] mb-[1.5rem] pb-[.5rem]'>
                <p className='font-medium text-[1rem] text-[#636363] capitalize'>{account?.account}</p>
                <p>
                  ID: <span>{account?.id}</span>
                </p>
                <p className='text-[1rem] text-[#636363] capitalize'>
                  {account?.date} {newDate} {day} {year}
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Customer360Products
