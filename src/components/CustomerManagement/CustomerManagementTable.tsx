import { DeleteIcon, Disable, Edit, Eye, Filter, Menu, redDelete } from 'Assets/svgs'
import { Checkbox } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customersManagementResponseType } from 'Redux/reducers/CustomerManagement.reducer'
import { ReducersType } from '../../redux/store'
import { useEffect } from 'react'
import {
  getCustomersRequestsAction,
  deleteRequestAction,
  getCustomersByDateAction,
  getCustomersAction,
  deactivateCustomerAction,
} from '../../redux/actions/CustomerManagement.actions'
import ViewCustomerModal from './ViewCustomerModal'
import getCustomerDetail from '../../utilities/getCustomerDetail'
import RequestModal from './RequestModal'
import CustomerAlertModal from './customerAlertModal'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import Calender from './Calender/Calender'
import CustomerDetailsRow from './CustomerDetailsRow'
import { activateCustomerAction, getRequestsByDateAction, getSingleRequestAction } from '../../redux/actions/CustomerManagement.actions'
import RequestDetailsRow from './RequestDetailsRow'
import getRequestDetail from '../../utilities/getRequestDetail'
import { clearAllItemsInStorageForCustomerMGT, STORAGE_NAMES } from 'Utilities/browserStorages'
import DeactivationModal from './DeactivationModal'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'

type customerTableHeadsType = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
type requestFunctionOptionsType = ['View', 'Withdraw & Delete Request', 'Delete Request', 'Modify', 'Regularize Documents', 'Continue Request']
const customerTableHeads: customerTableHeadsType = ['NAME/ID', 'Phone number', 'Email', 'State', 'updated on']
const requestTableHeads = ['Request', 'TYPE', 'INITIATOR', 'Status', 'updated on']
const customerFunctionOptions = ['View', 'Modify', 'Deactivate', 'Activate']
const requestFunctionOptions: requestFunctionOptionsType = [
  'View',
  'Withdraw & Delete Request',
  'Delete Request',
  'Modify',
  'Regularize Documents',
  'Continue Request',
]
const filterStateOptions = ['Select all', 'Active', 'Inactive']
const filterRequestTypeList = ['Select all', 'Creation', 'Modification', 'Deactivation', 'Reactivation']
type filterRequestType = 'All' | 'Select all' | 'Creation' | 'Modification' | 'Deactivation' | 'Reactivation'
const filterRequestStatus = ['Select all', 'Approved', 'Interim Approval', 'In-Review', 'In Issue', 'Draft', 'Pending', 'Rejected']
type requestStatusType = 'All' | 'Select all' | 'Approved' | 'In Issue' | 'In-Review' | 'Interim Approval' | 'Draft' | 'Pending' | 'Rejected'
const user = 'John Smith '
type customerStatusType = 'All' | 'Active' | 'Inactive'

type CustomerManagementTable = {
  tableType: 'All Customers' | 'Requests'
  customerType: string | 'Individual' | 'SME'
  AllCustomers: any
  allRequests: any
  showCustomerFunctionOptions: boolean
  showCalender: boolean
  selectedStatus: string
  customer: any
  setCustomer: (e) => void
  setShowCustomerFunctionOptions: (e) => void
  customerFunctionListRef: any
  filterStateOptionsRef: any
  filterTypeOptionsRef: any
  filterDateRef: any
  filterRequestStatusOptionsRef: any
  filterInitiatorOptionsRef: any
  requestFunctionListRef: any
  setShowFilterStateOptions: (e) => void
  ShowFilterStateOptions: boolean
  ShowFilterTypeOptions: boolean
  ShowFilterInitiatorOptions: boolean
  showFilterRequestStatusOptions: boolean
  // setShowDeactivationModal: (e) => void
  setShowFilterTypeOptions: (e) => void
  setShowCalender: (e) => void
  setShowFilterInitiatorOptions: (e) => void
  setShowFilterRequestStatusOptions: (e) => void
  customerStatusHandler: (e) => void
  customerStatus: string
  requestStatusHandler: (e, v?) => void
  requestStatus: requestStatusType
  showRequestFunctionOptions: boolean
  setShowRequestFunctionOptions: (e) => void
  setShowSystemAlert: (e) => void
  refreshTableHandler: () => void
  userRole: string
  searchTerm: string

  setShowCustomerModal: (e) => void
}

