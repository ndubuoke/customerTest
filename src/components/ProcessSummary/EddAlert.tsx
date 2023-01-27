import { danger, Close, returnIcon, greaterThanRed, exclamationYellow } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  proceedToProcessSummary: () => void
}

const EDDAlert = ({ closeModalFunction, proceedToProcessSummary }: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[25rem] max-w-[34.6875rem] min-h-[13.9375rem] h-[25.5rem] rounded-[.5rem] py-6 px-6 flex flex-col gap-6 justify-between'>
        <div className='relative flex justify-center'>
          <div>
            <img src={exclamationYellow} width={80} height={80} alt='edd alert' />
          </div>
          <button onClick={closeModalFunction} className='absolute right-0 top-1'>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className=' text-[#636363]  '>
          <p className='text-[1.5rem] leading-[1.875rem] text-center'>
            Enhanced Due Dilligence Check Will Be Initiated After Documentation Waiver Approval{' '}
          </p>
          <p className='text-[1.25rem] leading-[1.5rem] text-center my-4'>Click on the Waive option below to skip EDD check for this customer</p>
        </div>
        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button className='  flex items-center justify-center text-[#667085]' onClick={closeModalFunction}>
            <img src={returnIcon} width={30} height={26} alt='return to modify' />
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Waive EDD</span>
          </button>
          <button className='flex items-center justify-center text-white ' onClick={proceedToProcessSummary}>
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Proceed with request</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </div>
      </section>
    </aside>
  )
}

export default EDDAlert
