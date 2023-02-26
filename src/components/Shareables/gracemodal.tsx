import { danger, Close, ExclaimateIcon, exclamationYellow } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  switchFunction?: any
  message?: string
}

const GraceFormModal = ({ closeModalFunction, switchFunction, message }: Props) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[35rem] w-[35rem] h-auto rounded-[.5rem] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>{/* <img src={danger} width={30} height={30} alt='danger' /> */}</div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div
          className=' py-3 text-[1.125rem] leading-[1.75rem] text-[#333333] font-medium  '
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#636363',
            fontFamily: 'Inter',
            lineHeight: '24px',
          }}
        >
          <div className='mb-4'>
            <img src={exclamationYellow} width={100} height={100} alt='danger' />
          </div>
          Grace period is not enabled!
          <div
            className='py-3 text-[1rem] leading-[1.75rem] text-[#636363] max-w-[500px] text-center'
            style={{
              letterSpacing: '0.5px',
            }}
          >
            Customers created via the accelerated route will remain inactive until document regularization is completed. <br /> Click{' '}
            <span
              style={{
                textDecoration: 'underline',
                color: 'red',
                cursor: 'pointer',
              }}
              onClick={closeModalFunction}
            >
              here
            </span>{' '}
            to enable Grace period
            {message}
          </div>
        </div>

        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <div
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={closeModalFunction}
          >
            Switch to legacy form
          </div>
          <div
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={switchFunction}
          >
            Continue
          </div>
        </div>
      </section>
    </aside>
  )
}

export default GraceFormModal