const CustomerManagementTable = ({
  tableType,
  customerFunctionListRef,
  requestFunctionListRef,
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
  setShowCustomerModal,
  customer,
  setCustomer,
  // setShowDeactivationModal,
  selectedStatus,
  AllCustomers,
  allRequests,
  customerType,
  customerStatusHandler,
  customerStatus,
  requestStatusHandler,
  requestStatus,
  showRequestFunctionOptions,
  setShowRequestFunctionOptions,
  setShowSystemAlert,
  refreshTableHandler,
  showCalender,

  filterDateRef,
  setShowCalender,
  userRole,
  searchTerm,
}: CustomerManagementTable) => {
  const [customerId, setCustomerId] = useState(0)
  const [requestId, setRequestId] = useState(0)
  const [requestIdToBeDeleted, setRequestIdToBeDeleted] = useState('')

  const [allChecked, setallChecked] = useState(false)
  const [activeChecked, setActiveChecked] = useState(false)
  const [inactiveChecked, setInactiveChecked] = useState(false)
  const [approvedRequestStatusOptionChecked, setApprovedRequestStatusOptionChecked] = useState(false)
  const [inIssueRequestStatusOptionChecked, setInIssueRequestStatusOptionChecked] = useState(false)
  const [inReviewRequestStatusOptionChecked, setInReviewRequestStatusOptionChecked] = useState(false)
  const [interimApprovalRequestStatusOptionChecked, setInterimApprovalRequestStatusOptionChecked] = useState(false)
  const [draftRequestStatusOptionChecked, setDraftRequestStatusOptionChecked] = useState(false)
  const [allRequestStatusOptionChecked, setAllRequestStatusOptionChecked] = useState(false)

  const [showRequestModal, setShowRequestModal] = useState(false)
  const [allRequestTypeOptionChecked, setAllRequestTypeOptionChecked] = useState(false)
  const [creationRequestTypeOptionChecked, setCreationRequestTypeOptionChecked] = useState(false)
  const [deactivationRequestTypeOptionChecked, setDeactivationRequestTypeOptionChecked] = useState(false)
  const [modificationRequestTypeOptionChecked, setModificationRequestTypeOptionChecked] = useState(false)
  const [reactivationRequestTypeOptionChecked, setReactivationRequestTypeOptionChecked] = useState(false)
  const [showCustomerAlertModal, setShowCustomerAlertModal] = useState(false)
  const [showActivateCustomerAlertModal, setShowActivateCustomerAlertModal] = useState(false)
  const [showDeactivateCustomerAlertModal, setShowDeactivateCustomerAlertModal] = useState(false)
  const [showActivateCustomerRequestModal, setShowActivateCustomerRequestModal] = useState(false)
  const [customerAlertModalMessage, setCustomerAlertModalMessage] = useState('')
  const [RequestModalMessage, setRequestModalMessage] = useState('')
  const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAsc, setIsAsc] = useState(false)
  const [deactivateCustomerJustification, setDeactivateCustomerJustification] = useState('')
  const [uploadKeys, setUploadKeys] = useState([])
  const userData = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes
  const deleteRequest = useSelector<ReducersType>((state: ReducersType) => state?.deleteRequest) as customersManagementResponseType
  const activateCustomer = useSelector<ReducersType>((state: ReducersType) => state?.activateCustomer) as customersManagementResponseType
  const deactivateCustomer = useSelector<ReducersType>((state: ReducersType) => state?.deactivateCustomer) as customersManagementResponseType
  const allCustomersByDate = useSelector<ReducersType>((state: ReducersType) => state?.allCustomersByDate) as customersManagementResponseType
  const allRequestsForChecker = useSelector<ReducersType>((state: ReducersType) => state?.allRequestsForChecker) as customersManagementResponseType
  const customers = AllCustomers?.serverResponse?.data?.customer
  const customersByDate = allCustomersByDate?.serverResponse?.data
  const requests = allRequests?.serverResponse?.data?.res
  const requestsForChecker = allRequestsForChecker?.serverResponse?.data?.requests
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setDate = (value) => {
    setCurrentDate(value)
  }

  const showCustomersFunctionHandler = (id) => {
    setCustomerId(id)
    setShowCustomerFunctionOptions(!showCustomerFunctionOptions)
  }

  const showRequestFunctionHandler = (id) => {
    setRequestId(id)
    setShowRequestFunctionOptions(!showRequestFunctionOptions)
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

  const ShowCalenderHandler = () => {
    setShowCalender(true)
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

  const checkIfRequestTypeOptionChecked = (option: filterRequestType) => {
    if (option === 'Select all') {
      if (allRequestTypeOptionChecked) {
        return
      }
      setCreationRequestTypeOptionChecked(false)
      setDeactivationRequestTypeOptionChecked(false)
      setModificationRequestTypeOptionChecked(false)
      setReactivationRequestTypeOptionChecked(false)
      requestStatusHandler(requestStatus)
    }
    if (option === 'Creation') {
      if (creationRequestTypeOptionChecked) {
        return
      }
      setAllRequestTypeOptionChecked(false)
      setDeactivationRequestTypeOptionChecked(false)
      setModificationRequestTypeOptionChecked(false)
      setReactivationRequestTypeOptionChecked(false)
      requestStatusHandler(requestStatus, 'Creation')
    }
    if (option === 'Deactivation') {
      if (deactivationRequestTypeOptionChecked) {
        return
      }
      setAllRequestTypeOptionChecked(false)
      setCreationRequestTypeOptionChecked(false)
      setModificationRequestTypeOptionChecked(false)
      setReactivationRequestTypeOptionChecked(false)
      requestStatusHandler(requestStatus, 'Deactivation')
    }
    if (option === 'Modification') {
      if (modificationRequestTypeOptionChecked) {
        return
      }
      setAllRequestTypeOptionChecked(false)
      setCreationRequestTypeOptionChecked(false)
      setDeactivationRequestTypeOptionChecked(false)
      setReactivationRequestTypeOptionChecked(false)
      requestStatusHandler(requestStatus, 'Modification')
    }
    if (option === 'Reactivation') {
      if (reactivationRequestTypeOptionChecked) {
        return
      }
      setAllRequestTypeOptionChecked(false)
      setCreationRequestTypeOptionChecked(false)
      setDeactivationRequestTypeOptionChecked(false)
      setModificationRequestTypeOptionChecked(false)
      requestStatusHandler(requestStatus, 'Reactivation')
    }
  }
  const sortCustomersAlphabetically = () => {
    if (isAsc) {
      dispatch(getCustomersAction(customerType, customerStatus === 'All' ? '' : customerStatus, 'desc') as any)
      setIsAsc(false)
    } else {
      dispatch(getCustomersAction(customerType, customerStatus === 'All' ? '' : customerStatus, 'asc') as any)
      setIsAsc(true)
    }
  }

  const customerFunctionHandler = ({ option, customer }) => {
    // console.log({ option, customer })
    if (option === 'View') {
      setShowCustomerModal(true)
      setCustomer(customer)
    } else if (option === 'Modify') {
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
    } else if (option === 'Deactivate') {
      // setShowDeactivationModal(customer)

      showDeactivationModalHandler(customer)
    } else if (option === 'Activate') {
      setCustomer(customer)
      setShowActivateCustomerRequestModal(true)
    }
  }

  const requestFunctionHandler = ({ option, requestId }) => {
    if (option === 'Delete Request') {
      setRequestIdToBeDeleted(requestId)
      setShowRequestModal(true)
      setCustomerAlertModalMessage('Request Deleted')
      setRequestModalMessage('Do you want to delete request?')
    }
    if (option === 'Withdraw & Delete Request') {
      setRequestIdToBeDeleted(requestId)
      setShowRequestModal(true)
      setCustomerAlertModalMessage('Request Withdrawn and Deleted')
      setRequestModalMessage('Do you want to withdraw and delete request?')
    }
    if (option === 'View') {
      navigate(`/customer-management/process-summary/${requestId}`)
    }
  }

  const deleteRequestHandler = () => {
    setShowCustomerAlertModal(true)
    setShowRequestModal(false)
    dispatch(deleteRequestAction(requestIdToBeDeleted) as any)
  }

  const activateCustomerHandler = () => {
    setShowActivateCustomerAlertModal(true)
    setShowActivateCustomerRequestModal(false)

    const body = {
      requestType: 'reactivation',

      firstName: getCustomerDetail(customer, 'firstName')[0],

      surname: getCustomerDetail(customer, 'surname')[0],

      customerType: customer?.customerType,

      initiator: `${userData.user?.firstname} ${userData.user?.lastname}`,

      initiatorId: `${userData.user?.id}`,

      customerId: getCustomerDetail(customer, 'customerId')[0],
    }
    dispatch(activateCustomerAction(body) as any)
  }

  type dateFilterType = 'day' | 'month'

  const dispatchDateFilterHandler = (filterBy: dateFilterType, number: number, tableType) => {
    if (tableType === 'All Customers') {
      dispatch(getCustomersByDateAction(filterBy, number) as any)
    }
    if (tableType === 'Requests') {
      dispatch(getRequestsByDateAction(filterBy, number) as any)
    }
  }

  const checkIfCustomerStatusOptionChecked = (option: customerStatusType) => {
    if (option === 'All') {
      if (allChecked) {
        return
      }
      setActiveChecked(true)
      setInactiveChecked(true)
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

  const showDeactivationModalHandler = (customer) => {
    setCustomer(customer)
    setShowDeactivationModal(true)
  }

  const deactivateCustomerHandler = () => {
    const body = {
      requestType: 'deactivation',

      firstName: getCustomerDetail(customer, 'firstName')[0],

      surname: getCustomerDetail(customer, 'surname')[0],

      customerType: customer?.customerType,
      waiverRequestId: null,

      initiator: `${userData.user?.firstname} ${userData.user?.lastname}`,

      initiatorId: `${userData.user?.id}`,

      customerId: getCustomerDetail(customer, 'customerId')[0],
      justification: `${deactivateCustomerJustification}`,
      documents: uploadKeys,
    }
    setShowDeactivationModal(false)
    setShowDeactivateCustomerAlertModal(true)
    dispatch(deactivateCustomerAction(body) as any)
  }

  useEffect(() => {
    if (tableType === 'All Customers') {
      if (customerStatus === 'All') {
        setActiveChecked(true)
        setInactiveChecked(true)
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

  // console.log(allCustomersByDate)
  // console.log(AllCustomers)
  const allRequestsByDate = useSelector<ReducersType>((state: ReducersType) => state?.allRequestsByDate) as customersManagementResponseType
  //  console.log(userData)

  return (
    <>
      {showRequestModal && (
        <RequestModal externalFunctionToDoSomething={deleteRequestHandler} message={RequestModalMessage} setShowRequestModal={setShowRequestModal} />
      )}
      {showCustomerAlertModal && (
        <CustomerAlertModal
          leftClick={() => {
            setShowCustomerAlertModal(false)
            refreshTableHandler()
          }}
          closeModal={() => {
            setShowCustomerAlertModal(false)
          }}
          message={customerAlertModalMessage}
          isOpen={showCustomerAlertModal}
          loading={deleteRequest.loading}
          status={deleteRequest.serverResponse.status === 'success' ? 'success' : 'error'}
        />
      )}

      {showActivateCustomerRequestModal && (
        <RequestModal
          externalFunctionToDoSomething={activateCustomerHandler}
          message={'Do you want to activate this customer?'}
          setShowRequestModal={setShowActivateCustomerRequestModal}
        />
      )}
      {showActivateCustomerAlertModal && (
        <CustomerAlertModal
          leftClick={() => {
            setShowActivateCustomerAlertModal(false)
            refreshTableHandler()
          }}
          closeModal={() => {
            setShowActivateCustomerAlertModal(false)
          }}
          loadingMessage={'Submitting'}
          message={'Customer Submitted for Activation'}
          isOpen={showActivateCustomerAlertModal}
          loading={activateCustomer.loading}
          status={activateCustomer.serverResponse.status === 'success' ? 'success' : 'error'}
        />
      )}

      {showDeactivateCustomerAlertModal && (
        <CustomerAlertModal
          leftClick={() => {
            setShowDeactivateCustomerAlertModal(false)
            refreshTableHandler()
          }}
          closeModal={() => {
            setShowDeactivateCustomerAlertModal(false)
          }}
          loadingMessage={'Submitting'}
          message={'Customer Submitted for Deactivation'}
          isOpen={showDeactivateCustomerAlertModal}
          loading={deactivateCustomer.loading}
          status={deactivateCustomer.serverResponse.status === 'success' ? 'success' : 'error'}
        />
      )}

      {showDeactivationModal ? (
        <DeactivationModal
          setUploadKeys={setUploadKeys}
          setDeactivateCustomerJustification={setDeactivateCustomerJustification}
          deactivateCustomerHandler={deactivateCustomerHandler}
          setShowDeactivationModal={setShowDeactivationModal}
        />
      ) : null}

      <div className=' relative mt-[3%]  mx-4 overflow-auto h-[25rem] overflow-auto '>
        <table className='w-full text-sm text-left table-auto '>
          <thead className='text-xs uppercase     '>
            <tr className='  '>
              {tableType === 'All Customers'
                ? customerTableHeads.map((tableHead) => (
                    <th key={tableHead} className={`py-3  relative   text-common-title ${tableHead === 'State' ? 'w-40' : ''}`}>
                      {tableHead === 'NAME/ID' ? (
                        <span onClick={sortCustomersAlphabetically} className='border-l  pl-6 cursor-pointer'>
                          {tableHead}
                        </span>
                      ) : (
                        <span className='border-l  px-2'>{tableHead}</span>
                      )}
                      {tableHead === 'State' ? (
                        <img src={Filter} onClick={filterStateHandler} alt='' className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                      ) : null}
                      {ShowFilterStateOptions && tableHead === 'State' && (
                        <div
                          ref={filterStateOptionsRef}
                          className=' w-40  absolute z-40 top-12 font-[Inter] py-4  drop-shadow-md    bg-background-paper  flex flex-col justify-center  border rounded-md'
                        >
                          {filterStateOptions?.map((option, index) => {
                            if (option === 'Select all') {
                              return (
                                <div
                                  key={index}
                                  className='  px-3 py-2 flex flex-col text-[#636363] '
                                  // onClick={filterStateHandler.bind(null, option)}
                                >
                                  <span className='flex w-full normal-case items-center text-sm font-normal'>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={allChecked}
                                        setChecked={setallChecked}
                                        externalFunctionToDoSomething={checkIfCustomerStatusOptionChecked.bind(null, 'All')}
                                      />
                                    </span>
                                    [Select all]
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Active') {
                              return (
                                <div
                                  key={index}
                                  className='cursor-pointer px-3 py-2 flex flex-col text-[#636363] '
                                  // onClick={filterStateHandler.bind(null, option)}
                                >
                                  <span className='flex w-full normal-case items-center text-sm font-normal'>
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
                                  className=' cursor-pointer px-3 py-2 flex flex-col text-[#636363]'
                                  // onClick={filterStateHandler.bind(null, option)}
                                >
                                  <span className='flex w-full  normal-case items-center text-sm font-normal'>
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
                      {tableHead === 'updated on' ? (
                        <img src={Filter} onClick={ShowCalenderHandler} alt='' className='absolute cursor-pointer right-14 top-[35%] mr-2' />
                      ) : null}
                      {showCalender && tableType === 'All Customers' && tableHead === 'updated on' && (
                        <Calender
                          dispatchDateFilterHandler={dispatchDateFilterHandler}
                          calenderRef={filterDateRef}
                          value={currentDate}
                          onChange={setDate}
                          tableType={tableType}
                        />
                      )}
                    </th>
                  ))
                : null}
              {tableType === 'Requests'
                ? requestTableHeads.map((tableHead) => (
                    <th key={tableHead} className='py-3 relative   text-common-title'>
                      <span className='border-l  px-2 pl-6'>{tableHead}</span>
                      {tableHead === 'TYPE' ? (
                        <img src={Filter} alt='' onClick={filterTypeHandler} className='absolute right-0 top-[35%] mr-2 cursor-pointer' />
                      ) : null}
                      {ShowFilterTypeOptions && tableHead === 'TYPE' && (
                        <div
                          ref={filterTypeOptionsRef}
                          className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'
                        >
                          {filterRequestTypeList?.map((option: filterRequestType, index) => {
                            if (option === 'Select all') {
                              return (
                                <div key={index} className='capitalize  px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={allRequestTypeOptionChecked}
                                        setChecked={setAllRequestTypeOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestTypeOptionChecked.bind(null, option)}
                                      />
                                    </span>
                                    [Select all]
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Creation') {
                              return (
                                <div key={index} className=' capitalize  cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={creationRequestTypeOptionChecked}
                                        setChecked={setCreationRequestTypeOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestTypeOptionChecked.bind(null, option)}
                                      />
                                    </span>
                                    Creation
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Modification') {
                              return (
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={modificationRequestTypeOptionChecked}
                                        setChecked={setModificationRequestTypeOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestTypeOptionChecked.bind(null, option)}
                                      />
                                    </span>
                                    Modification
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Deactivation') {
                              return (
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={deactivationRequestTypeOptionChecked}
                                        setChecked={setDeactivationRequestTypeOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestTypeOptionChecked.bind(null, option)}
                                      />
                                    </span>
                                    Deactivation
                                  </span>
                                </div>
                              )
                            }
                            if (option == 'Reactivation') {
                              return (
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                                  <span className='flex w-full  '>
                                    {' '}
                                    <span className='mr-2'>
                                      <Checkbox
                                        checked={reactivationRequestTypeOptionChecked}
                                        setChecked={setReactivationRequestTypeOptionChecked}
                                        externalFunctionToDoSomething={checkIfRequestTypeOptionChecked.bind(null, option)}
                                      />
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
                            <div className='  px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                              <span className='flex w-full  '>
                                {' '}
                                <span className='mr-2'>{/* <Checkbox disabled={true} /> */}</span>
                                {user}[ME]
                              </span>
                            </div>
                          )}

                          {selectedStatus === 'Initiated by my team' && (
                            <div className='  px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
                              <span className='flex w-full  '>
                                {' '}
                                <span className='mr-2'>{/* <Checkbox disabled={true} /> */}</span>
                                Teams
                              </span>
                            </div>
                          )}
                          {/* {requestType?.map((option, index) => {
                          if (option === 'Select all') {
                            return (
                              <div
                                key={index}
                                className='  px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'
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
                                className='cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'
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
                                className=' cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'
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
                                className=' cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'
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
                                className=' cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'
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
                                <div key={index} className='capitalize  px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                                <div key={index} className='capitalize cursor-pointer px-3 py-2 flex flex-col  w-[15.625rem] text-[#636363]'>
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
                      {tableHead === 'updated on' ? (
                        <img src={Filter} onClick={ShowCalenderHandler} alt='' className='absolute right-14 top-[35%] cursor-pointer mr-2' />
                      ) : null}
                      {showCalender && tableType === 'Requests' && tableHead === 'updated on' && (
                        <Calender
                          dispatchDateFilterHandler={dispatchDateFilterHandler}
                          calenderRef={filterDateRef}
                          value={currentDate}
                          onChange={setDate}
                          tableType={tableType}
                        />
                      )}
                    </th>
                  ))
                : null}
            </tr>
          </thead>

          {AllCustomers?.loading || allCustomersByDate?.loading ? (
            <tbody className=' '>
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[18.75rem]   flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {AllCustomers && AllCustomers?.success ? (
                <tbody className=' '>
                  {tableType === 'All Customers' &&
                    customers &&
                    customers
                      .filter((customer) => {
                        if (searchTerm === '') {
                          return customer
                        } else if (
                          getCustomerDetail(customer, 'firstName').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getCustomerDetail(customer, 'surname').toString().toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                          return customer
                        }
                      })
                      .sort((a: { updatedAt: string }, b: { updatedAt: string }) => +b.updatedAt - +a.updatedAt)
                      .map((customer) => (
                        <CustomerDetailsRow
                          userRole={userRole}
                          key={customer?.customerId}
                          customerId={customerId}
                          showCustomersFunctionHandler={showCustomersFunctionHandler}
                          customer={customer}
                          customerFunctionOptions={customerFunctionOptions}
                          showCustomerFunctionOptions={showCustomerFunctionOptions}
                          customerFunctionListRef={customerFunctionListRef}
                          customerFunctionHandler={customerFunctionHandler}
                        />
                      ))}
                </tbody>
              ) : null}
              {allCustomersByDate && allCustomersByDate?.success ? (
                <tbody className=' '>
                  {tableType === 'All Customers' &&
                    customersByDate &&
                    customersByDate
                      .filter((customer) => {
                        if (searchTerm === '') {
                          return customer
                        } else if (
                          getCustomerDetail(customer, 'firstName').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getCustomerDetail(customer, 'surname').toString().toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                          return customer
                        }
                      })
                      .sort((a: { updatedAt: string }, b: { updatedAt: string }) => +b.updatedAt - +a.updatedAt)
                      .map((customer) => (
                        <CustomerDetailsRow
                          key={customer?.customerId}
                          userRole={userRole}
                          customerId={customerId}
                          showCustomersFunctionHandler={showCustomersFunctionHandler}
                          customer={customer}
                          customerFunctionOptions={customerFunctionOptions}
                          showCustomerFunctionOptions={showCustomerFunctionOptions}
                          customerFunctionListRef={customerFunctionListRef}
                          customerFunctionHandler={customerFunctionHandler}
                        />
                      ))}
                </tbody>
              ) : null}
            </>
          )}

          {/* Requests for maker */}

          {allRequests?.loading || allRequestsByDate?.loading ? (
            <tbody className=' '>
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[18.75rem]      flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {allRequests?.success && !allRequestsByDate?.success && (
                <tbody className=' '>
                  {tableType === 'Requests' &&
                    requests &&
                    requests
                      .filter((request) => {
                        if (searchTerm === '') {
                          return request
                        } else if (getRequestDetail(request, 'firstName')?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                          return request
                        }
                      })
                      .map((request) => {
                        if (request.customerType === customerType) {
                          return (
                            <RequestDetailsRow
                              key={request?.requestId}
                              requestFunctionListRef={requestFunctionListRef}
                              showRequestFunctionOptions={showRequestFunctionOptions}
                              request={request}
                              requestId={requestId}
                              requestFunctionHandler={requestFunctionHandler}
                              requestFunctionOptions={requestFunctionOptions}
                              showRequestFunctionHandler={showRequestFunctionHandler}
                              userRole={userRole}
                            />
                          )
                        }
                      })}
                </tbody>
              )}

              {allRequestsByDate?.success && !allRequests?.success && (
                <tbody className=' '>
                  {tableType === 'Requests' &&
                    requests &&
                    requests
                      .filter((request) => {
                        if (searchTerm === '') {
                          return request
                        } else if (getRequestDetail(request, 'firstName')?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                          return request
                        }
                      })
                      .sort((a: { updatedAt: string }, b: { updatedAt: string }) => +b.updatedAt - +a.updatedAt)
                      .map((request) => {
                        if (request.customerType === customerType) {
                          return (
                            <RequestDetailsRow
                              key={request?.id}
                              requestFunctionListRef={requestFunctionListRef}
                              showRequestFunctionOptions={showRequestFunctionOptions}
                              request={request}
                              requestId={requestId}
                              requestFunctionHandler={requestFunctionHandler}
                              requestFunctionOptions={requestFunctionOptions}
                              showRequestFunctionHandler={showRequestFunctionHandler}
                              userRole={userRole}
                            />
                          )
                        }
                      })}
                </tbody>
              )}
            </>
          )}

          {/* Requests for checker */}
          {allRequestsForChecker?.loading ? (
            <tbody className=' '>
              <tr className=' '>
                <td className='  relative' colSpan={5}>
                  <div className='min-h-[18.75rem]      flex items-center justify-center'>
                    <Spinner size='large' />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {allRequestsForChecker?.success && (
                <tbody className=' '>
                  {tableType === 'Requests' &&
                    requestsForChecker &&
                    requestsForChecker
                      .filter((request) => {
                        if (searchTerm === '') {
                          return request
                        } else if (getRequestDetail(request, 'firstName')?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                          return request
                        }
                      })
                      .sort((a: { updatedAt: string }, b: { updatedAt: string }) => +b.updatedAt - +a.updatedAt)
                      .map((request) => {
                        if (request.customerType === customerType) {
                          return (
                            <RequestDetailsRow
                              key={request?.id}
                              requestFunctionListRef={requestFunctionListRef}
                              showRequestFunctionOptions={showRequestFunctionOptions}
                              request={request}
                              requestId={requestId}
                              requestFunctionHandler={requestFunctionHandler}
                              requestFunctionOptions={requestFunctionOptions}
                              showRequestFunctionHandler={showRequestFunctionHandler}
                              userRole={userRole}
                            />
                          )
                        }
                      })}
                </tbody>
              )}

              {/* {allRequestsByDate?.success && !allRequests?.success && (
                <tbody className=' '>
                  {tableType === 'Requests' &&
                    requests &&
                    requests.map((request) => {
                      if (request.customerType === customerType) {
                        return (
                          <RequestDetailsRow
                            key={request?.id}
                            requestFunctionListRef={requestFunctionListRef}
                            showRequestFunctionOptions={showRequestFunctionOptions}
                            request={request}
                            requestId={requestId}
                            requestFunctionHandler={requestFunctionHandler}
                            requestFunctionOptions={requestFunctionOptions}
                            showRequestFunctionHandler={showRequestFunctionHandler}
                            userRole={userRole}
                          />
                        )
                      }
                    })}
                </tbody>
              )} */}
            </>
          )}
        </table>
      </div>
    </>
  )
}

export default CustomerManagementTable
