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
    <div className=' bg-[rgba(239,239,239,0.5)] h-[45.6875rem] overflow-y-auto '>
      <TopMenuUserSummary />
      <BodyNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='  flex justify-between px-2 gap-[1.75rem] '>
        <CustomerPortfolio />
        <Customer360Chart />
        <Customer360RecentTransaction />
      </div>
    </div>
  )
}

export default Customer360Body
