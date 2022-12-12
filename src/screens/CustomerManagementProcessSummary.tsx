import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleRequestAction, updateRequestAction } from '../redux/actions/CustomerManagement.actions'
import { ReducersType } from '../redux/store'
import { customersManagementResponseType } from '../redux/reducers/CustomerManagement.reducer'
import GoBack from 'Components/MainScreenLayout/GoBack'
import getCustomerDetail from '../utilities/getCustomerDetail'
import getRequestDetail from '../utilities/getRequestDetail'
import ActivityLog from '../components/Shareables/ActivityLog'
import { ProcessPendingStateIcon } from 'Assets/images'
import { Print, Share, sterlingLogoProcess, rightArrow, leftArrow, DeleteIcon, warning, Disable, InterimApprovalButton } from 'Assets/svgs'
import { SubmitIcon } from '../assets/svgs/SubmitIcon'
import { CancelIcon } from '../assets/svgs/CancelIcon'
import { ModifyIcon } from '../assets/svgs/ModifyIcon'
import Spinner from 'Components/Shareables/Spinner'
import convertCamelCaseToTitleCaseText from '../utilities/convertCamelCaseToTitleCaseText'
import convertToUppercase from 'Utilities/convertToUppercase'
import { useState } from 'react'
import RejectionModal from 'Components/CustomerManagement/RejectionModal'
import RequestModal from 'Components/CustomerManagement/RequestModal'
import { UserProfileTypes } from '../redux/reducers/UserPersmissions/UserPersmissions'
import CustomerAlertModal from '../components/CustomerManagement/customerAlertModal'
import JustificationModal from '../components/CustomerManagement/justificationModal'

type CustomerManagementProcessSummaryType = {}

