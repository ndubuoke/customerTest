import { Disable, Edit, Enable, Eye, Menu } from 'Assets/svgs'
import React from 'react'
import getCustomerDetail from '../../utilities/getCustomerDetail'
import {format, parseISO} from 'date-fns'

type customerDetailsRowType = {
  customer: {
    id: number
    status: string
    updatedAt: string
  }
  showCustomersFunctionHandler: (e) => void
  showCustomerFunctionOptions: boolean
  customerFunctionListRef: any
  customerId: number
  customerFunctionOptions: string[]
  customerFunctionHandler: (e, v) => void
  userRole: string
}

const CustomerDetailsRow = ({
  customer,
  showCustomersFunctionHandler,
  showCustomerFunctionOptions,
  customerFunctionListRef,
  customerId,
  customerFunctionOptions,
  customerFunctionHandler,
  userRole,
}: customerDetailsRowType) => {
  return (
    <tr key={customer?.id} className='bg-background-lightRed border-b text-text-secondary   '>
      <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
        {getCustomerDetail(customer, 'firstName')} {getCustomerDetail(customer, 'surname')}
        {/* {customer.customer_profiles.firstName} {customer.customer_profiles.surname} */}
        <span className='text-common-title'>{getCustomerDetail(customer, 'customerEntityId')}</span>
        {/* <span className='text-common-title'>{customer.customer_profiles.customerEntityId}</span> */}
      </td>
      <td className='py-2 px-2'>{getCustomerDetail(customer, 'mobileNumber')}</td>
      {/* <td className='py-2 px-2'>{customer.customer_profiles.mobileNumber}</td> */}
      <td className='py-2 px-2'>{getCustomerDetail(customer, 'emailAddress')}</td>
      {/* <td className='py-2 px-2'>{customer.customer_profiles.emailAddress}</td> */}
      <td className='py-2 px-2 text-[#1E0A3C]'>
        <span className={` ${customer?.status === 'Active' ? 'bg-[#D4F7DC] text-[#15692A]' : 'bg-[#E5E5EA] text-[#1E0A3C]'} p-1 rounded font-medium`}>
          {customer?.status}
        </span>
      </td>
      <td className='py-2 pl-2 pr-4 relative flex items-center justify-between'>
        {format(parseISO(customer?.updatedAt), " dd MMM yyyy ',' HH:mm a")}
        {userRole === 'maker' && (
          <>
            <img src={Menu} alt='' className='cursor-pointer' onClick={showCustomersFunctionHandler.bind(null, customer.id)} />
            {showCustomerFunctionOptions && customer.id === customerId && (
              <div ref={customerFunctionListRef} className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'>
                {customerFunctionOptions?.map((option, index) => {
                  if (option === 'View') {
                    return (
                      <div
                        key={index}
                        className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                        onClick={customerFunctionHandler.bind(null, { option: option, customer: customer })}
                      >
                        <span className='flex w-full  '>
                          {' '}
                          <img className='mr-2' src={Eye} />
                          View
                        </span>
                      </div>
                    )
                  }
                  if (option == 'Modify') {
                    return (
                      <div
                        key={index}
                        className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                        onClick={customerFunctionHandler.bind(null, option)}
                      >
                        <span className='flex w-full  '>
                          {' '}
                          <img className='mr-2' src={Edit} />
                          Modify
                        </span>
                      </div>
                    )
                  }
                  if (customer.status === 'Inactive') {
                    if (option == 'Activate') {
                      return (
                        <div
                          key={index}
                          className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                          onClick={customerFunctionHandler.bind(null, { option, customer: customer })}
                        >
                          <span className='flex w-full  '>
                            {' '}
                            <img className='mr-2' src={Enable} />
                            Activate
                          </span>
                        </div>
                      )
                    }
                  } else {
                    if (option == 'Deactivate') {
                      return (
                        <div
                          key={index}
                          className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                          onClick={customerFunctionHandler.bind(null, { option, customerId: customer.id })}
                        >
                          <span className='flex w-full  '>
                            {' '}
                            <img className='mr-2' src={Disable} />
                            Deactivate
                          </span>
                        </div>
                      )
                    }
                  }
                })}
              </div>
            )}
          </>
        )}
      </td>
    </tr>
  )
}

export default CustomerDetailsRow
