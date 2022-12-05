import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleRequestAction } from '../redux/actions/CustomerManagement.actions'
import { ReducersType } from '../redux/store'
import { customersManagementResponseType } from '../redux/reducers/CustomerManagement.reducer'
import GoBack from 'Components/MainScreenLayout/GoBack'
import getCustomerDetail from '../utilities/getCustomerDetail'
import getRequestDetail from '../utilities/getRequestDetail'
import ActivityLog from '../components/Shareables/ActivityLog'
import { ProcessPendingStateIcon } from 'Assets/images'
import { Print, Share, sterlingLogoProcess, rightArrow, leftArrow, DeleteIcon, warning, Disable, InterimApprovalButton } from 'Assets/svgs';
import { SubmitIcon } from '../assets/svgs/SubmitIcon'
import { CancelIcon } from '../assets/svgs/CancelIcon'
import { ModifyIcon } from '../assets/svgs/ModifyIcon'
import Spinner from 'Components/Shareables/Spinner'
import convertCamelCaseToTitleCaseText from '../utilities/convertCamelCaseToTitleCaseText'
import { RemoveIcon } from 'Assets/svgs/RemoveIcon'

type CustomerManagementProcessSummaryType = {}

const CustomerManagementProcessSummary = ({}: CustomerManagementProcessSummaryType) => {
  const singleRequest = useSelector<ReducersType>((state: ReducersType) => state?.singleRequest) as customersManagementResponseType
  let { requestId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleRequestAction(requestId) as any)
  }, [requestId])

  const request = singleRequest.serverResponse.data

  console.log(request)

  return (
    <>
      {singleRequest.loading ? (
        <div className='min-h-[300px] w-screen h-screen   flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      ) : (
        <div className=' h-screen bg-[#E5E5E5] '>
          <div className='h-[120px] bg-white '>
            <GoBack
              headerText={`${
                request?.status === 'Pending' && request?.requestType === 'Creation'
                  ? request?.customerType + ' CUSTOMER CREATION REVIEW'
                  : 'PROCESS SUMMARY'
              }`}
              breadCrumbsList={[
                { text: 'CUSTOMER MANAGEMENT', link: '/' },

                {
                  text: `${
                    request?.status === 'Approved'
                      ? getRequestDetail(request, 'surname')?.toString().toUpperCase() +
                        getRequestDetail(request, 'firstName')?.toString().toUpperCase()
                      : ''
                  }`,
                  link: request?.status === 'Approved' ? '' : '',
                },

                { text: `${request?.status !== 'Approved' ? request?.customerType + ' CUSTOMER CREATION REVIEW' : 'PROCESS SUMMARY'}`, link: '#' },
              ]}
            />
          </div>
          <div className=' mx-[2%] my-[2%] flex gap-8  '>
            <div className=' w-[75%] bg-white py-[2%] max-h-[650px] overflow-auto  rounded-md relative'>
              {/* Progress Bar */}
              <div
                className={`relative mt-[5%] py-[5%]   ml-20 mb-5 h-[108px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}
              >
                <div className={`w-[80%]  flex justify-center items-center`}>
                  <div className={`absolute bg-white border-none -top-4 left-7 text-[18px] text-[#636363]`}>Processing Status:</div>
                  <div className={`w-[90%] relative h-[50px]`}>
                    <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
                    <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                    {request?.status === 'Approved' && (
                      <div className={`absolute m-auto -bottom-[30px] font-bold text-[#AAAAAA] -left-[50px] h-[30px] `}>Submitted</div>
                    )}
                    {request?.status === 'Pending' && (
                      <div className={`absolute m-auto -bottom-[30px] font-bold text-[#AAAAAA] -left-[50px] h-[30px] `}>Submitted</div>
                    )}
                    {request?.status === 'Pending' && (
                      <>
                        <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={sterlingLogoProcess} alt='' />
                        <div className={`absolute m-auto text-[#636363] font-bold -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>
                          Pending Approval
                        </div>
                      </>
                    )}

                    {request?.status === 'Approved' && (
                      <>
                        <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                        <div className={`absolute m-auto text-[#AAAAAA] font-bold -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>
                          Approved
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
              {request?.status === 'Pending' && (
                <>
                  <button className={`flex flex-col justify-center items-center`}>
                    <CancelIcon />

                    <p className='text-sm'>Cancel</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={Disable} className='w-7 h-7' alt='' />

                    <p className='text-sm'>Reject</p>
                  </button>
                  <button className={`flex flex-col justify-center items-center`}>
                    <img src={InterimApprovalButton} className='w-7 h-7' alt='' />

                    <p className='text-sm'>Interim <br/> Approval</p>
                  </button>

                  <button className={`flex flex-col justify-center items-center`}>
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
            </div>

            <div className='w-[25%] bg-white h-full rounded-md'>
              <ActivityLog />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomerManagementProcessSummary
