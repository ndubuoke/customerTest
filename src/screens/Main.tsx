import { arrow, caret, chevron, Disable, Download, Edit, ellipse, Eye, Filter, greaterThan, Menu, Plus, redCaret, Refresh } from 'Assets/svgs'
import CustomerManagementTable from 'Components/CustomerManagement/CustomerManagementTable'
import DeactivationModal from 'Components/CustomerManagement/DeactivationModal'
import { QuickLinks } from 'Components/Shareables'

import React, { memo, useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  getCustomersAction,
  getCustomersRequestsAction,
  getTotalRequestStatusCustomersAction,
  getRequestsForCheckerAction,
} from '../redux/actions/CustomerManagement.actions'
import { ReducersType } from '../redux/store'
import { customersManagementResponseType } from '../redux/reducers/CustomerManagement.reducer'
import { AppRoutes } from 'Routes/AppRoutes'
import SystemAlert from 'Components/CustomerManagement/SystemAlert'
import { UserProfileTypes } from '../redux/reducers/UserPersmissions/UserPersmissions'
import SearchBar from 'Components/CustomerManagement/SearchBar'
import { clearAllItemsInStorageForCustomerMGT, STORAGE_NAMES } from 'Utilities/browserStorages'
import * as XLSX from 'xlsx'

type Props = {}

const customerTypeoptions = ['Individual', 'SME']
const customersDropdownStatusOptionsMaker = ['Created by me', 'Created by my team', 'Created system-wide']
const customersDropdownStatusOptionsChecker = ['Approved by me', 'Approved by my team', 'Approved system-wide']
const requestsDropdownStatusOptionsMaker = ['Initiated by me', 'Initiated by my team', 'Initiated system-wide']
const requestsDropdownStatusOptionsChecker = ['Sent to me', 'Sent to my team', 'Sent system-wide']
type DropdownSelectedStatusType =
  | 'Created by me'
  | 'Created by my team'
  | 'Created system-wide'
  | 'Initiated by me'
  | 'Initiated by my team'
  | 'Initiated system-wide'
type customerStatus = 'All' | 'Active' | 'Inactive'
type requestStatusType = 'All' | 'Approved' | 'In Issue' | 'In-Review' | 'Interim Approval' | 'Draft' | 'Pending' | 'Rejected'
type requestType = '' | 'Creation' | 'Modification' | 'Deactivation' | 'Reactivation'
type customerType = 'Individual' | 'SME'
type tableType = 'All Customers' | 'Requests' | null
// const requestStatus = ['Select all', 'Approved', 'Interim Approval', 'In-Review', 'In-Issue']

