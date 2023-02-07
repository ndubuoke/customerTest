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
  {
    title: 'Chartbot',
    icon: pos,
    percentage: 2 + '%',
  },
]

const Customer360PreferredChannels = (props: Props) => {
  const [preferredChannelList, setPreferredChannelList] = useState([])
  const scrollBarRef = useRef(null)

  useEffect(() => {
    setPreferredChannelList(channelList)
  }, [])

  const handleBackClick = () => {
    let value = scrollBarRef.current
    value.scrollTo(200, 0)
  }

  const handleNext = () => {
    let value = scrollBarRef.current
    value.scrollTo(-100, 0)
  }
  return (
    <div className='min-w-[28.125rem] border-2 border-[#f1ebeb] p-2  mt-4 font-roboto rounded-[.25rem] bg-[#fff] relative'>
      <header className='flex justify-between text-[#636363]  border-b-2 border-[#968f8f] p-2'>
        <h6 className='capitalize'> preferred channels</h6>
        <div className='flex items-center gap-4 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /> <span>view more</span>
        </div>
      </header>
      <div>
        <img src={caret} alt='caret' className='rotate-90 absolute left-0 top-[10rem] z-30 px-2' onClick={handleNext} />
        <img src={redCaret} alt='caret' className='absolute right-0 top-[10rem] z-30 px-2' onClick={handleBackClick} />
      </div>
      <div className='flex justify-between gap-2  overflow-x-auto w-full py-2 absolute bottom-0 left-0 right-0' ref={scrollBarRef}>
        {preferredChannelList.length > 0 &&
          preferredChannelList?.map((channelList: any, index: any) => {
            return (
              <div key={index} className='capitalize text-[.85rem] flex  flex-col items-center justify-around gap-2 px-4 '>
                <h6 className='text-[1rem] text-[red]'>{channelList?.percentage}</h6>
                <div>
                  <img src={channelList?.icon} alt={channelList?.title} className='w-[2.6rem] h-[2.6rem]' />
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
