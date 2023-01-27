import { danger, Close } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  switchFunction: any
  message: string
}

const SwitchFormModal = ({ closeModalFunction, switchFunction, message }: Props) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[25rem] w-[25rem] min-h-[23.75rem] rounded-[.5rem] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>
            <img src={danger} width={30} height={30} alt='danger' />
          </div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className='py-3 text-[1.125rem] leading-[1.75rem] text-[#333333] font-medium  '>
          Truncate form and proceed?
          <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div>
        </div>

        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={closeModalFunction}
          >
            No
          </button>
          <button
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={switchFunction}
          >
            Yes
          </button>
        </div>
      </section>
    </aside>
  )
}

export default SwitchFormModal
