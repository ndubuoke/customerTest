import { profileImage } from 'Assets/images'
import { caret, redCaret, salaryEarners } from 'Assets/svgs'
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
    <div className='min-w-[27.125rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff] z-30 relative'>
      <header className=' text-[#636363] border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'>concession groups</h6>
      </header>
      <div className='absolute w-full px-4 top-[7rem]'>
        <img src={caret} alt='caret' className='rotate-90 absolute left-4 z-30' onClick={handleBackClick} />
        <img src={redCaret} alt='caret' className='absolute right-4 top-[-7.5px] z-30' onClick={handleNext} />
      </div>
      <div className='flex justify-around gap-4 px-6 overflow-x-auto w-full py-2 mt-4' ref={scrollBarRef}>
        {groupData?.length > 0 &&
          groupData?.map((group: any, index: any) => {
            return (
              <div key={index} className='  flex items-center flex-col justify-center gap-2 px-2 w-[5.625rem]'>
                <div>
                  <img src={salaryEarners} alt={group?.type} className='w-[3rem] h-[3rem]' />
                </div>
                <p className='text-sm text-[#96989a] text-center'>{group?.type}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ConsessionGroups
