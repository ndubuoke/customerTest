import { profileImage } from 'Assets/images'
import { caret, redCaret } from 'Assets/svgs'
import React, { useState, useEffect, useRef } from 'react'

type Props = {}
const groups = [
  {
    type: 'Salary Earners',
  },
  {
    type: 'SME Savings',
  },
  {
    type: 'SME Savings',
  },
  {
    type: 'SME Savings',
  },
  {
    type: 'SME Savings',
  },
  {
    type: 'SME Savings',
  },
  {
    type: 'Government Agencies',
  },
]

const ConsessionGroups = (props: Props) => {
  const [groupData, setGroupData] = useState([])
  const scrollBarRef = useRef(null)

  useEffect(() => {
    setGroupData(groups)
  }, [])

  const handleBackClick = () => {
    let value = scrollBarRef.current
    value.scrollTo(-100, 0)
  }

  const handleNext = () => {
    let value = scrollBarRef.current
    value.scrollTo(200, 0)
  }

  return (
    <div className='min-w-[27.125rem] border-2 border-[#f1ebeb] px-2  mt-4 font-roboto rounded-[.25rem] bg-[#fff] z-30 relative'>
      <header className=' text-[#636363]  border-b-2 border-[#968f8f] p-2'>
        <h6 className='capitalize'>concession groups</h6>
      </header>
      <div className=' '>
        <img src={caret} alt='caret' className='rotate-90 absolute left-0 top-[10rem] z-30 px-1' onClick={handleBackClick} />
        <img src={redCaret} alt='caret' className='absolute right-0 top-[10rem] z-30 px-1' onClick={handleNext} />
      </div>
      <div className=' flex justify-between gap-4 overflow-x-auto w-full py-2 mt-4  absolute bottom-0' ref={scrollBarRef}>
        {groupData?.length > 0 &&
          groupData?.map((group: any, index: any) => {
            return (
              <div key={index} className='  flex items-center flex-col justify-center gap-2 px-2 pt-6 '>
                <div>
                  <img src={profileImage} alt={group?.type} className='w-[3rem] h-[3rem]' />
                </div>
                <p className='text-center'>{group?.type}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ConsessionGroups
