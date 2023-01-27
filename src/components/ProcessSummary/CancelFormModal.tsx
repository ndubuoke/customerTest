import { danger, Close } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  cancelFormCreation: any
}

const CancelFormModal = ({ closeModalFunction, cancelFormCreation }: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[25rem] w-[25rem] min-h-[13.9375rem] h-[13.9375rem] rounded-[.5rem] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>
            <img src={danger} width={30} height={30} alt='danger' />
          </div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className='py-3 text-[18px] leading-[28px] text-[#333333] font-medium  '>Do you want to cancel customer creation?</div>
        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={closeModalFunction}
          >
            Cancel
          </button>
          <button
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={{
              width: '10.375rem',
              height: '2.75rem',
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
