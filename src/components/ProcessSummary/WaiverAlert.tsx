import { danger, Close, returnIcon, greaterThanRed } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  proceedToProcessSummary: () => void
}

const WaiverAlert = ({ closeModalFunction, proceedToProcessSummary }: Props) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[400px] max-w-[555px] min-h-[223px] h-[408px] rounded-[8px] py-6 px-6 flex flex-col gap-6 justify-between'>
        <div className='flex justify-center relative'>
          <div>
            <img src={danger} width={80} height={80} alt='danger' />
          </div>
          <button onClick={closeModalFunction} className='absolute top-1 right-0'>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className=' text-[#636363]  '>
          <p className='text-[24px] leading-[30px] text-center'>Required Document Missing </p>
          <p className='text-[20px] leading-[24px] text-center my-4'>Documentation waiver would be required to complete customer creation</p>
        </div>
        <div className='flex justify-between font-medium text-[base] leading-[24px]'>
          <button className='  flex items-center justify-center text-[#667085]' onClick={closeModalFunction}>
            <img src={returnIcon} width={30} height={26} alt='return to modify' />
            <span className='text-[#667085] text-[16px] leading-[19px] mx-4'>Return to modify</span>
          </button>
          <button className=' flex items-center justify-center text-white' onClick={proceedToProcessSummary}>
            <span className='text-[#667085] text-[16px] leading-[19px] mx-4'>Proceed</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </div>
      </section>
    </aside>
  )
}

export default WaiverAlert
