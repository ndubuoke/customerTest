import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'

import Button from 'Components/Shareables/Button'
import React from 'react'
import getCustomerDetail from '../../utilities/getCustomerDetail'

type props = {
  setShowCustomerModal: (e) => void
  customer: {}
}

const ViewCustomerModal = ({ setShowCustomerModal, customer }: props) => {
  const closeModal = () => {
    setShowCustomerModal(false)
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[600px] min-w-[1000px] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full  min-h-[300px] flex flex-col  justify-between'>
          <div className='flex   justify-between  pb-4'>
            <h6 className='text-text-secondary text-3xl'>
              {getCustomerDetail(customer, 'firstName')} {getCustomerDetail(customer, 'surname')}
            </h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>

          <div className=' flex'>
            <div className=' w-full flex flex-col '>
              <div className='justify-center w-full flex'>
                <img src={Avatar} />
              </div>
              <div className='flex gap-24 mt-4   text-[#636363] max-h-[160px] overflow-y-scroll'>
                <div className=' font-bold   w-full items-end flex  flex-col '>
                  <p className='mb-2'>Surname</p>
                  <p className='mb-2'>First Name</p>
                  <p className='mb-2'>Other Names</p>
                  <p className='mb-2'>Customer ID</p>
                  <p className='mb-2'>Customer BVN</p>
                  <p className='mb-2'>Risk Status</p>
                  <p className='mb-2'>Customer Groups</p>
                </div>
                <div className=' font-[400] w-full flex flex-col items-start '>
                  <p className='mb-2'>
                    {getCustomerDetail(customer, 'surname') !== '' || null ? getCustomerDetail(customer, 'surname') : 'Not Available'}{' '}
                  </p>
                  <p className='mb-2'>
                    {getCustomerDetail(customer, 'firstName') != '' || null ? getCustomerDetail(customer, 'firstName') : 'Not Available'}{' '}
                  </p>
                  <p className='mb-2'>
                    {getCustomerDetail(customer, 'otherNames') != '' || null ? getCustomerDetail(customer, 'otherNames') : 'Not Available'}
                  </p>
                  <p className='mb-2'>
                    {getCustomerDetail(customer, 'customerId') != '' || null ? getCustomerDetail(customer, 'customerId') : 'Not Available'}{' '}
                  </p>
                  <p className='mb-2'> {getCustomerDetail(customer, 'bvn') != '' || null ? getCustomerDetail(customer, 'bvn') : 'Not Available'} </p>
                  <p className='mb-2'>
                    {' '}
                    {getCustomerDetail(customer, 'riskStatus') != '' || null ? getCustomerDetail(customer, 'riskStatus') : 'Not Available'}{' '}
                  </p>
                  <p className='mb-2'>
                    {' '}
                    {getCustomerDetail(customer, 'customerGroups') != '' || null
                      ? getCustomerDetail(customer, 'customerGroups')
                      : 'Not Available'}{' '}
                  </p>
                </div>
              </div>

              <div className='w-full py-2 px-6 flex flex-col justify-between border border-[#E5E9EB] h-[80px] rounded-md'>
                <div className='w-full flex   justify-between text-[#636363]'>
                  <div className='flex gap-2 '>
                    {' '}
                    <img src={Edit} />
                    <span>Modify</span>
                  </div>
                  <div className='flex gap-2 '>
                    <img src={Disable} />
                    <span>Deactivate</span>
                  </div>
                  <div className='flex gap-2 '>
                    <img src={customer360} />
                    <span>View in Customer 360</span>
                  </div>
                </div>
                <div className='w-full flex justify-between text-[#636363]'>
                  <div className='flex gap-2 '>
                    {' '}
                    <img src={add} />
                    <span>Add Cusomer to Group</span>
                  </div>
                  <div className='flex gap-2 '>
                    <img src={add} />
                    <span>Add Product</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='border rounded w-full p-4 text-[#636363]'>
              <span className='text-2xl font-bold'>ASSIGNED PRODUCTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCustomerModal
