import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'

import Button from 'Components/Shareables/Button'
import React from 'react'
import getCustomerDetail from '../../utilities/getCustomerDetail'
import { useNavigate } from 'react-router-dom'
import { clearAllItemsInStorageForCustomerMGT, STORAGE_NAMES } from 'Utilities/browserStorages'
import { AppRoutes } from 'Routes/AppRoutes'
import convertCamelCaseToTitleCaseText from 'Utilities/convertCamelCaseToTitleCaseText'
import truncateString from 'Utilities/truncateString'

type props = {
  setShowCustomerModal: (e) => void
  customer: any
}

const ViewCustomerModal = ({ setShowCustomerModal, customer }: props) => {
  // console.log(customer)
  const navigate = useNavigate()

  const customerType = customer?.customerType
  const customerId = customer?.customerId
  const viewInCustomer360Handler = () => {
    navigate(`/customer-management/customer-360/${customerId}`)
  }
  const addProductHandler = () => {
    navigate(`/customer-management/product-assignment/${customerId}`)
  }
  const closeModal = () => {
    setShowCustomerModal(false)
  }

  const viewActivityLogHandler = (customer) => {
    let request = new Promise(function (myResolve, myReject) {
      let request = customer?.requests.filter((request) => {
        return request.requestType === 'Creation'
      })

      myResolve(request[0].requestId) // when successful
      myReject('ERROR') // when error
    })
    request.then(function (value) {
      navigate(`/customer-management/process-summary/${value}`)
    })
    // console.log(request[0].requestId)
  }

  const modifyCustomerHandler = () => {
    clearAllItemsInStorageForCustomerMGT()
    sessionStorage.setItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_FORM_MODE_STATUS, JSON.stringify('modification'))
    if (customer?.customerType?.toLowerCase() === 'individual') {
      navigate(`${AppRoutes.individualCustomerCreationScreen}/?isForm=true`)
    } else {
      navigate(`${AppRoutes.SMECustomerCreationScreen}/?isForm=true`)
    }
    sessionStorage.setItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_MODIFICATION_DATA, JSON.stringify(customer))
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.setItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE, JSON.stringify(customer?.customer_profiles[0]))
  }

  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={`w-[70%] h-[80%] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full h-full  flex flex-col   '>
          <div className='flex  justify-between  pb-2   border-b mb-2'>
            <h6 className='text-text-secondary text-[24px] uppercase'>
              {getCustomerDetail(customer, 'firstName')} {getCustomerDetail(customer, 'surname')}
            </h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>

          <div className=' h-[80%] flex gap-4 mt-6 '>
            <div className=' w-full flex h-full flex-col '>
              <div className='justify-center w-full h-[30%]  flex' style={{ marginBottom: '40px' }}>
                <img src={Avatar} className='' />
              </div>
              <div className='flex gap-16 mt-2   text-[#636363]   h-[50%]   overflow-y-auto'>
                <div className=' font-bold text-[16px]  w-full items-end flex  flex-col '>
                  <p style={{ marginBottom: '18px' }}>Surname</p>
                  <p style={{ marginBottom: '18px' }}>First Name</p>
                  <p style={{ marginBottom: '18px' }}>Other Names</p>
                  <p className=' ' style={{ marginBottom: '18px' }}>
                    Customer ID
                  </p>
                  <p style={{ marginBottom: '18px' }}> Account Number</p>
                  <p style={{ marginBottom: '18px' }}>Customer BVN</p>
                  <p style={{ marginBottom: '18px' }}>Risk Status</p>
                  <p style={{ marginBottom: '18px' }}>Customer Groups</p>
                </div>
                <div className=' font-[400] w-[100%] flex flex-col items-start text-[16px]  '>
                  <p style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'surname') != '' || null ? getCustomerDetail(customer, 'surname') : 'Not Available'}
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'firstName') != '' || null ? getCustomerDetail(customer, 'firstName') : 'Not Available'}
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'otherNames') != '' || null ? getCustomerDetail(customer, 'otherNames') : 'Not Available'}
                  </p>
                  <p className=' w-full ' style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'customerId') != '' || null ? truncateString(customerId, 20) : 'Not Available'}
                  </p>
                  <p style={{ marginBottom: '18px' }} className=''>
                    {getCustomerDetail(customer, 'accountNumber') != '' || null
                      ? `${getCustomerDetail(customer, 'accountNumber')}`
                      : 'Not Available'}
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    {' '}
                    {getCustomerDetail(customer, 'bvn') != '' || null ? getCustomerDetail(customer, 'bvn') : 'Not Available'}{' '}
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'riskStatus') != '' || null ? getCustomerDetail(customer, 'riskStatus') : 'Not Available'}
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    {getCustomerDetail(customer, 'customerGroups') != '' || null ? getCustomerDetail(customer, 'customerGroups') : 'Not Available'}
                  </p>
                </div>
              </div>

              <div className='w-full py-2 px-6 justify-between flex flex-wrap   border border-[#E5E9EB] h-[20%] text-[16px] text-[#636363] rounded-md'>
                <div className='flex gap-2 cursor-pointer items-center justify-center ' onClick={modifyCustomerHandler}>
                  <img src={Edit} />
                  <span>Modify</span>
                </div>
                <div className='flex gap-2 cursor-pointer items-center justify-center '>
                  <img src={Disable} />
                  <span>Deactivate</span>
                </div>
                <div className='flex gap-2 cursor-pointer items-center justify-center  ' onClick={viewInCustomer360Handler}>
                  <img src={customer360} />
                  <span>View in Customer 360</span>
                </div>
                <div className='flex gap-2 cursor-pointer items-center justify-center'>
                  <img src={add} />
                  <span>Add Cusomer to Group</span>
                </div>
                <div className='flex gap-2 cursor-pointer  items-center justify-center' onClick={addProductHandler}>
                  <img src={add} />
                  <span>Add Product</span>
                </div>
                {/* <div className='w-full flex flex-wrap gap-2   justify-between text-[#636363]'>
                </div> */}
                {/* <div className='w-full flex justify-between gap-2 text-[#636363]'>
                  <div className='flex gap-2 cursor-pointer items-center justify-center'>
                    
                    <img src={add} />
                    <span>Add Cusomer to Group</span>
                  </div>
                  <div className='flex gap-2 cursor-pointer  items-center justify-center' onClick={addProductHandler}>
                    <img src={add} />
                    <span>Add Product</span>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='border rounded w-full justify-between flex flex-col h-full  text-[#636363] '>
              <div className='h-[80%] px-6 mt-6'>
                <span className='text-[20px]  font-bold'>ASSIGNED PRODUCTS</span>
                <div className=' font-bold   w-full items-end flex  flex-col '>
                  {/* {Object.keys(customer?.customer_products).map((data, index) => (
                    <p key={index} className='mb-2 text-[16px] font-normal'>
                      {convertCamelCaseToTitleCaseText(data)}
                    </p>
                  ))} */}
                </div>
              </div>
              <div className='w-full py-2 px-6 flex flex-col justify-between border border-[#E5E9EB] h-[20%] rounded-md'>
                <div className='w-full flex   justify-between text-[#636363]'>
                  <div className='flex gap-6 '>
                    <span>Customer Status:</span>
                    <span
                      className={` ${
                        customer?.status === 'Active' ? 'bg-[#D4F7DC] text-[#15692A]' : 'bg-[#E5E5EA] text-[#1E0A3C]'
                      } px-1 rounded font-medium`}
                    >
                      {customer?.status}
                    </span>
                  </div>
                  <div className='flex gap-2 '>
                    <span onClick={viewActivityLogHandler.bind(null, customer)} className='underline underline-offset-1 cursor-pointer'>
                      View Activity Log
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCustomerModal
