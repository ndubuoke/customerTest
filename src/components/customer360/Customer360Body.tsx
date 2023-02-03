import React, { useState } from 'react'
import BodyNav from './BodyNav'
import Customer360Chart from './Customer360Chart'
import Customer360RecentTransaction from './Customer360RecentTransaction'
import CustomerPortfolio from './CustomerPortfolio'
import TopMenuUserSummary from './TopMenuUserSummary'
import TopNavMenu from './TopNavMenu'

type Props = {}

const Customer360Body = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('overview') as any
  return (
    <div className='bg-[#fff]   w-[88.375rem] m-auto '>
      <div>
        <TopNavMenu />
      </div>
      <TopMenuUserSummary />
      <BodyNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className=' bg-[#EFEFEF] flex justify-between px-2'>
        <CustomerPortfolio />
        <Customer360Chart />
        <Customer360RecentTransaction />
      </div>
    </div>
  )
}

export default Customer360Body
