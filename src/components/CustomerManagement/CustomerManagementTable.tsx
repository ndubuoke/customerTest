import { Disable, Edit, Eye, Filter, Menu } from 'Assets/svgs'
import { Checkbox } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import { ReducersType } from '../../redux/store'
import { useEffect } from 'react'
import { sortCustomersAlphabetically } from '../../redux/actions/CustomerManagement.actions'
import ViewCustomerModal from './ViewCustomerModal'
import getCustomerDetail from '../../utilities/getCustomerDetail'

type customerTableHeadsType = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
const customerTableHeads: customerTableHeadsType = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
const requestTableHeads = ['Request', 'TYPE', 'INITIATOR', 'Status', 'updated on']
const customerFunctionOptions = ['View', 'Modify', 'Deactivate']
const filterStateOptions = ['Select all', 'Active', 'Inactive']
const requestType = ['Select all', 'Creation', 'Modification', 'Deactivation', 'Reactivation']
const filterRequestStatus = ['Select all', 'Approved', 'Interim Approval', 'In-Review', 'In Issue', 'Draft']
type requestStatusType = 'All' | 'Select all' | 'Approved' | 'In Issue' | 'In-Review' | 'Interim Approval' | 'Draft'
const user = 'John Smith '
type customerStatusType = 'All' | 'Active' | 'Inactive'

