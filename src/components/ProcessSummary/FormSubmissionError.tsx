import { danger, greaterThanRed, returnIcon, Success } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'

type Props = {
  closeModalFunction: () => void
  error: string
}

const FormSubmissionError = ({ closeModalFunction, error }: Props) => {
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
          <img src={danger} alt='error' />
        </div>
        <div className=' text-[#636363]  '>
          {/* <p className='text-[24px] leading-[30px] text-center'>Required Document Missing </p> */}
          <p className='text-[1.5rem] leading-[1.5rem] text-center my-4 text-[#636363] '>{error}</p>
        </div>
        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button className='  flex items-center justify-center text-[#667085]' onClick={closeModalFunction}>
            <img src={returnIcon} width={30} height={26} alt='return to try again' />
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Return to try again</span>
          </button>
          <button className='flex items-center justify-center text-white ' onClick={closeModalFunction}>
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Go Back</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </div>
      </section>
    </aside>
  )
}

export default FormSubmissionError