const Main = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialRef: any = null
  const statusListRef = useRef(initialRef)
  const createCustomerListRef = useRef(initialRef)
  const customerFunctionListRef = useRef(initialRef)
  const requestFunctionListRef = useRef(initialRef)
  const filterStateOptionsRef = useRef(initialRef)
  const filterTypeOptionsRef = useRef(initialRef)
  const filterDateRef = useRef(initialRef)
  const filterInitiatorOptionsRef = useRef(initialRef)
  const filterRequestStatusOptionsRef = useRef(initialRef)
  const AllCustomers = useSelector<ReducersType>((state: ReducersType) => state?.allCustomers) as customersManagementResponseType

  const allRequests = useSelector<ReducersType>((state: ReducersType) => state?.allRequests) as customersManagementResponseType
  const userData = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes
  const totalStatusCustomers = useSelector<ReducersType>((state: ReducersType) => state?.totalStatusCustomers) as customersManagementResponseType
  const allRequestsForChecker = useSelector<ReducersType>((state: ReducersType) => state?.allRequestsForChecker) as customersManagementResponseType
  type userType = 'maker' | 'checker'
  const [showLists, setShowLists] = useState(false)
  const [customermanagementTableType, setCustomerManagementTableType] = useState<tableType>(null)
  const [customerStatus, setCustomerStatus] = useState<customerStatus>('All')
  const [requestStatus, setRequestStatus] = useState<requestStatusType>('All')
  const [requestTypeName, setRequestTypeName] = useState<requestType>('')
  const [showStatusLists, setShowStatusLists] = useState(false)
  const [showCustomerFunctionOptions, setShowCustomerFunctionOptions] = useState(false)
  const [showRequestFunctionOptions, setShowRequestFunctionOptions] = useState(false)
  const [ShowFilterStateOptions, setShowFilterStateOptions] = useState(false)
  const [showFilterRequestStatusOptions, setShowFilterRequestStatusOptions] = useState(false)
  const [ShowFilterTypeOptions, setShowFilterTypeOptions] = useState(false)
  const [ShowFilterInitiatorOptions, setShowFilterInitiatorOptions] = useState(false)
  const [customersSelectedStatus, setCustomersSelectedStatus] = useState<DropdownSelectedStatusType>(null)
  const [requestsSelectedStatus, setRequestsSelectedStatus] = useState('')
  const [nextLevelButtonId, setNextLevelButtonId] = useState(1)
  // const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  const [showSystemAlert, setShowSystemAlert] = useState(false)
  const [showCalender, setShowCalender] = useState(false)
  const [customerType, setCustomerType] = useState<customerType>('Individual')
  // const [userRole, setUserRole] = useState('checker')
  const [userRole, setUserRole] = useState<userType>('maker')
  const [searchTerm, setSearchTerm] = useState('')

  const customerStatusResponsedata = AllCustomers?.serverResponse?.data

  const handleSelectForm = (list) => {
    clearAllItemsInStorageForCustomerMGT()

    sessionStorage.setItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_FORM_MODE_STATUS, JSON.stringify('creation'))
    if (list === 'Individual') {
      navigate(AppRoutes.individualCustomerCreationScreen)
    } else if (list === 'SME') {
      navigate(AppRoutes.SMECustomerCreationScreen)
    }
  }

  const statusSelectForm = (list: DropdownSelectedStatusType) => {
    if (customermanagementTableType === 'All Customers') {
      setCustomersSelectedStatus(list)
      if (list === 'Created by me') {
        dispatch(getCustomersAction(customerType, '', '', userData.user?.id) as any)
      }
      if (list === 'Created by my team') {
        dispatch(getCustomersAction(customerType) as any)
      }
      if (list === 'Created system-wide') {
        dispatch(getCustomersAction(customerType) as any)
      }
    }
    if (customermanagementTableType === 'Requests') {
      setRequestsSelectedStatus(list)
      if (list === 'Initiated by me') {
        dispatch(getCustomersRequestsAction(customerType, '', '', userData.user?.id) as any)
      }
      if (list === 'Initiated by my team') {
        dispatch(getCustomersRequestsAction(customerType) as any)
      }
      if (list === 'Initiated system-wide') {
        dispatch(getCustomersRequestsAction(customerType) as any)
      }
    }
    setShowStatusLists(false)
  }
  const highLevelButtonHandler = (customerType: customerType) => {
    setCustomerStatus('All')
    setRequestStatus('All')
    if (customerType === 'Individual') {
      setCustomerType('Individual')
      dispatch(getCustomersAction(customerType) as any)
    }
    if (customerType === 'SME') {
      setCustomerType('SME')
      dispatch(getCustomersAction(customerType) as any)
    }
  }
  const nextLevelButtonHandler = (id) => {
    setNextLevelButtonId(id)
    if (id === 1) {
      setCustomerManagementTableType('All Customers')
      dispatch(getCustomersRequestsAction(customerType) as any)
      setTimeout(() => {
        setShowSystemAlert(true)
      }, 3000)
    }
    if (id === 2) {
      setCustomerManagementTableType('Requests')
    }
  }
  // const setShowDeactivationModalHandler = (customerId) => {
  //   //  alert(customerId)
  //   setShowDeactivationModal(true)
  // }
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showStatusLists && statusListRef.current && !statusListRef.current.contains(e.target)) {
        setShowStatusLists(false)
      }
      if (showCustomerFunctionOptions && customerFunctionListRef.current && !customerFunctionListRef.current.contains(e.target)) {
        setShowCustomerFunctionOptions(false)
      }
      if (showRequestFunctionOptions && requestFunctionListRef.current && !requestFunctionListRef.current.contains(e.target)) {
        setShowRequestFunctionOptions(false)
      }
      if (ShowFilterStateOptions && filterStateOptionsRef.current && !filterStateOptionsRef.current.contains(e.target)) {
        setShowFilterStateOptions(false)
      }
      if (ShowFilterTypeOptions && filterTypeOptionsRef.current && !filterTypeOptionsRef.current.contains(e.target)) {
        setShowFilterTypeOptions(false)
      }
      if (ShowFilterInitiatorOptions && filterInitiatorOptionsRef.current && !filterInitiatorOptionsRef.current.contains(e.target)) {
        setShowFilterInitiatorOptions(false)
      }
      if (showFilterRequestStatusOptions && filterRequestStatusOptionsRef.current && !filterRequestStatusOptionsRef.current.contains(e.target)) {
        setShowFilterRequestStatusOptions(false)
      }
      if (showCalender && filterDateRef.current && !filterDateRef.current.contains(e.target)) {
        setShowCalender(false)
      }
      if (showLists && createCustomerListRef.current && !createCustomerListRef.current.contains(e.target)) {
        setShowLists(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [
    showStatusLists,
    showCustomerFunctionOptions,
    ShowFilterStateOptions,
    ShowFilterTypeOptions,
    ShowFilterInitiatorOptions,
    showFilterRequestStatusOptions,
    showRequestFunctionOptions,
    showCalender,
    showLists,
  ])

  const refreshTableHandler = () => {
    if (customermanagementTableType === 'All Customers') {
      if (customerStatus === 'All') {
        return dispatch(getCustomersAction(customerType) as any)
      }
      dispatch(getCustomersAction(customerType, customerStatus) as any)
    }
    if (customermanagementTableType === 'Requests') {
      if (userRole === 'maker') {
        if (requestStatus === 'All') {
          return dispatch(getCustomersRequestsAction(customerType) as any)
        }
        dispatch(getCustomersRequestsAction(customerType, requestStatus) as any)
      }
      if (userRole === 'checker') {
        if (requestStatus === 'All') {
          return dispatch(getRequestsForCheckerAction('', customerType) as any)
        }
        dispatch(getRequestsForCheckerAction(customerType, requestStatus) as any)
      }
    }
  }

  const customerStatusHandler = (status: customerStatus) => {
    if (status === 'All') {
      setCustomerStatus(status)
      dispatch(getCustomersAction(customerType) as any)
    }
    if (status === 'Active') {
      setCustomerStatus(status)
      dispatch(getCustomersAction(customerType, 'Active') as any)
    }
    if (status === 'Inactive') {
      setCustomerStatus(status)
      dispatch(getCustomersAction(customerType, 'Inactive') as any)
    }
  }

  const requestStatusHandler = (status: requestStatusType, requestType: requestType) => {
    if (status === 'All') {
      setRequestStatus(status)

      if (userRole === 'maker') {
        return dispatch(getCustomersRequestsAction(customerType, '', requestType) as any)
      }
      if (userRole === 'checker') {
        return dispatch(getRequestsForCheckerAction('', customerType, requestType) as any)
      }
    }

    if (status === 'Draft') {
      setRequestStatus(status)
      return dispatch(getCustomersRequestsAction(customerType, 'Draft', requestType) as any)
    }
    if (status === 'In Issue') {
      setRequestStatus(status)

      return dispatch(getCustomersRequestsAction(customerType, 'In Issue', requestType) as any)
    }

    if (status === 'In-Review') {
      setRequestStatus(status)
      return dispatch(getCustomersRequestsAction(customerType, 'In-Review', requestType) as any)
    }
    if (status === 'Interim Approval') {
      setRequestStatus(status)
      return dispatch(getCustomersRequestsAction(customerType, 'Interim Approval', requestType) as any)
    }
    if (status === 'Pending') {
      setRequestStatus(status)
      return dispatch(getRequestsForCheckerAction('Pending', customerType, requestType) as any)
    }

    if (status === 'Approved') {
      setRequestStatus(status)
      if (userRole === 'maker') {
        return dispatch(getCustomersRequestsAction(customerType, 'Approved', requestType) as any)
      }
      if (userRole === 'checker') {
        return dispatch(getRequestsForCheckerAction('Approved', customerType, requestType) as any)
      }
    }
    if (status === 'Rejected') {
      setRequestStatus(status)
      return dispatch(getRequestsForCheckerAction('Rejected', customerType, requestType) as any)
    }
  }

  const downloadCustomersDataHandler = () => {
    let data = undefined
    if (customermanagementTableType === 'All Customers') {
      data = AllCustomers?.serverResponse?.data?.customer.map((c) => {
        return c?.customer_profiles[0]
      })
    }
    if (customermanagementTableType === 'Requests') {
      // data = allRequests?.serverResponse?.data?.customer.map((c) => {
      //   return c?.customer_profiles[0]
      // })

      data = allRequests.serverResponse.data?.res.map((c) => {
        return c
      })
    }

    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Details')
    XLSX.writeFile(wb, 'Customer Details.csv')
  }

  useEffect(() => {
    if (userRole === 'checker') {
      setNextLevelButtonId(2)
      setCustomerManagementTableType('Requests')
    }
    if (userRole === 'maker') {
      setNextLevelButtonId(1)
      setCustomerManagementTableType('All Customers')
    }
  }, [])

  useEffect(() => {
    if (customermanagementTableType === 'All Customers') {
      if (customerType === 'Individual') {
        dispatch(getCustomersAction(customerType) as any)
        if (userRole === 'maker') {
          dispatch(getTotalRequestStatusCustomersAction('In Issue') as any)
          setTimeout(() => {
            setShowSystemAlert(true)
          }, 3000)
        }

        if (userRole === 'checker') {
          dispatch(getTotalRequestStatusCustomersAction('Interim Approval') as any)
        }
      }
      if (customerType === 'SME') {
        dispatch(getCustomersAction(customerType) as any)
      }
    }

    if (customermanagementTableType === 'Requests') {
      if (userRole === 'maker') {
        dispatch(getCustomersRequestsAction(customerType) as any)
      }
      if (userRole === 'checker') {
        dispatch(getRequestsForCheckerAction('', customerType) as any)
        dispatch(getTotalRequestStatusCustomersAction('Interim Approval') as any)
        setTimeout(() => {
          setShowSystemAlert(true)
        }, 3000)
      }
    }
  }, [customerType, customermanagementTableType, nextLevelButtonId])
  //  console.log(AllCustomers)
  //  console.log(allRequests)
  //  console.log(allRequestsForChecker)
  // console.log(user)
  // console.log(totalStatusCustomers?.serverResponse?.data?.total)

  return (
    <>
      {/* {showDeactivationModal ? <DeactivationModal setShowDeactivationModal={setShowDeactivationModal} /> : null} */}

      {showSystemAlert ? (
        <>
          {userRole === 'maker' && totalStatusCustomers?.serverResponse?.data?.total > 0 ? (
            <SystemAlert
              setShowSystemAlert={setShowSystemAlert}
              message={`${totalStatusCustomers?.serverResponse?.data?.total} customers accounts in issue!
        Kindly review and update.`}
            />
          ) : null}
          {userRole === 'checker' && totalStatusCustomers?.serverResponse?.data?.total > 0 ? (
            <SystemAlert
              setShowSystemAlert={setShowSystemAlert}
              message={`${totalStatusCustomers?.serverResponse?.data?.total} new requests submitted for approval since last login. Kindly review and update.`}
            />
          ) : null}
        </>
      ) : null}

      <div className='  flex flex-col bg-[#FFFFFF] '>
        <div className=' flex w-[62.5rem] mt-10 pl-6 items-center'>
          <h1 className='text-[#636363] text-[2.375rem] font-bold'>Customer Management</h1>

          {userRole === 'maker' && (
            <div className='relative ml-6 ' ref={createCustomerListRef}>
              <button
                className='flex items-center justify-between px-2 py-1 rounded-md cursor-pointer bg-primay-main'
                onClick={() => setShowLists(true)}
              >
                <span>
                  <img src={Plus} className='' />
                </span>
                <div>
                  {/* {selectedList} */}
                  <span className={`text-white`}>Create New Customer</span>
                </div>
              </button>
              {showLists && (
                <div className='absolute top-0 z-20 flex flex-col w-full border rounded-md bg-background-paper'>
                  {customerTypeoptions?.map((list, index) => {
                    return (
                      <div key={index} className='hover:bg-[#FFD4D2] cursor-pointer px-3 py-2' onClick={handleSelectForm.bind(null, list)}>
                        {list}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className='flex justify-between px-6 mt-10 '>
          <div>
            <button
              className={` ${
                customerType === 'Individual'
                  ? 'border-b-4 border-b-primay-main font-bold text-[1.25rem] text-black'
                  : 'text-[.875rem] text-text-secondary'
              } `}
              onClick={highLevelButtonHandler.bind(null, 'Individual')}
            >
              Individual Customers
            </button>
            <button
              className={` ${
                customerType === 'SME' ? 'border-b-4 border-b-primay-main font-bold text-[1.25rem] text-black' : 'text-[.875rem] text-text-secondary'
              } ml-4`}
              onClick={highLevelButtonHandler.bind(null, 'SME')}
            >
              SMEs
            </button>
          </div>

          <div>
            <div className='relative w-[15.625rem]'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 '
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
              <input
                type='search'
                className='block w-full py-1 pl-10 text-sm text-gray-900 border border-b-2 border-gray-300'
                placeholder='Search for Customer'
              />
            </div>
          </div>
        </div>
        <div className='px-4 py-4 bg-background-default h-fit'>
          <div className='flex '>
            <div className='flex flex-col w-full mr-4 '>
              <div className=' bg-white flex h-[8.125rem] rounded-md '>
                <div className='flex flex-col  border w-[18%] rounded-l-md'>
                  <button
                    className={`${
                      nextLevelButtonId === 1 ? 'bg-[#EFEFEF] font-bold' : ''
                    } flex items-center pl-[25%] relative h-[50%]     py-2 text-text-secondary `}
                    onClick={nextLevelButtonHandler.bind(null, 1)}
                  >
                    {nextLevelButtonId === 1 && <img className='absolute left-1' src={redCaret} />}
                    {userRole === 'checker' && <span className=''>Records </span>}
                    {userRole === 'maker' && <span className=''>All Customers </span>}
                  </button>
                  <button
                    className={`${
                      nextLevelButtonId === 2 ? 'bg-[#EFEFEF] font-bold' : ''
                    } flex   items-center  pl-[25%] relative h-[50%]    py-2 text-text-secondary`}
                    onClick={nextLevelButtonHandler.bind(null, 2)}
                  >
                    {nextLevelButtonId === 2 && <img className='absolute left-1' src={redCaret} />}
                    <span className=''>Requests</span>
                  </button>
                </div>
                <div className=' w-full pl-[5%]  '>
                  <div className='flex h-full '>
                    <div className=' w-[80%] mt-6 '>
                      {nextLevelButtonId === 1 && customermanagementTableType === 'All Customers' ? (
                        <div className='flex gap-2 '>
                          <div
                            onClick={customerStatusHandler.bind(null, 'All')}
                            className={`flex flex-col py-1 px-4 cursor-pointer rounded-md hover:border hover:border-[#EFEFEF]  ${
                              customerStatus === 'All' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            <span className='text-[.875rem]  font-bold'>All</span>
                            <h3 className='font-bold text-[1.5rem] '>
                              {customerStatusResponsedata ? customerStatusResponsedata?.active + customerStatusResponsedata?.inactive : ''}
                            </h3>
                          </div>
                          <div className='border'></div>
                          <div
                            onClick={customerStatusHandler.bind(null, 'Active')}
                            className={`flex flex-col items-center justify-center py-1 px-4 cursor-pointer rounded-md hover:border hover:border-[#EFEFEF] ${
                              customerStatus === 'Active' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            {' '}
                            <span className='text-[.875rem] text-[#2FB755]'>Active</span>
                            <h3 className='font-bold text-[1.5rem]'>{customerStatusResponsedata?.active}</h3>
                          </div>
                          <div className='border'></div>

                          <div
                            onClick={customerStatusHandler.bind(null, 'Inactive')}
                            className={`flex flex-col items-center justify-center py-1 px-4 cursor-pointer rounded-md hover:border hover:border-[#EFEFEF]  ${
                              customerStatus === 'Inactive' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            <span className='text-[.875rem] text-[#AAAAAA]'>Inactive</span>
                            <h3 className='font-bold text-[1.5rem]'>{customerStatusResponsedata?.inactive}</h3>
                          </div>
                        </div>
                      ) : null}
                      {nextLevelButtonId === 2 && customermanagementTableType === 'Requests' ? (
                        <div className='flex gap-2 '>
                          <div
                            onClick={requestStatusHandler.bind(null, 'All', '')}
                            className={` py-1 px-4 cursor-pointer flex flex-col justify-center items-center hover:border rounded-md hover:border-[#EFEFEF] ${
                              requestStatus === 'All' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            <span className='text-[.875rem] font-bold'>All</span>
                            {userRole === 'maker' && <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.total}</h3>}
                            {userRole === 'checker' && (
                              <h3 className='font-bold text-[1.5rem]'>{allRequestsForChecker?.serverResponse?.data?.total}</h3>
                            )}
                          </div>
                          <div className='border'></div>
                          <div
                            onClick={requestStatusHandler.bind(null, 'Approved', '')}
                            className={` py-1 px-4 cursor-pointer rounded-md flex flex-col justify-center items-center hover:border hover:border-[#EFEFEF]  ${
                              requestStatus === 'Approved' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            {' '}
                            <span className='text-[.875rem] text-[#2FB755]'>Approved</span>
                            {userRole === 'maker' && <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.Approved}</h3>}
                            {userRole === 'checker' && (
                              <h3 className='font-bold text-[1.5rem]'>{allRequestsForChecker?.serverResponse?.data?.approved}</h3>
                            )}
                          </div>
                          <div className='border'></div>

                          {userRole === 'checker' && (
                            <>
                              <div
                                onClick={requestStatusHandler.bind(null, 'Pending', '')}
                                className={` py-1 px-4 cursor-pointer rounded-md flex flex-col justify-center items-center hover:border hover:border-[#EFEFEF]  ${
                                  requestStatus === 'Pending' ? 'bg-[#EFEFEF]' : ''
                                }`}
                              >
                                {' '}
                                <span className='text-[.875rem] text-[#3FA2F7]'>Pending</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequestsForChecker?.serverResponse?.data?.pending}</h3>
                              </div>
                              <div className='border'></div>
                              <div
                                onClick={requestStatusHandler.bind(null, 'Rejected', '')}
                                className={` py-1 px-4 cursor-pointer rounded-md flex flex-col justify-center items-center hover:border hover:border-[#EFEFEF]  ${
                                  requestStatus === 'Rejected' ? 'bg-[#EFEFEF]' : ''
                                }`}
                              >
                                {' '}
                                <span className='text-[.875rem] text-[#CF2A2A]'>Rejected</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequestsForChecker?.serverResponse?.data?.rejected}</h3>
                              </div>
                            </>
                          )}

                          {userRole === 'maker' && (
                            <>
                              <div
                                onClick={requestStatusHandler.bind(null, 'In-Review', '')}
                                className={` py-1 px-4 cursor-pointer flex flex-col justify-center items-center rounded-md hover:border hover:border-[#EFEFEF]  ${
                                  requestStatus === 'In-Review' ? 'bg-[#EFEFEF]' : ''
                                }`}
                              >
                                <span className='text-[.875rem] text-[#3FA2F7]'>In-Review</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.InReview}</h3>
                              </div>
                              <div className='border'></div>

                              <div
                                onClick={requestStatusHandler.bind(null, 'Interim Approval', '')}
                                className={` ${
                                  requestStatus === 'Interim Approval' ? 'bg-[#EFEFEF]' : ''
                                } py-1 px-4 cursor-pointer flex flex-col justify-center items-center rounded-md hover:border hover:border-[#EFEFEF] `}
                              >
                                <span className='text-[.875rem] text-[#D4A62F]'>Interim Approval</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.InterimApproval}</h3>
                              </div>
                              <div className='border'></div>

                              <div
                                onClick={requestStatusHandler.bind(null, 'In Issue', '')}
                                className={` ${
                                  requestStatus === 'In Issue' ? 'bg-[#EFEFEF]' : ''
                                } py-1 px-4 cursor-pointer flex flex-col justify-center items-center rounded-md hover:border hover:border-[#EFEFEF] `}
                              >
                                <span className='text-[.875rem] text-[#CF2A2A]'>In-Issue</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.InIssue}</h3>
                              </div>
                              <div className='border'></div>

                              <div
                                onClick={requestStatusHandler.bind(null, 'Draft', '')}
                                className={` ${
                                  requestStatus === 'Draft' ? 'bg-[#EFEFEF]' : ''
                                } py-1 px-4 cursor-pointer flex flex-col justify-center items-center rounded-md hover:border hover:border-[#EFEFEF] `}
                              >
                                <span className='text-[.875rem] text-[#AAAAAA]'>Draft</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.Draft}</h3>
                              </div>
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>

                    <div className='flex pr-4 mt-2 ml-auto w-fit'>
                      <div className='relative text-sm '>
                        <button
                          className='flex cursor-pointer border border-[#D0D5DD]   rounded-md justify-between px-2 items-center
          py-1'
                          onClick={() => setShowStatusLists(!showStatusLists)}
                        >
                          <div>
                            {customermanagementTableType === 'All Customers' && (
                              <span className={`text-[#252C32]`}>
                                {userRole === 'maker' && (
                                  <>{customersSelectedStatus ? customersSelectedStatus : customersDropdownStatusOptionsMaker[0]}</>
                                )}
                                {userRole === 'checker' && (
                                  <>{customersSelectedStatus ? customersSelectedStatus : customersDropdownStatusOptionsChecker[0]}</>
                                )}
                              </span>
                            )}
                            {customermanagementTableType === 'Requests' && (
                              <span className={`text-[#252C32]`}>
                                {userRole === 'checker' && (
                                  <>{requestsSelectedStatus ? requestsSelectedStatus : requestsDropdownStatusOptionsChecker[0]}</>
                                )}
                                {userRole === 'maker' && (
                                  <>{requestsSelectedStatus ? requestsSelectedStatus : requestsDropdownStatusOptionsMaker[0]}</>
                                )}
                              </span>
                            )}
                          </div>
                          <span>
                            <img src={chevron} className={`${showStatusLists ? 'rotate-180' : ''} transition-all`} />
                          </span>
                        </button>
                        {showStatusLists && (
                          <div ref={statusListRef} className=' w-[180px]  absolute z-20 right-4  bg-background-paper  flex flex-col  border '>
                            {customermanagementTableType === 'All Customers' && (
                              <>
                                {userRole === 'maker' && (
                                  <>
                                    {customersDropdownStatusOptionsMaker?.map((status, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                          onClick={statusSelectForm.bind(null, status)}
                                        >
                                          {status}
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                                {userRole === 'checker' && (
                                  <>
                                    {customersDropdownStatusOptionsChecker?.map((status, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                          onClick={statusSelectForm.bind(null, status)}
                                        >
                                          {status}
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                              </>
                            )}
                            {customermanagementTableType === 'Requests' && (
                              <>
                                {userRole === 'maker' && (
                                  <>
                                    {requestsDropdownStatusOptionsMaker?.map((status, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                          onClick={statusSelectForm.bind(null, status)}
                                        >
                                          {status}
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                                {userRole === 'checker' && (
                                  <>
                                    {requestsDropdownStatusOptionsChecker?.map((status, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                          onClick={statusSelectForm.bind(null, status)}
                                        >
                                          {status}
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-6 bg-white rounded-md '>
                <div className='flex justify-end gap-2 mx-4 mt-2'>
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <div className='border'></div>
                  <div className='flex items-center justify-center px-2 cursor-pointer' onClick={refreshTableHandler}>
                    <img src={Refresh} />
                    <span className='text-sm text-[#636363]'>Refresh Table</span>
                  </div>
                  <div className='border'></div>
                  <div onClick={downloadCustomersDataHandler} className='flex items-center justify-center px-2 cursor-pointer '>
                    <img src={Download} />
                    <span className='text-sm text-[#636363]'>Download</span>
                    {/* <ReactHTMLTableToExcel
                      id='test-table-xls-button'
                      className='w-full rounded download-table-xls-button '
                      table='table-to-xlsx'
                      filename='Customer Management Table Details'
                      sheet='Customer Management Table Details'
                      buttonText={
                        <div className='flex items-center justify-center'>
                          <img src={Download} />
                          <span className='text-sm text-[#636363]'>Download</span>
                        </div>
                      }
                    /> */}
                  </div>
                </div>

                {/* Customer Managament Table */}

                <CustomerManagementTable
                  searchTerm={searchTerm}
                  filterRequestStatusOptionsRef={filterRequestStatusOptionsRef}
                  showFilterRequestStatusOptions={showFilterRequestStatusOptions}
                  setShowFilterRequestStatusOptions={setShowFilterRequestStatusOptions}
                  customerFunctionListRef={customerFunctionListRef}
                  showCustomerFunctionOptions={showCustomerFunctionOptions}
                  setShowCustomerFunctionOptions={setShowCustomerFunctionOptions}
                  requestFunctionListRef={requestFunctionListRef}
                  showRequestFunctionOptions={showRequestFunctionOptions}
                  setShowRequestFunctionOptions={setShowRequestFunctionOptions}
                  tableType={customermanagementTableType}
                  filterStateOptionsRef={filterStateOptionsRef}
                  setShowFilterStateOptions={setShowFilterStateOptions}
                  ShowFilterStateOptions={ShowFilterStateOptions}
                  // setShowDeactivationModal={setShowDeactivationModalHandler}
                  ShowFilterTypeOptions={ShowFilterTypeOptions}
                  filterTypeOptionsRef={filterTypeOptionsRef}
                  setShowFilterTypeOptions={setShowFilterTypeOptions}
                  filterInitiatorOptionsRef={filterInitiatorOptionsRef}
                  setShowFilterInitiatorOptions={setShowFilterInitiatorOptions}
                  ShowFilterInitiatorOptions={ShowFilterInitiatorOptions}
                  selectedStatus={''}
                  AllCustomers={AllCustomers}
                  allRequests={allRequests}
                  customerType={customerType}
                  customerStatus={customerStatus}
                  customerStatusHandler={customerStatusHandler}
                  requestStatusHandler={requestStatusHandler}
                  requestStatus={requestStatus}
                  setShowSystemAlert={setShowSystemAlert}
                  refreshTableHandler={refreshTableHandler}
                  showCalender={showCalender}
                  setShowCalender={setShowCalender}
                  filterDateRef={filterDateRef}
                  userRole={userRole}
                />
              </div>
            </div>
            <div className='hidden w-auto lg:block'>
              <QuickLinks
                links={[
                  { urlName: 'Link1', url: '/customer360' },
                  { urlName: 'Link2', url: '/customer360' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
