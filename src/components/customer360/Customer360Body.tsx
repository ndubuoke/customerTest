import React, { useState } from 'react'
import BodyNav from './BodyNav'
import ConsessionGroups from './ConsessionGroups'
import Customer360AlertsAndNotification from './Customer360AlertsAndNotification'
import Customer360Chart from './Customer360Chart'
import Customer360PreferredChannels from './Customer360PreferredChannels'
import Customer360Products from './Customer360Products'
import Customer360RecentTransaction from './Customer360RecentTransaction'
import CustomerPortfolio from './CustomerPortfolio'
import RecommendedProducts from './RecommendedProducts'
import RewardPoints from './RewardPoints'
import TopMenuUserSummary from './TopMenuUserSummary'
import TopNavMenu from './TopNavMenu'

type Props = {}

const Customer360Body = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('overview') as any
  return (
    <div className=' bg-[rgba(239,239,239,0.5)] h-[45.6875rem] overflow-y-auto '>
      <TopMenuUserSummary />
      <BodyNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className=' grid grid-cols-3 px-2 gap-[1rem]'>
        <CustomerPortfolio />
        <Customer360Chart />
        <Customer360RecentTransaction />
      </div>
      <div className=' grid grid-cols-3 px-2 gap-[1rem]'>
        <Customer360Products />
        <Customer360PreferredChannels />
        <Customer360AlertsAndNotification />
      </div>
      <div className=' grid grid-cols-3 px-2 gap-[1rem]'>
        <ConsessionGroups />
        <RecommendedProducts />
        <RewardPoints />
      </div>
    </div>
  )
}

export default Customer360Body