type CustomerManagementTable = {
  tableType: 'All Customers' | 'Requests'
  customerType: string | 'Individual' | 'SME'
  AllCustomers: any
  allRequests: any
  showCustomerFunctionOptions: boolean
  selectedStatus: string
  setShowCustomerFunctionOptions: (e) => void
  customerFunctionListRef: any
  filterStateOptionsRef: any
  filterTypeOptionsRef: any
  filterRequestStatusOptionsRef: any
  filterInitiatorOptionsRef: any
  setShowFilterStateOptions: (e) => void
  ShowFilterStateOptions: boolean
  ShowFilterTypeOptions: boolean
  ShowFilterInitiatorOptions: boolean
  showFilterRequestStatusOptions: boolean
  setShowDeactivationModal: (e) => void
  setShowFilterTypeOptions: (e) => void
  setShowFilterInitiatorOptions: (e) => void
  setShowFilterRequestStatusOptions: (e) => void
  customerStatusHandler: (e) => void
  customerStatus: string
  requestStatusHandler: (e) => void
  requestStatus: requestStatusType
}

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
  setShowFilterRequestStatusOptions,
  filterRequestStatusOptionsRef,
  showFilterRequestStatusOptions,
  ShowFilterInitiatorOptions,
  setShowDeactivationModal,
  selectedStatus,
  AllCustomers,
  allRequests,
  customerType,
  customerStatusHandler,
  customerStatus,
  requestStatusHandler,
  requestStatus,
}: CustomerManagementTable) => {
  const [customerId, setCustomerId] = useState(0)
  const [customer, setCustomer] = useState({})
  const [allChecked, setallChecked] = useState(false)
  const [activeChecked, setActiveChecked] = useState(false)
  const [inactiveChecked, setInactiveChecked] = useState(false)
  const [approvedRequestStatusOptionChecked, setApprovedRequestStatusOptionChecked] = useState(false)
  const [inIssueRequestStatusOptionChecked, setInIssueRequestStatusOptionChecked] = useState(false)
  const [inReviewRequestStatusOptionChecked, setInReviewRequestStatusOptionChecked] = useState(false)
  const [interimApprovalRequestStatusOptionChecked, setInterimApprovalRequestStatusOptionChecked] = useState(false)
  const [draftRequestStatusOptionChecked, setDraftRequestStatusOptionChecked] = useState(false)
  const [allRequestStatusOptionChecked, setAllRequestStatusOptionChecked] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

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
  const filterRequestStatusHandler = () => {
    setShowFilterRequestStatusOptions(true)
  }

  const checkIfCustomerStatusOptionChecked = (option: customerStatusType) => {
    if (option === 'All') {
      if (allChecked) {
        return
      }
      setActiveChecked(false)
      setInactiveChecked(false)
      customerStatusHandler(option)
    }

    if (option === 'Active') {
      if (activeChecked) {
        return
      }
      setInactiveChecked(false)
      setallChecked(false)

      customerStatusHandler(option)
    }

    if (option === 'Inactive') {
      if (inactiveChecked) {
        return
      }
      setActiveChecked(false)
      setallChecked(false)

      customerStatusHandler(option)
    }
  }

  const checkIfRequestStatusOptionChecked = (option: requestStatusType) => {
    if (option === 'Select all') {
      if (allRequestStatusOptionChecked) {
        return
      }
      setInReviewRequestStatusOptionChecked(false)
      setInIssueRequestStatusOptionChecked(false)
      setInterimApprovalRequestStatusOptionChecked(false)
      setApprovedRequestStatusOptionChecked(false)
      setDraftRequestStatusOptionChecked(false)
      requestStatusHandler('All')
    }
    if (option === 'Approved') {
      if (approvedRequestStatusOptionChecked) {
        return
      }
      setAllRequestStatusOptionChecked(false)
      setInReviewRequestStatusOptionChecked(false)
      setInIssueRequestStatusOptionChecked(false)
      setInterimApprovalRequestStatusOptionChecked(false)
      setDraftRequestStatusOptionChecked(false)
      requestStatusHandler(option)
    }

    if (option === 'Interim Approval') {
      if (interimApprovalRequestStatusOptionChecked) {
        return
      }
      setAllRequestStatusOptionChecked(false)
      setInReviewRequestStatusOptionChecked(false)
      setInIssueRequestStatusOptionChecked(false)
      setApprovedRequestStatusOptionChecked(false)
      setDraftRequestStatusOptionChecked(false)
      requestStatusHandler(option)
    }
    if (option === 'In Issue') {
      if (inIssueRequestStatusOptionChecked) {
        return
      }
      setAllRequestStatusOptionChecked(false)
      setInReviewRequestStatusOptionChecked(false)
      setApprovedRequestStatusOptionChecked(false)
      setInterimApprovalRequestStatusOptionChecked(false)
      setDraftRequestStatusOptionChecked(false)
      requestStatusHandler(option)
    }
    if (option === 'In-Review') {
      if (inReviewRequestStatusOptionChecked) {
        return
      }
      setAllRequestStatusOptionChecked(false)
      setApprovedRequestStatusOptionChecked(false)
      setInterimApprovalRequestStatusOptionChecked(false)
      setDraftRequestStatusOptionChecked(false)
      setInIssueRequestStatusOptionChecked(false)
      requestStatusHandler(option)
    }

    if (option === 'Draft') {
      if (draftRequestStatusOptionChecked) {
        return
      }
      setAllRequestStatusOptionChecked(false)
      setInReviewRequestStatusOptionChecked(false)
      setApprovedRequestStatusOptionChecked(false)
      setInterimApprovalRequestStatusOptionChecked(false)
      setInIssueRequestStatusOptionChecked(false)
      requestStatusHandler(option)
    }
  }

  const customerFunctionHandler = ({ option, customer }) => {
    if (option === 'View') {
      setShowCustomerModal(true)
      setCustomer(customer)
    } else if (option === 'Modify') {
      //  navigate(AppRoutes.SMECustomerCreationScreen)
    } else if (option === 'Deactivate') {
      setShowDeactivationModal(customerId)
    }
  }
  const customers = AllCustomers?.serverResponse?.data?.customer
  const requests = allRequests?.serverResponse?.data?.res

  useEffect(() => {
    if (tableType === 'All Customers') {
      if (customerStatus === 'All') {
        setActiveChecked(false)
        setInactiveChecked(false)
        setallChecked(true)
      }
      if (customerStatus === 'Inactive') {
        setActiveChecked(false)
        setallChecked(false)
        setInactiveChecked(true)
      }
      if (customerStatus === 'Active') {
        setInactiveChecked(false)
        setallChecked(false)
        setActiveChecked(true)
      }
    }

    if (tableType === 'Requests') {
      if (requestStatus === 'All') {
        setInReviewRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(false)
        setAllRequestStatusOptionChecked(true)
      }
      if (requestStatus === 'Draft') {
        setAllRequestStatusOptionChecked(false)
        setInReviewRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(true)
      }
      if (requestStatus === 'In-Review') {
        setAllRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(false)
        setInReviewRequestStatusOptionChecked(true)
      }

      if (requestStatus === 'In Issue') {
        setAllRequestStatusOptionChecked(false)
        setInReviewRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(true)
      }
      if (requestStatus === 'Interim Approval') {
        setAllRequestStatusOptionChecked(false)
        setInReviewRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(true)
      }
      if (requestStatus === 'Approved') {
        setAllRequestStatusOptionChecked(false)
        setInReviewRequestStatusOptionChecked(false)
        setInIssueRequestStatusOptionChecked(false)
        setInterimApprovalRequestStatusOptionChecked(false)
        setDraftRequestStatusOptionChecked(false)
        setApprovedRequestStatusOptionChecked(true)
      }
    }
  }, [customerStatus, tableType, requestStatus])
  // console.log(customers)

  return (
    <>
      {showCustomerModal && <ViewCustomerModal customer={customer} setShowCustomerModal={setShowCustomerModal} />}

      <div className=' relative mt-[3%]  mx-4 overflow-auto h-[300px] overflow-auto '>
        <table className='w-full text-sm text-left table-auto '>
          <thead className='text-xs uppercase     '>
            <tr className='  '>
              {tableType === 'All Customers'
                ? customerTableHeads.map((tableHead) => (
                    <th key={tableHead} className='py-3 relative   text-common-title'>
                      {tableHead === 'NAME/ID' ? (
                        <span
                          onClick={() => {
                            // dispatch(sortCustomersAlphabetically() as any)
                          }}
                          className='border-l border-common-title px-2 cursor-pointer'
                        >
                          {tableHead}
                        </span>
                      ) : (
                        <span className='border-l border-common-title px-2'>{tableHead}</span>
                      )}
                      {tableHead === 'State' ? (
                        <img src={Filter} onClick={filterStateHandler} alt='' className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                      ) : null}
                      {ShowFilterStateOptions && tableHead === 'State' && (
                        <div
                          ref={filterStateOptionsRef}
                          className='   absolute z-40 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
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
                                      <Checkbox
                                        checked={allChecked}
                                        setChecked={setallChecked}
                                        externalFunctionToDoSomething={checkIfCustomerStatusOptionChecked.bind(null, 'All')}
                                      />
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
                                  // onClick={filterStateHandler.bind(null, option)}
                                >
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={activeChecked}
                                        setChecked={setActiveChecked}
                                        externalFunctionToDoSomething={checkIfCustomerStatusOptionChecked.bind(null, 'Active')}
                                      />
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
                                  // onClick={filterStateHandler.bind(null, option)}
                                >
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={inactiveChecked}
                                        setChecked={setInactiveChecked}
                                        externalFunctionToDoSomething={checkIfCustomerStatusOptionChecked.bind(null, 'Inactive')}
                                      />
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
                                <div key={index} className='  px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
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
                                <div key={index} className='cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
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
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
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
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
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
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
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
                      {tableHead === 'Status' ? (
                        <img src={Filter} alt='' onClick={filterRequestStatusHandler} className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                      ) : null}
                      {showFilterRequestStatusOptions && tableHead === 'Status' && (
                        <div
                          ref={filterRequestStatusOptionsRef}
                          className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                        >
                          {filterRequestStatus?.map((option: requestStatusType, index) => {
                            if (option === 'Select all') {
                              return (
                                <div key={index} className='  px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setAllRequestStatusOptionChecked}
                                        checked={allRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'Select all')}
                                      />
                                    </span>
                                    [ Select all]
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Approved') {
                              return (
                                <div key={index} className='cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setApprovedRequestStatusOptionChecked}
                                        checked={approvedRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'Approved')}
                                      />
                                    </span>
                                    Approved
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Interim Approval') {
                              return (
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setInterimApprovalRequestStatusOptionChecked}
                                        checked={interimApprovalRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'Interim Approval')}
                                      />
                                    </span>
                                    Interim Approval
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'In-Review') {
                              return (
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setInReviewRequestStatusOptionChecked}
                                        checked={inReviewRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'In-Review')}
                                      />
                                    </span>
                                    In-Review
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'In Issue') {
                              return (
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setInIssueRequestStatusOptionChecked}
                                        checked={inIssueRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'In Issue')}
                                      />
                                    </span>
                                    In Issue
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Draft') {
                              return (
                                <div key={index} className=' cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        setChecked={setDraftRequestStatusOptionChecked}
                                        checked={draftRequestStatusOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestStatusOptionChecked.bind(null, 'Draft')}
                                      />
                                    </span>
                                    Draft
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
            </tr>
          </thead>
          {AllCustomers?.loading ? (
            <tbody className=' '>
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[300px]      flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
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
                        {/* {customer.customer_profiles.firstName} {customer.customer_profiles.surname} */}
                        <span className='text-common-title'>{getCustomerDetail(customer, 'customerEntityId')}</span>
                        {/* <span className='text-common-title'>{customer.customer_profiles.customerEntityId}</span> */}
                      </td>
                      <td className='py-2 px-2'>{getCustomerDetail(customer, 'mobileNumber')}</td>
                      {/* <td className='py-2 px-2'>{customer.customer_profiles.mobileNumber}</td> */}
                      <td className='py-2 px-2'>{getCustomerDetail(customer, 'emailAddress')}</td>
                      {/* <td className='py-2 px-2'>{customer.customer_profiles.emailAddress}</td> */}
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
                                    // here
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
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[300px]      flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
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
                          <td className='py-2 px-2 text-[#1E0A3C] '>
                            <span
                              className={` ${request.status === 'Approved' ? 'bg-[#D4F7DC] text-[#15692A]' : null} ${
                                request.status === 'In-Review' ? 'bg-[#F0F5FF] text-[#0050C8]' : null
                              }
                            ${request.status === 'In Issue' ? 'bg-[#FFD4D2] text-[#9F1F17]' : null}
                            ${request.status === 'Interim Approval' ? 'bg-[#FFF8CC] text-[#806B00]' : null}
                            ${request.status === 'Draft' ? 'bg-[#E5E5EA] text-[#1E0A3C]' : null}
                            p-1 rounded font-medium flex w-fit  gap-2`}
                            >
                              {request.status} <img src={Eye} alt='' />
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
    </>
  )
}

export default CustomerManagementTable
