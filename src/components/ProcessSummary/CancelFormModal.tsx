import { danger, Close } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  cancelFormCreation: () => void
}

const CancelFormModal = ({ closeModalFunction, cancelFormCreation }: Props) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[400px] w-[400px] min-h-[223px] h-[223px] rounded-[8px] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>
            <img src={danger} width={30} height={30} alt='danger' />
          </div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className='py-3 text-[18px] leading-[28px] text-[#333333] font-medium  '>Do you want to cancel customer creation?</div>
        <div className='flex justify-between font-medium text-[base] leading-[24px]'>
          <button
            className='border border-[#d8dae5] rounded-[8px] h-[44px] flex items-center justify-center text-[#667085]'
            style={{
              width: '166px',
              height: '44px',
            }}
            onClick={closeModalFunction}
          >
            Cancel
          </button>
          <button
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[8px] w-[166px] h-[44px] flex items-center justify-center text-white'
            style={{
              width: '166px',
              height: '44px',
            }}
            onClick={cancelFormCreation}
          >
            Confirm
          </button>
        </div>
      </section>
    </aside>
  )
}

export default CancelFormModal
