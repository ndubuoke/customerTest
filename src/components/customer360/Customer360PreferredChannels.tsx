import { atm, internetBanking, phone, pos } from 'Assets/images'
import { caret, infoVector, redCaret } from 'Assets/svgs'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const channelList = [
  {
    title: 'Moile App',
    icon: phone,
    percentage: 60 + '%',
  },
  {
    title: 'Internet Banking',
    icon: internetBanking,
    percentage: 23 + '%',
  },
  {
    title: 'ATM',
    icon: atm,
    percentage: 10 + '%',
  },
  {
    title: 'P.O.S',
    icon: pos,
    percentage: 4 + '%',
  },
  {
    title: 'P.O.S',
    icon: pos,
    percentage: 4 + '%',
  },
  {
    title: 'P.O.S',
    icon: pos,
    percentage: 4 + '%',
  },
]

const Customer360PreferredChannels = (props: Props) => {
  const [preferredChannelList, setPreferredChannelList] = useState([])
  // const scrollBarRef = useRef(null)

  useEffect(() => {
    setPreferredChannelList(channelList)
  }, [])

  // const handleBackClick = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(200, 0)
  // }

  // const handleNext = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(-100, 0)
  // }
  return (
    <div className='min-w-[28.125rem] h-[26.875rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff] relative'>
      <header className='flex justify-between text-[#636363]  border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'> preferred channels</h6>
        <div className='flex items-center gap-2 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span className='text-sm'>view more</span>
        </div>
      </header>
      {/* <div>
        <img src={caret} alt='caret' className='rotate-90 absolute left-0 top-[10rem] z-30 px-2' onClick={handleNext} />
        <img src={redCaret} alt='caret' className='absolute right-0 top-[10rem] z-30 px-2' onClick={handleBackClick} />
      </div> */}
      <div className='flex gap-x-[2.2862rem] gap-y-[2.3125rem] justify-around flex-wrap pt-[3.625rem] pb-[1.625rem] overflow-y-auto'>
        {preferredChannelList.length > 0 &&
          preferredChannelList?.map((channelList: any, index: any) => {
            return (
              <div key={index} className='w-[8rem] flex items-center flex-col '>
                <h6 className='text-[1rem] text-[red]'>{channelList?.percentage}</h6>
                <div>
                  <img src={channelList?.icon} alt={channelList?.title} className='w-[2.5rem] h-[2.5rem]' />
                </div>
                <p className='w-[2.6rem] text-[#636363] text-[1rem]'>{channelList?.title}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Customer360PreferredChannels
