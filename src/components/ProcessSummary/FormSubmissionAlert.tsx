import { greaterThanRed, returnIcon, Success } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import { AppRoutes } from 'Routes/AppRoutes'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  closeModalFunction: () => void
  customerId?: string
  isAdmin?: boolean
}

const FormSubmissionAlert = ({ closeModalFunction, customerId, isAdmin }: Props) => {
  const navigate = useNavigate()
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      {isAdmin ? (
        <section className='bg-white min-w-[25rem] max-w-[34.6875rem] min-h-[13.9375rem] h-[25.5rem] rounded-[.5rem] py-6 px-6 flex flex-col gap-6 justify-between'>
          <div className='relative flex justify-center'>
            <img src={Success} alt='success' />
          </div>
          <div className=' text-[#636363]  '>
            <p className='text-[16px] leading-[1.5rem] text-center my-4 text-[#636363] '>
              Please proceed to assign product to customer, else, default Savings product will be assigned to the customer.
            </p>
          </div>
          <button
            className='flex items-center justify-center text-white '
            onClick={() => navigate(`${AppRoutes.mainScreen}product-assignment/${customerId}`, { replace: true })}
          >
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Assign Product</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </section>
      ) : (
        <section className='bg-white min-w-[25rem] max-w-[34.6875rem] min-h-[13.9375rem] h-[25.5rem] rounded-[.5rem] py-6 px-6 flex flex-col gap-6 justify-between'>
          <div className='relative flex justify-center'>
            <img src={Success} alt='success' />
          </div>
          <div className=' text-[#636363]  '>
            {/* <p className='text-[24px] leading-[30px] text-center'>Required Document Missing </p> */}
            <p className='text-[16px] leading-[1.5rem] text-center my-4 text-[#636363] '>
              Please proceed to assign product to customer, else, default Savings product will be assigned to the customer.
            </p>
          </div>
          <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
            <button
              className='  flex items-center justify-center text-[#667085]'
              onClick={() => {
                navigate(AppRoutes.mainScreen, { replace: true })
              }}
            >
              <img src={returnIcon} width={30} height={26} alt='return to modify' />
              <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Return to Dashboard</span>
            </button>
            <button
              className='flex items-center justify-center text-white '
              onClick={() => navigate(`${AppRoutes.mainScreen}product-assignment/${customerId}`, { replace: true })}
            >
              <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Assign Product</span>
              <img src={greaterThanRed} width={30} height={26} />
            </button>
          </div>
        </section>
      )}
      <section></section>
    </aside>
  )
}

export default FormSubmissionAlert
