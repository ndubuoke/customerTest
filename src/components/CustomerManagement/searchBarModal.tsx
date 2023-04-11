import { search, searchCaret } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import getCustomerDetail from 'Utilities/getCustomerDetail'
import React from 'react'

type props = {
  response: any
  externalFunctionToDoSomething: (e) => void
  searchBarModalRef: any
}

const SearchBarModal = ({ response, externalFunctionToDoSomething, searchBarModalRef }: props) => {
  // console.log(response)
  return (
    <div
      ref={searchBarModalRef}
      className='absolute top-8 z-20 max-h-[23.75rem] right-0 w-[23.75rem]  flex flex-col border shadow-md items-center p-4  rounded-md bg-white overflow-auto'
    >
      {response.loading && (
        <div className='w-full   flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      )}
      {!response.loading && response?.serverResponse?.data?.length === 0 &&(
        <p>No Customer Exist with search term</p>
      )}
      {!response.loading && response?.serverResponse?.data?.length > 0 &&
        response?.serverResponse?.data?.map((customer, index) => {
          if (customer?.customerType === 'Individual') {
            return (
              <div className={`w-full   `} key={index}>
                <p className='flex gap-1 text-[#AAAAAA]'>
                  <img src={searchCaret} alt='' />
                  Individual Customers
                </p>
                <div className='mt-2 w-full flex gap-2 cursor-pointer ' onClick={externalFunctionToDoSomething.bind(null, customer)}>
                  <span className='flex justify-start mt-1  '>
                    <div className='w-[60%]'>
                      <img src={search} alt='' className=' w-6' />
                    </div>
                  </span>
                  <div>
                    <p className='text-[#636363] capitalize text-[16px]'>
                      {getCustomerDetail(customer, 'surname')} {getCustomerDetail(customer, 'otherNames')} {getCustomerDetail(customer, 'firstName')}
                    </p>
                    <p className='text-[#636363] text-[12px]'>{getCustomerDetail(customer, 'emailAddress')}</p>
                    <p className='text-[#AAAAAA] text-[12px] capitalize'>Last request initiated by {getCustomerDetail(customer, 'initiator')}</p>
                  </div>
                </div>
              </div>
            )
          }
          if (customer?.customerType === 'SME') {
            return (
              <div className='w-full  ' key={index}>
                <p className='flex gap-1 text-[#AAAAAA]'>
                  <img src={searchCaret} alt='' />
                  Corporate Customers
                </p>
                <div className='mt-2 w-full flex gap-2 cursor-pointer' onClick={externalFunctionToDoSomething.bind(null, customer)}>
                  <img src={search} alt='' className='w-4' />
                  <div>
                    <p className='text-[#636363] text-[16px]'>
                      {getCustomerDetail(customer, 'surname')} {getCustomerDetail(customer, 'otherNames')} {getCustomerDetail(customer, 'firstName')}
                    </p>
                    <p className='text-[#636363] text-[12px]'>{getCustomerDetail(customer, 'emailAddress')}</p>
                    <p className='text-[#AAAAAA] text-[12px] capitalize'>Last request initiated by {getCustomerDetail(customer, 'initiator')}</p>
                  </div>
                </div>
              </div>
            )
          }
        })}
    </div>
  )
}

export default SearchBarModal