const CustomerManagementProcessSummary = ({}: CustomerManagementProcessSummaryType) => {
  const singleRequest = useSelector<ReducersType>((state: ReducersType) => state?.singleRequest) as customersManagementResponseType
  const data = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes
  const updatedRequest = useSelector<ReducersType>((state: ReducersType) => state?.updatedRequest) as customersManagementResponseType
  const [ShowRejectionModal, setShowRejectionModal] = useState(false)
  const [ShowRequestModal, setShowRequestModal] = useState(false)
  const [ShowJustificationModal, setShowJustificationModal] = useState(false)
  const [requestModalMessage, setRequestModalMessage] = useState('')
  const [justification, setJustification] = useState('')
  const [customerAlertModalMessage, setCustomerAlertModalMessage] = useState('')
  const [showCustomerAlertModal, setShowCustomerAlertModal] = useState(false)
  const [action, setAction] = useState('')
  let { requestId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getSingleRequestAction(requestId) as any)
  }, [requestId])

  const request = singleRequest.serverResponse.data

  function actionButtonsHandler(action: string) {
    if (action === 'Reject') {
      setAction('Reject')
      setShowRejectionModal(!ShowRejectionModal)
    }
    if (action === 'Approve') {
      setAction('Approve')

      setRequestModalMessage(`Do you want to approve customer ${request?.requestType?.toLowerCase()}?`)
      setShowRequestModal(!ShowRequestModal)
    }

    if (action === 'Cancel') {
      setAction('Cancel')

      setRequestModalMessage(`Do you want to cancel review?`)
      setShowRequestModal(!ShowRequestModal)
    }
    if (action === 'Interim Approval') {
      setAction('Interim Approval')
      if (request?.creationMode === 'Legacy') {
        setShowJustificationModal(true)
      }
      if (request?.creationMode === 'Accelerated') {
        setRequestModalMessage(`Do you want to grant interim approval to customer?`)
        setShowRequestModal(!ShowRequestModal)
      }
    }
  }

  const doSomething = (action) => {
    if (action === 'Cancel') {
      navigate('/customer-management')
    }
    if (action === 'Approve') {
      setShowCustomerAlertModal(true)
      setCustomerAlertModalMessage(`Customer ${convertToUppercase(request?.requestType)} Approved`)
      const body = {
        approver: `${data?.user?.firstname} ${data?.user?.lastname}`,
        approverId: data?.user?.id,
        justification: '',
        status: 'Approved',
      }
      dispatch(updateRequestAction(body, request?.requestId) as any)
      setShowRequestModal(false)
    }
    if (action === 'Reject') {
      setShowRejectionModal(false)
      setShowCustomerAlertModal(true)
      setCustomerAlertModalMessage(`Customer ${convertToUppercase(request?.requestType)} Request Rejected`)
      const body = {
        approver: `${data?.user?.firstname} ${data?.user?.lastname}`,
        approverId: data?.user?.id,
        justification: justification,
        status: 'Rejected',
      }
      dispatch(updateRequestAction(body, request?.requestId) as any)
    }
    if (action === 'Interim Approval') {
      setShowJustificationModal(false)
      setShowCustomerAlertModal(true)
      setCustomerAlertModalMessage(`Interim Approval Granted`)
      const body = {
        approver: `${data?.user?.firstname} ${data?.user?.lastname}`,
        approverId: data?.user?.id,
        justification: justification,
        status: 'Interim Approval',
      }
      dispatch(updateRequestAction(body, request?.requestId) as any)
      setShowRequestModal(false)
    }
  }

  // console.log(request)

  return (
    <>
      {ShowJustificationModal && (
        <JustificationModal
          interimApprovalModalSubmitHandler={doSomething.bind(null, 'Interim Approval')}
          setShowJustificationModal={setShowJustificationModal}
          setJustification={setJustification}
        />
      )}
      {ShowRequestModal && (
        <RequestModal
          externalFunctionToDoSomething={() => {
            doSomething(action)
          }}
          message={requestModalMessage}
          setShowRequestModal={setShowRequestModal}
        />
      )}
      {showCustomerAlertModal && (
        <CustomerAlertModal
          leftClick={() => {
            setShowCustomerAlertModal(false)
            navigate('/customer-management')
          }}
          closeModal={() => {
            setShowCustomerAlertModal(false)
            navigate('/customer-management')
          }}
          loadingMessage={'Processing....'}
          message={customerAlertModalMessage}
          isOpen={showCustomerAlertModal}
          loading={updatedRequest.loading}
          status={updatedRequest.serverResponse.status === 'success' ? 'success' : 'error'}
        />
      )}
      {ShowRejectionModal && (
        <RejectionModal
          setJustification={setJustification}
          justification={request?.justification}
          rejectionModalSubmitHandler={doSomething.bind(null, 'Reject')}
          setShowRejectionModal={setShowRejectionModal}
        />
      )}
      {singleRequest.loading && (
        <div className='min-h-[300px] w-screen h-screen   flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      )}

      {!singleRequest.loading && (
        <div className=' h-screen bg-[#E5E5E5] '>
          <div className='h-[120px] bg-white '>
            {request?.status === 'Pending' && (
              <GoBack
                headerText={`${request?.customerType + ` CUSTOMER ${request?.requestType} REVIEW`}`}
                breadCrumbsList={[
                  { text: 'CUSTOMER MANAGEMENT', link: '/' },
                  { text: `${convertToUppercase(request?.customerType) + ` CUSTOMER ${convertToUppercase(request?.requestType)} REVIEW`}`, link: '' },
                ]}
              />
            )}
            {request?.status === 'Rejected' && (
              <GoBack
                headerText={`PROCESS SUMMARY`}
                breadCrumbsList={[
                  { text: 'CUSTOMER MANAGEMENT', link: '' },
                  {
                    text: `${
                      getRequestDetail(request, 'surname')?.toString().toUpperCase() +
                      getRequestDetail(request, 'firstName')?.toString().toUpperCase()
                    }`,
                    link: '/',
                  },
                  { text: `PROCESS SUMMARY`, link: '#' },
                ]}
              />
            )}

            {request?.status === 'Approved' && (
              <GoBack
                headerText={`PROCESS SUMMARY`}
                breadCrumbsList={[
                  { text: 'CUSTOMER MANAGEMENT', link: '' },
                  {
                    text: `${
                      getRequestDetail(request, 'surname')?.toString().toUpperCase() +
                      getRequestDetail(request, 'firstName')?.toString().toUpperCase()
                    }`,
                    link: '/',
                  },
                  { text: `PROCESS SUMMARY`, link: '#' },
                ]}
              />
            )}
          </div>
          <div className=' mx-[2%] my-[2%] flex gap-8  '>
            <div className=' w-[75%] bg-white py-[2%] h-[650px] overflow-auto  rounded-md relative'>
              {/* Progress Bar */}
              <div
                className={`relative mt-[5%] py-[5%]   ml-20 mb-5 h-[150px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}
              >
                <div className={`w-[80%]  flex justify-center items-center`}>
                  <div className={`absolute bg-white border-none -top-4 left-7 text-[18px] text-[#636363]`}>Processing Status:</div>
                  <div className={`w-[90%] relative h-[50px]`}>
                    <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
                    {request?.status === 'Approved' && (
                      <>
                        <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                        <div className={`absolute m-auto -bottom-[30px] font-bold text-[#AAAAAA] -left-[50px] h-[30px] `}>Submitted</div>
                        <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                        <div className={`absolute m-auto text-[#AAAAAA] font-bold -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>
                          Approved
                        </div>
                      </>
                    )}

                    {request?.status === 'Pending' && (
                      <>
                        <div className={`absolute m-auto -bottom-[30px] font-bold text-[#AAAAAA] -left-[50px] h-[30px] `}>Submitted</div>
                        <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />

                        <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={sterlingLogoProcess} alt='' />
                        <div className={`absolute m-auto text-[#636363] font-bold -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>
                          Pending Approval
                        </div>
                      </>
                    )}

                    {request?.status === 'Rejected' && (
                      <>
                        <div className={`absolute m-auto -bottom-[30px] font-bold text-[#636363] text-center -left-[50px] h-[30px] `}>
                          Pending Initiators <br /> Action
                        </div>
                        <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={sterlingLogoProcess} alt='' />
                        <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                        <div className={`absolute m-auto text-[#AAAAAA] font-bold -bottom-[30px] text-center -right-[50px]  h-[30px]`}>
                          Customer {request?.requestType} <br /> Rejected
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className='ml-20 mt-[5%]'>
                <h1 className='text-[#636363] text-[24px]'>{request?.customerType} Customer Details</h1>
                {request?.data?.customerData.map((detail, index) => (
                  <div key={index} className=''>
                    <h4 className='text-[#636363] text-[20px] mt-8'> {detail?.sectionName}</h4>
                    <div className='flex gap-20 mt-4  w-[70%]  text-[#636363]  '>
                      <div className=' font-bold   w-full items-end flex  flex-col '>
                        {Object.keys(detail?.data).map((data, index) => (
                          <p key={index} className='mb-2 text-[16px] font-normal'>
                            {convertCamelCaseToTitleCaseText(data)}
                          </p>
                        ))}
                      </div>
                      <div className=' font-[400] w-full flex flex-col items-start '>
                        {Object.values(detail?.data).map((data, index) => (
                          <p key={index} className='mb-2 text-[16px] font-normal'>
                            {data ? data : 'Not Available'}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-white absolute m-auto bottom-8 right-[30%] min-w-[300px] min-h-[64px] flex justify-evenly py-2 items-center rounded-lg shadow-md border`}
            >
              {request?.status === 'In Issue' && (
                <button className={`flex flex-col justify-center items-center`}>
                  <ModifyIcon />
                  <p className='text-sm'>Modify</p>
                </button>
              )}
              {request?.status === 'Pending' && request?.requestType === 'Creation' && (
                <>
                  <button onClick={actionButtonsHandler.bind(null, 'Cancel')} className={`flex flex-col justify-center items-center`}>
                    <CancelIcon />

                    <p className='text-sm'>Cancel</p>
                  </button>
                  <button onClick={actionButtonsHandler.bind(null, 'Reject')} className={`flex flex-col justify-center items-center`}>
                    <img src={Disable} className='w-7 h-7' alt='' />

                    <p className='text-sm'>Reject</p>
                  </button>

                  <button onClick={actionButtonsHandler.bind(null, 'Interim Approval')} className={`flex flex-col justify-center items-center`}>
                    <img src={InterimApprovalButton} className='w-7 h-7' alt='' />

                    <p className='text-sm'>
                      Interim <br /> Approval
                    </p>
                  </button>

                  {request?.creationMode !== 'Accelerated' && (
                    <button onClick={actionButtonsHandler.bind(null, 'Approve')} className={`flex flex-col justify-center items-center`}>
                      <SubmitIcon />
                      <p className='text-sm'>Approve</p>
                    </button>
                  )}
                </>
              )}

              {request?.status === 'Pending' && request?.requestType !== 'Creation' && (
                <>
                  <button onClick={actionButtonsHandler.bind(null, 'Cancel')} className={`flex flex-col justify-center items-center`}>
                    <CancelIcon />

                    <p className='text-sm'>Cancel</p>
                  </button>
                  <button onClick={actionButtonsHandler.bind(null, 'Reject')} className={`flex flex-col justify-center items-center`}>
                    <img src={Disable} className='w-7 h-7' alt='' />

                    <p className='text-sm'>Reject</p>
                  </button>

                  <button onClick={actionButtonsHandler.bind(null, 'Approve')} className={`flex flex-col justify-center items-center`}>
                    <SubmitIcon />
                    <p className='text-sm'>Approve</p>
                  </button>
                </>
              )}

              {request?.status === 'Approved' && (
                <>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={Print} />
                    <p className='text-sm'>Print</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={Share} />
                    <p className='text-sm'>Share</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={leftArrow} />
                    <p className='text-sm'>
                      Return to <br /> Dashboard
                    </p>
                  </button>
                </>
              )}
              {request?.status === 'Rejected' && (
                <>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={Print} />
                    <p className='text-sm'>Print</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={Share} />
                    <p className='text-sm'>Share</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <ModifyIcon />
                    <p className='text-sm'>Modify</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={leftArrow} />
                    <p className='text-sm'>
                      Return to <br /> Dashboard
                    </p>
                  </button>
                </>
              )}
            </div>

            <div className='w-[25%] bg-white h-full rounded-md'>
              <ActivityLog customerId={request?.customerId} mode={'modification'} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomerManagementProcessSummary
