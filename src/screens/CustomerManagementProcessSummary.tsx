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
import { Print, Share, sterlingLogoProcess, rightArrow, leftArrow } from 'Assets/svgs'
import { SubmitIcon } from '../assets/svgs/SubmitIcon'
import { CancelIcon } from '../assets/svgs/CancelIcon'
import { ModifyIcon } from '../assets/svgs/ModifyIcon'
import Spinner from 'Components/Shareables/Spinner'

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
              headerText='PROCESS SUMMARY'
              breadCrumbsList={[
                { text: 'CUSTOMER MANAGEMENT', link: '/' },
                { text: `${getRequestDetail(request, 'surname')?.toString()} ${getRequestDetail(request, 'firstName')?.toString()}`, link: '' },
                { text: 'PROCESS SUMMARY', link: '#' },
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
                    <div className={`absolute m-auto -bottom-[30px] -left-[50px] h-[30px] `}>Pending Submission</div>
                    <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                    <div className={`absolute m-auto -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>Approval</div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className='ml-20 mt-[5%]'>
                <h1 className='text-[#636363] text-[24px]'>Individual Customer Details</h1>
                <div className='mt-4'>
                  <h4 className='text-[#636363] text-[18px]'>Bio-data</h4>
                  <div className='flex gap-24 mt-4  w-[50%]  text-[#636363]  '>
                    <div className=' font-bold   w-full items-end flex  flex-col '>
                      <p className='mb-2'>Surname</p>
                      <p className='mb-2'>First Name</p>
                      <p className='mb-2'>Other Names</p>
                      <p className='mb-2'>Customer ID</p>
                      <p className='mb-2'>Customer BVN</p>
                      <p className='mb-2'>Risk Status</p>
                      <p className='mb-2'>Customer Groups</p>
                      <p className='mb-2'>First Name</p>
                      <p className='mb-2'>Other Names</p>
                      <p className='mb-2'>Customer ID</p>
                      <p className='mb-2'>Customer BVN</p>
                      <p className='mb-2'>Risk Status</p>
                      <p className='mb-2'>Customer Groups</p>
                      <p className='mb-2'>First Name</p>
                      <p className='mb-2'>Other Names</p>
                      <p className='mb-2'>Customer ID</p>
                      <p className='mb-2'>Customer BVN</p>
                      <p className='mb-2'>Risk Status</p>
                      <p className='mb-2'>Customer Groups</p>
                    </div>
                    <div className=' font-[400] w-full flex flex-col items-start '>
                      <p className='mb-2'>
                        p
                        {/* {getCustomerDetail(customer, 'surname') !== '' || null ? getCustomerDetail(customer, 'surname') : 'Not Available'}{' '} */}
                      </p>
                      <p className='mb-2'>
                        {/* {getCustomerDetail(customer, 'firstName') != '' || null ? getCustomerDetail(customer, 'firstName') : 'Not Available'}{' '} */}
                      </p>
                      <p className='mb-2'>
                        {/* {getCustomerDetail(customer, 'otherNames') != '' || null ? getCustomerDetail(customer, 'otherNames') : 'Not Available'} */}
                      </p>
                      <p className='mb-2'>
                        {/* {getCustomerDetail(customer, 'customerId') != '' || null ? getCustomerDetail(customer, 'customerId') : 'Not Available'}{' '} */}
                      </p>
                      <p className='mb-2'>
                        {/* {getCustomerDetail(customer, 'bvn') != '' || null ? getCustomerDetail(customer, 'bvn') : 'Not Available'} */}
                      </p>
                      <p className='mb-2'>
                        {' '}
                        {/* {getCustomerDetail(customer, 'riskStatus') != '' || null ? getCustomerDetail(customer, 'riskStatus') : 'Not Available'}{' '} */}
                      </p>
                      <p className='mb-2'>
                        {/* {' '}
                    {getCustomerDetail(customer, 'customerGroups') != '' || null
                      ? getCustomerDetail(customer, 'customerGroups')
                      : 'Not Available'}{' '} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-white absolute m-auto bottom-8 right-[30%] min-w-[300px] min-h-[64px] flex justify-evenly py-2 items-center rounded-lg shadow-md border`}
            >
              <button className={`flex flex-col justify-center items-center`}>
                <img src={Print} />
                <p className='text-sm'>Print</p>
              </button>
              <button className={`flex flex-col justify-center items-center`}>
                <img src={Share} />
                <p className='text-sm'>Share</p>
              </button>
              {request?.status === 'In Issue' && (

              <button className={`flex flex-col justify-center items-center`}>
                <ModifyIcon />
                <p className='text-sm'>Modify</p>
              </button>
              )}
              <button className={`flex flex-col justify-center items-center`}>
                <img src={leftArrow} />
                <p className='text-sm'>
                  Return to <br /> Dashboard
                </p>
              </button>
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