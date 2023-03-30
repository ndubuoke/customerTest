import { arrow, caret, chevron, Disable, Download, Edit, ellipse, Eye, Filter, greaterThan, Menu, Plus, redCaret, Refresh } from 'Assets/svgs'
import CustomerManagementTable from 'Components/CustomerManagement/CustomerManagementTable'
import DeactivationModal from 'Components/CustomerManagement/DeactivationModal'
import { QuickLinks } from 'Components/Shareables'
import axios from 'axios'
import React, { memo, useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  getCustomersAction,
  getCustomersRequestsAction,
  getTotalRequestStatusCustomersAction,
  getRequestsForCheckerAction,
  getCustomerByNameAction,
} from '../redux/actions/CustomerManagement.actions'
import { ReducersType } from '../redux/store'
import { customersManagementResponseType } from '../redux/reducers/CustomerManagement.reducer'
import { AppRoutes } from 'Routes/AppRoutes'
import SystemAlert from 'Components/CustomerManagement/SystemAlert'
import { UserProfileTypes } from '../redux/reducers/UserPersmissions/UserPersmissions'
import SearchBar from 'Components/CustomerManagement/SearchBar'
import { clearAllItemsInStorageForCustomerMGT, STORAGE_NAMES } from 'Utilities/browserStorages'
import * as XLSX from 'xlsx'
import Spinner from 'Components/Shareables/Spinner'
import SearchBarModal from '../components/CustomerManagement/searchBarModal'
import ViewCustomerModal from 'Components/CustomerManagement/ViewCustomerModal'

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
  const searchBarModalRef = useRef(initialRef)
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
  const customerByName = useSelector<ReducersType>((state: ReducersType) => state?.customerByName) as customersManagementResponseType

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
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [customer, setCustomer] = useState() as any
  // const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  const [showSystemAlert, setShowSystemAlert] = useState(false)
  const [showCalender, setShowCalender] = useState(false)
  const [customerType, setCustomerType] = useState<customerType>('Individual')
  // const [userRole, setUserRole] = useState('checker')
  const [userRole, setUserRole] = useState<userType>('maker')
  const [searchTerm1, setSearchTerm1] = useState('')
  const [searchTerm2, setSearchTerm2] = useState('')
  const [hideX1, setHideX1] = useState(true)
  const [hideX2, setHideX2] = useState(true)
  const [showSearchBarModal, setShowSearchBarModal] = useState(false)
  const [quickLink, setQuickLink] = useState([])

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
      if (showSearchBarModal && searchBarModalRef.current && !searchBarModalRef.current.contains(e.target)) {
        setShowSearchBarModal(false)
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
    showSearchBarModal,
  ])

  const viewCustomerModalHandler = (customer) => {
    setShowCustomerModal(true)
    setCustomer(customer)
  }

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

  const searchBarHandler = (e) => {
    //  if space bar is initially clicked dont do anything
    if (searchTerm1 == '' && e.nativeEvent.data == ' ') {
      return
    } else {
      setSearchTerm1(e.target.value)
      setHideX1(false)
    }
  }

  const searchBar2Handler = (e) => {
    //  if space bar is initially clicked dont do anything
    if (searchTerm2 == '' && e.nativeEvent.data == ' ') {
      return
    } else {
      setSearchTerm2(e.target.value)
      setHideX2(false)
    }
  }

  useEffect(() => {
    if (searchTerm2 == '') {
      return setShowSearchBarModal(false)
    }
    const timer = setTimeout(() => {
      dispatch(getCustomerByNameAction(searchTerm2) as any)

      setShowSearchBarModal(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm2])

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
    const source = axios.CancelToken.source()

    const fetchQuickLinks = async () => {
      try {
        const response = await axios.get(`https://utilities-api-dev.reventtechnologies.com/v1/quick-link/all/CustomerMgt`, {
          cancelToken: source.token,
        })
        console.log(response)
        if (response.status === 200) {
          setQuickLink(response.data.data)
          console.log(response.data.data)
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled')
        } else {
          console.log(error)
        }
      }
    }

    fetchQuickLinks()

    return () => {
      source.cancel('Component unmounted')
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
      {showCustomerModal && <ViewCustomerModal customer={customer} setShowCustomerModal={setShowCustomerModal} />}

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

        <div className='flex justify-between px-4 mt-10 '>
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

          <div className='relative'>
            <SearchBar searchTerm={searchTerm2} setSearchTerm={setSearchTerm2} hideX={hideX2} setHideX={setHideX2} onChange={searchBar2Handler} />
            {showSearchBarModal && (
              <SearchBarModal
                searchBarModalRef={searchBarModalRef}
                externalFunctionToDoSomething={viewCustomerModalHandler}
                response={customerByName}
              />
            )}
          </div>
        </div>
        <div className='px-4 py-4 bg-background-default h-fit'>
          <div className='flex '>
            <div className='flex flex-col w-full mr-4 '>
              <div className=' bg-white flex h-[8.125rem] rounded-md '>
                <div className='flex flex-col  border w-[18%] rounded-l-md'>
                  <button
                    className={`${
                      nextLevelButtonId === 1 ? 'font-bold' : 'bg-[#EFEFEF] '
                    } flex items-center pl-[20%] relative h-[50%]     py-2 text-text-secondary `}
                    onClick={nextLevelButtonHandler.bind(null, 1)}
                  >
                    {nextLevelButtonId === 1 && <img className='absolute left-1' src={redCaret} />}
                    {userRole === 'checker' && <span className=''>Records </span>}
                    {userRole === 'maker' && <span className=''>All Customers </span>}
                  </button>
                  <button
                    className={`${
                      nextLevelButtonId === 2 ? 'font-bold' : 'bg-[#EFEFEF] '
                    } flex   items-center  pl-[20%] relative h-[50%]    py-2 text-text-secondary`}
                    onClick={nextLevelButtonHandler.bind(null, 2)}
                  >
                    {nextLevelButtonId === 2 && <img className='absolute left-1' src={redCaret} />}
                    <span className=''>Requests</span>
                  </button>
                </div>
                <div className=' w-full pl-[5%]  '>
                  <div className='flex h-full  '>
                    <div className=' my-6 h-[60%] '>
                      {nextLevelButtonId === 1 && customermanagementTableType === 'All Customers' ? (
                        <div className='flex  gap-2   h-[100%] '>
                          <div
                            onClick={customerStatusHandler.bind(null, 'All')}
                            className={`  flex flex-col p-4  cursor-pointer hover:border hover:border-[#EFEFEF]  rounded-md border border-transparent    ${
                              customerStatus === 'All' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            <span className='text-[.875rem]  font-bold   '>All</span>
                            <h3 className='font-bold text-[1.5rem] '>
                              {customerStatusResponsedata ? customerStatusResponsedata?.active + customerStatusResponsedata?.inactive : ''}
                            </h3>
                          </div>
                          <div className='border'></div>
                          <div
                            onClick={customerStatusHandler.bind(null, 'Active')}
                            className={`flex flex-col  p-4 cursor-pointer rounded-md hover:border border border-transparent   hover:border-[#EFEFEF] ${
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
                            className={`flex flex-col  p-4 cursor-pointer rounded-md  border border-transparent hover:border hover:border-[#EFEFEF]  ${
                              customerStatus === 'Inactive' ? 'bg-[#EFEFEF]' : ''
                            }`}
                          >
                            <span className='text-[.875rem] text-[#AAAAAA]'>Inactive</span>
                            <h3 className='font-bold text-[1.5rem]'>{customerStatusResponsedata?.inactive}</h3>
                          </div>
                        </div>
                      ) : null}
                      {nextLevelButtonId === 2 && customermanagementTableType === 'Requests' ? (
                        <div className='flex gap-2   h-[100%]'>
                          <div
                            onClick={requestStatusHandler.bind(null, 'All', '')}
                            className={` p-4 cursor-pointer flex flex-col  h-full border border-transparent  hover:border rounded-md hover:border-[#EFEFEF] ${
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
                            className={` p-4 cursor-pointer rounded-md flex flex-col border border-transparent  hover:border hover:border-[#EFEFEF]  ${
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
                                className={` p-4 cursor-pointer rounded-md flex flex-col border border-transparent  hover:border hover:border-[#EFEFEF]  ${
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
                                className={` p-4 cursor-pointer rounded-md flex flex-col border border-transparent  hover:border hover:border-[#EFEFEF]  ${
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
                                className={` p-4 cursor-pointer flex flex-col  rounded-md border border-transparent hover:border hover:border-[#EFEFEF]  ${
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
                                } p-4 cursor-pointer flex flex-col  rounded-md border border-transparent hover:border hover:border-[#EFEFEF] `}
                              >
                                <span className='text-[.875rem] text-[#D4A62F]'>Interim Approval</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.InterimApproval}</h3>
                              </div>
                              <div className='border'></div>

                              <div
                                onClick={requestStatusHandler.bind(null, 'In Issue', '')}
                                className={` ${
                                  requestStatus === 'In Issue' ? 'bg-[#EFEFEF]' : ''
                                } p-4 cursor-pointer flex flex-col  rounded-md border border-transparent hover:border hover:border-[#EFEFEF] `}
                              >
                                <span className='text-[.875rem] text-[#CF2A2A]'>In-Issue</span>
                                <h3 className='font-bold text-[1.5rem]'>{allRequests?.serverResponse?.data?.InIssue}</h3>
                              </div>
                              <div className='border'></div>

                              <div
                                onClick={requestStatusHandler.bind(null, 'Draft', '')}
                                className={` ${
                                  requestStatus === 'Draft' ? 'bg-[#EFEFEF]' : ''
                                } p-4 cursor-pointer flex flex-col  rounded-md border border-transparent hover:border hover:border-[#EFEFEF] `}
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
                  <SearchBar
                    searchTerm={searchTerm1}
                    setSearchTerm={setSearchTerm1}
                    hideX={hideX1}
                    setHideX={setHideX1}
                    onChange={searchBarHandler}
                  />
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
                  searchTerm={searchTerm1}
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
                  customer={customer}
                  setCustomer={setCustomer}
                  setShowCustomerModal={setShowCustomerModal}
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
                // links={[
                //   { urlName: 'Customer 360', url: '/customer-management/customer-360' },
                //   { urlName: 'Link2', url: '/customer-management/customer-360', disabled: true },
                // ]}
                links={quickLink}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
