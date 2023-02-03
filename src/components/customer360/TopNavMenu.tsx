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

  // fixed w-[95%] bg-white py-2 m-auto
  return (
    <section className=' '>
      <div className=' bg-[#fff] flex flex-col justify-between  '>
        <div className='flex gap-[1.5rem] absolute w-[8.4375rem]  left-[4.4375rem] top-[1.9375rem]'>
          <img src={sterlinCombinedLogo} alt='customer360 logo' />
          <img src={customer360Text} alt='customer360 text' className=' absolute top-[2rem] left-[10.2rem] w-[7.3125rem]' />
        </div>
        <div className='flex justify-end gap-[2.625rem] mt-[2rem] mr-[2rem]'>
          {reachList?.map((x) => {
            console.log(x)
            return <MiniButton key={x} text={x} onClick={() => handleReachClick(x)} />
          })}
        </div>
      </div>
    </section>
  )
}

export default TopNavMenu
