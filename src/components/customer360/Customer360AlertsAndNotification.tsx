import { ExclaimateIcon, exclamationYellow, infoVector } from 'Assets/svgs'
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
    <div className='min-w-[27.125rem] border-2 border-[#f1ebeb] p-2  mt-4 font-roboto rounded-[.25rem] bg-[#fff] '>
      <header className='flex justify-between text-[#636363]  border-b-2 border-[#968f8f] p-2'>
        <h6 className='capitalize '> Alerts & Notifications</h6>
        <div className='flex items-center gap-4 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span>view more</span>
        </div>
      </header>
      <div className='py-3 pl-[2rem]'>
        {accountInfo?.length > 0 &&
          accountInfo?.map((details: any, index: any) => {
            return (
              <div key={index} className='flex items-center gap-8  my-3'>
                <img src={exclamationYellow} alt='exclamation' className='w-[.9rem] h-[.9rem]' />

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
