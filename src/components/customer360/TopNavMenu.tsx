import MiniButton from 'Components/Shareables/MiniButton'
import React from 'react'

const reachList = ['new complaint', 'new interaction', 'new appointment'] as const

type ReachType = typeof reachList[number]

type Props = {}

const TopNavMenu = (props: Props) => {
  const handleReachClick = (reach: ReachType) => {
    console.log(reach)
  }
  return (
    <section className='bg-white h-[20rem] flex flex-col gap-6 shadow-sm rounded-lg'>
      <div className='flex justify-between'>
        <div>Logo</div>
        <div>
          {reachList?.map((x) => {
            return <MiniButton key={x} text={x} onClick={() => handleReachClick(x)} />
          })}
        </div>
      </div>
      <div>Down</div>
    </section>
  )
}

export default TopNavMenu
