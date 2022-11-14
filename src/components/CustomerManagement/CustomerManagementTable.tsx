import { Disable, Edit, Eye, Filter, Menu } from 'Assets/svgs'
import { Checkbox } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import { ReducersType } from '../../redux/store'

type CustomerManagementTable = {
  tableType: string | 'All Customers' | 'Requests'
  customerType: string | 'Individual' | 'SME'
  AllCustomers: any
  allRequests: any
  showCustomerFunctionOptions: boolean
  selectedStatus: string
  setShowCustomerFunctionOptions: (e) => void
  customerFunctionListRef: any
  filterStateOptionsRef: any
  filterTypeOptionsRef: any
  filterInitiatorOptionsRef: any
  setShowFilterStateOptions: (e) => void
  ShowFilterStateOptions: boolean
  ShowFilterTypeOptions: boolean
  ShowFilterInitiatorOptions: boolean
  setShowDeactivationModal: (e) => void
  setShowFilterTypeOptions: (e) => void
  setShowFilterInitiatorOptions: (e) => void
}

const customerTableHeads = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
const requestTableHeads = ['Request', 'TYPE', 'INITIATOR', 'Status', 'updated on']
const customerFunctionOptions = ['View', 'Modify', 'Deactivate']
const filterStateOptions = ['Select all', 'Active', 'Inactive']
const requestType = ['Select all', 'Creation', 'Modification', 'Deactivation', 'Reactivation']
const requestStatus = ['Select all', 'Approved', 'Interim Approval', 'In-Review', 'In-Issue']
const user = 'John Smith '

