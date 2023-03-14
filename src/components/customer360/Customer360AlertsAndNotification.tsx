import { ExclaimateIcon, exclamationYellow, infoVector, redinfo } from 'Assets/svgs'
import React, { useEffect, useState } from 'react'

type Props = {}

const customerInfo = [
  {
    text: 'Customer ID expired',
  },
  {
    text: 'Complaint Issued',
  },
  {
    text: 'Complaint Issued',
  },
  {
    text: 'Complaint Issued',
  },
]

const Customer360AlertsAndNotification = (props: Props) => {
  const [accountInfo, setAccountInfo] = useState([])

  useEffect(() => {
    setAccountInfo(customerInfo)
  }, [])
  return (
    <div className='min-w-[27.125rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff] '>
      <header className='flex justify-between text-[#636363]  border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'> Alerts & Notifications</h6>
        <div className='flex items-center gap-2 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /><span className='text-sm'>view more</span>
        </div>
      </header>
      <div className='pb-3 pl-[2rem]'>
        {accountInfo?.length > 0 &&
          accountInfo?.map((details: any, index: any) => {
            return (
              <div key={index} className='flex items-center gap-8    pt-[2.375rem]'>
                <img src={redinfo} alt='exclamation' className='w-[.9375rem] h-[.9375rem]' />

                {/* <span>{ExclaimateIcon}</span> */}
                <p className='text-[#636363] text-[1rem]'>{details?.text}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Customer360AlertsAndNotification
