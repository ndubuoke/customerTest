import MiniButton from 'Components/Shareables/MiniButton'
import React from 'react'
import { sterlinCombinedLogo } from 'Assets/svgs'
import { customer360Text } from 'Assets/svgs'
import TopNavProfile from './TopNavProfile'
import TopMenuUserSummary from './TopMenuUserSummary'
const reachList = ['new complaint', 'new interaction', 'new appointment'] as const

type ReachType = (typeof reachList)[number]

type Props = {}

const TopNavMenu = (props: Props) => {
  const handleReachClick = (reach: ReachType) => {
    console.log(reach)
  }

  return (
    <section>
      <div className='bg-[#fff] flex justify-between py-2 border-2 border-white'>
        <div className='flex items-center gap-[1.3125rem] '>
          <img src={sterlinCombinedLogo} alt='customer360 logo' />
          <img src={customer360Text} alt='customer360 text' className='text-[1rem]' />
        </div>
        <div className='flex gap-[2.625rem] '>
          {reachList?.map((x) => {
            return <MiniButton key={x} text={x} onClick={() => handleReachClick(x)} />
          })}
        </div>
      </div>
    </section>
  )
}

export default TopNavMenu