const CustomerManagementTable = ({
  tableType,
  customerFunctionListRef,
  showCustomerFunctionOptions,
  setShowCustomerFunctionOptions,
  ShowFilterStateOptions,
  setShowFilterStateOptions,
  filterStateOptionsRef,
  ShowFilterTypeOptions,
  filterTypeOptionsRef,
  setShowFilterTypeOptions,
  filterInitiatorOptionsRef,
  setShowFilterInitiatorOptions,
  ShowFilterInitiatorOptions,
  setShowDeactivationModal,
  selectedStatus,
  AllCustomers,
  allRequests,
  customerType,
}: CustomerManagementTable) => {
  const [customerId, setCustomerId] = useState(0)

  const showCustomersFunctionHandler = (id) => {
    setCustomerId(id)
    setShowCustomerFunctionOptions(!showCustomerFunctionOptions)
  }
  const filterStateHandler = () => {
    setShowFilterStateOptions(true)
  }

  const filterTypeHandler = () => {
    setShowFilterTypeOptions(true)
  }

  const filterInitiatorHandler = () => {
    setShowFilterInitiatorOptions(true)
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
  const customers = AllCustomers?.serverResponse?.data?.customer
  const requests = allRequests?.serverResponse?.data?.res

  const getCustomerDetail = (customer, field) => {
    if (field === 'surname') {
      return customer.customer_profiles.map((profile) => {
        return profile.surname
      })
    }
    if (field === 'mobileNumber') {
      return customer.customer_profiles.map((profile) => {
        return profile.mobileNumber
      })
    }
    if (field === 'firstName') {
      return customer.customer_profiles.map((profile) => {
        return profile.firstName
      })
    }
    if (field === 'emailAddress') {
      return customer.customer_profiles.map((profile) => {
        return profile.emailAddress
      })
    }
    if (field === 'customerEntityId') {
      return customer.customer_profiles.map((profile) => {
        return profile.customerEntityId
      })
    }
  }

  return (
    <div className=' relative mt-[3%]  mx-4 overflow-auto max-h-[300px]  '>
      <table className='w-full text-sm text-left table-auto '>
        <thead className='text-xs uppercase     '>
          <tr className='  '>
            {tableType === 'All Customers'
              ? customerTableHeads.map((tableHead) => (
                  <th key={tableHead} className='py-3 relative   text-common-title'>
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
                  <th key={tableHead} className='py-3 relative   text-common-title'>
                    <span className='border-l border-common-title px-2'>{tableHead}</span>
                    {tableHead === 'TYPE' ? (
                      <img src={Filter} alt='' onClick={filterTypeHandler} className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                    ) : null}
                    {ShowFilterTypeOptions && tableHead === 'TYPE' && (
                      <div
                        ref={filterTypeOptionsRef}
                        className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                      >
                        {requestType?.map((option, index) => {
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
                          if (option == 'Creation') {
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
                                  Creation
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Modification') {
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
                                  Modification
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Deactivation') {
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
                                  Deactivation
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Reactivation') {
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
                                  Reactivation
                                </span>
                              </div>
                            )
                          }
                        })}
                      </div>
                    )}
                    {tableHead === 'INITIATOR' ? (
                      <img src={Filter} alt='' onClick={filterInitiatorHandler} className='absolute cursor-pointer right-0 top-[35%] mr-2' />
                    ) : null}
                    {ShowFilterInitiatorOptions && tableHead === 'INITIATOR' && (
                      <div
                        ref={filterInitiatorOptionsRef}
                        className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                      >
                        {selectedStatus === 'Initiated by me' && (
                          <div className='  px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                            <span className='flex w-full  '>
                              {' '}
                              <span className='mr-2'>
                                <Checkbox disabled={true} />
                              </span>
                              {user}[ME]
                            </span>
                          </div>
                        )}

                        {selectedStatus === 'Initiated by my team' && (
                          <div className='  px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                            <span className='flex w-full  '>
                              {' '}
                              <span className='mr-2'>
                                <Checkbox disabled={true} />
                              </span>
                              Teams
                            </span>
                          </div>
                        )}
                        {/* {requestType?.map((option, index) => {
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
                          if (option == 'Creation') {
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
                                  Creation
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Modification') {
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
                                  Modification
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Deactivation') {
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
                                  Deactivation
                                </span>
                              </div>
                            )
                          }
                          if (option == 'Reactivation') {
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
                                  Reactivation
                                </span>
                              </div>
                            )
                          }
                        })} */}
                      </div>
                    )}
                    {tableHead === 'Status' ? <img src={Filter} alt='' className='absolute right-0 top-[35%] mr-2' /> : null}
                    {tableHead === 'updated on' ? <img src={Filter} alt='' className='absolute right-14 top-[35%] mr-2' /> : null}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        {AllCustomers?.loading ? (
          <tbody className=' '>
            <tr className=' min-h-[300px]  flex items-center justify-center'>
              <td className=' w-full '>
                <span className=' w-full'>
                  <Spinner size='large' />
                </span>
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            <tbody className=' '>
              {tableType === 'All Customers' &&
                customers &&
                customers.map((customer) => (
                  <tr key={customer.id} className='bg-background-lightRed border-b text-text-secondary   '>
                    <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
                      {getCustomerDetail(customer, 'firstName')} {getCustomerDetail(customer, 'surname')}
                      <span className='text-common-title'>{getCustomerDetail(customer, 'customerEntityId')}</span>
                    </td>
                    <td className='py-2 px-2'>{getCustomerDetail(customer, 'mobileNumber')}</td>
                    <td className='py-2 px-2'>{getCustomerDetail(customer, 'emailAddress')}</td>
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
                      {customer.updatedAt}
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
          </>
        )}

        {/* Requests */}
        {allRequests?.loading ? (
          <tbody className=' '>
            <tr className=' min-h-[300px]  flex items-center justify-center'>
              <td className=' w-full '>
                <span className=' w-full'>
                  <Spinner size='large' />
                </span>
              </td>
            </tr>
          </tbody>
        ) : (
          <>
              <tbody>


            {tableType === 'Requests' &&
              requests &&
              requests.map((request) => {
                if (request.customerType === customerType) {
                  return (
                    <tr key={request.requestId} className='bg-background-lightRed border-b text-text-secondary   '>
                      <td scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        {request.requestTitle}
                      </td>
                      <td className='py-2 px-2'>{request.requestType}</td>
                      <td className='py-2 px-2'>{request.initiator}</td>
                      <td className='py-2 px-2 text-[#1E0A3C]'>
                        <span
                          className={` ${request.status === 'Approved' ? 'bg-[#D4F7DC] text-[#15692A]' : null} ${
                            request.status === 'In-Review' ? 'bg-[#F0F5FF] text-[#0050C8]' : null
                          } p-1 rounded font-medium`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className='py-2 pl-2 pr-4 relative flex items-center justify-between'>
                        {request.updatedAt}
                        {/* <img src={Menu} alt='' className='cursor-pointer' onClick={showCustomersFunctionHandler.bind(null, customer.id)} /> */}
                        {/* {showCustomerFunctionOptions && customer.id === customerId && (
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
                      )} */}
                      </td>
                    </tr>
                  )
                }
              })}
              </tbody>
          </>
        )}
      </table>
    </div>
  )
}

export default CustomerManagementTable
