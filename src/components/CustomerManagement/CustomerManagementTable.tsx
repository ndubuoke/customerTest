import { Disable, Edit, Eye, Filter, Menu } from 'Assets/svgs'
import { Checkbox } from 'Components/Shareables'
import React from 'react'
import { useState } from 'react'

type CustomerManagementTable = {
  tableType: string | 'All Customers' | 'Requests'
  showCustomerFunctionOptions: boolean

  setShowCustomerFunctionOptions: (e) => void
  customerFunctionListRef: any
  filterStateOptionsRef: any
  setShowFilterStateOptions: (e) => void
  ShowFilterStateOptions: boolean
  setShowDeactivationModal: (e) => void
}

const customerTableHeads = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
const requestTableHeads = ['Request', 'TYPE', 'INITIATOR', 'Status', 'updated on']
const customerFunctionOptions = ['View', 'Modify', 'Deactivate']
const filterStateOptions = ['Select all', 'Active', 'Inactive']

const customers = [
  {
    id: 1,
    name: 'Temitope Yusuf Chukwuma',
    accNo: '20067754632',
    phone: '09012345678',
    email: 'temiyusuf@email.com',
    status: 'Active',
    updatedOn: '22 Feb 2022, 10:22 AM',
  },
  {
    id: 2,
    name: 'Alex Andrea',
    accNo: '20067754632',
    phone: '09012345678',
    email: 'temiyusuf@email.com',
    status: 'Inactive',
    updatedOn: '22 Feb 2022, 10:22 AM',
  },
  {
    id: 3,
    name: 'Achifu Charles',
    accNo: '20067754632',
    phone: '09012345678',
    email: 'temiyusuf@email.com',
    status: 'Active',
    updatedOn: '22 Feb 2022, 10:22 AM',
  },
]

const CustomerManagementTable = ({
  tableType,
  customerFunctionListRef,
  showCustomerFunctionOptions,
  setShowCustomerFunctionOptions,
  ShowFilterStateOptions,
  setShowFilterStateOptions,
  filterStateOptionsRef,

  setShowDeactivationModal,
}: CustomerManagementTable) => {
  const [customerId, setCustomerId] = useState(0)

  const showCustomersFunctionHandler = (id) => {
    setCustomerId(id)
    setShowCustomerFunctionOptions(!showCustomerFunctionOptions)
  }
  const filterStateHandler = () => {
    setShowFilterStateOptions(true)
  }
  const customerFunctionHandler = ({ option, customerId }) => {
    if (option === 'View') {
      //  navigate(AppRoutes.individualCustomerCreationScreen)
    } else if (option === 'Modify') {
      //  navigate(AppRoutes.SMECustomerCreationScreen)
    } else if (option === 'Deactivate') {
      setShowDeactivationModal(customerId)
    }
  }
  return (
    <div className=' relative mt-[3%]  mx-4 overflow-auto max-h-[300px]  '>
      <table className='w-full text-sm text-left table-auto '>
        <thead className='text-xs uppercase     '>
          <tr className='  '>
            {tableType === 'All Customers'
              ? customerTableHeads.map((tableHead) => (
                  <th className='py-3 relative   text-common-title'>
                    <span className='border-l border-common-title px-2'>{tableHead}</span>
                    {tableHead === 'State' ? (
                      <img src={Filter} onClick={filterStateHandler} alt='' className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                    ) : null}
                    {ShowFilterStateOptions && tableHead === 'State' && (
                      <div
                        ref={filterStateOptionsRef}
                        className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                      >
                        {filterStateOptions?.map((option, index) => {
                          if (option === 'Select all') {
                            return (
                              <div
                                key={index}
                                className='  px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                                // onClick={filterStateHandler.bind(null, option)}
                              >
                                <span className='flex w-full  '>
                                  {' '}
                                  <span className='mr-2'>
                                    <Checkbox />
                                  </span>
                                  [ Select all]
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Active') {
                            return (
                              <div
                                key={index}
                                className='cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                                onClick={filterStateHandler.bind(null, option)}
                              >
                                <span className='flex w-full  '>
                                  {' '}
                                  <span className='mr-2'>
                                    <Checkbox />
                                  </span>
                                  Active
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Inactive') {
                            return (
                              <div
                                key={index}
                                className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                                onClick={filterStateHandler.bind(null, option)}
                              >
                                <span className='flex w-full  '>
                                  {' '}
                                  <span className='mr-2'>
                                    <Checkbox />
                                  </span>
                                  Inactive
                                </span>
                              </div>
                            )
                          }
                        })}
                      </div>
                    )}
                    {tableHead === 'updated on' ? <img src={Filter} alt='' className='absolute right-14 top-[35%] mr-2' /> : null}
                  </th>
                ))
              : null}
            {tableType === 'Requests'
              ? requestTableHeads.map((tableHead) => (
                  <th className='py-3 relative   text-common-title'>
                    <span className='border-l border-common-title px-2'>{tableHead}</span>
                    {tableHead === 'TYPE' ? <img src={Filter} alt='' className='absolute right-0 top-[35%] mr-2' /> : null}
                    {tableHead === 'INITIATOR' ? <img src={Filter} alt='' className='absolute right-0 top-[35%] mr-2' /> : null}
                    {tableHead === 'Status' ? <img src={Filter} alt='' className='absolute right-0 top-[35%] mr-2' /> : null}
                    {tableHead === 'updated on' ? <img src={Filter} alt='' className='absolute right-14 top-[35%] mr-2' /> : null}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody className=' '>
          {customers.map((customer) => (
            <tr className='bg-background-lightRed border-b text-text-secondary   '>
              <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
                {customer.name}
                <span className='text-common-title'>{customer.accNo}</span>
              </td>
              <td className='py-2 px-2'>{customer.phone}</td>
              <td className='py-2 px-2'>{customer.email}</td>
              <td className='py-2 px-2 text-[#1E0A3C]'>
                <span
                  className={` ${
                    customer.status === 'Active' ? 'bg-[#D4F7DC] text-[#15692A]' : 'bg-[#E5E5EA] text-[#1E0A3C]'
                  } p-1 rounded font-medium`}
                >
                  {customer.status}
                </span>
              </td>
              <td className='py-2 pl-2 pr-4 relative flex items-center justify-between'>
                22 Feb 2022, 10:22 AM
                <img src={Menu} alt='' className='cursor-pointer' onClick={showCustomersFunctionHandler.bind(null, customer.id)} />
                {showCustomerFunctionOptions && customer.id === customerId && (
                  <div
                    ref={customerFunctionListRef}
                    className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                  >
                    {customerFunctionOptions?.map((option, index) => {
                      if (option === 'View') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={customerFunctionHandler.bind(null, option)}
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
                    })}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerManagementTable
