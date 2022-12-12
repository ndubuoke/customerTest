import { ProcessStep } from 'Assets/svgs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityLogAction } from '../../redux/actions/CustomerManagement.actions'
import { ReducersType } from '../../redux/store'
import { customersManagementResponseType } from '../../redux/reducers/CustomerManagement.reducer'
import Spinner from 'Components/Shareables/Spinner'

type Props = {
  customerId?: string
  mode: 'creation' | 'modification'
}

const ActivityLog = ({ customerId, mode }: Props) => {
  const activityLog = useSelector<ReducersType>((state: ReducersType) => state?.customerActivityLog) as customersManagementResponseType
  const logs = activityLog.serverResponse.data
  const dispatch = useDispatch()
  useEffect(() => {
    if (customerId === undefined) {
      return
    }
    dispatch(getActivityLogAction(customerId) as any)
  }, [customerId])
  // console.log(activityLog)
  return (
    <>
      {activityLog.loading ? (
        <div className='min-h-[300px] w-screen h-screen   flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      ) : (
        <div className=' h-[650px] overflow-auto'>
          <p className='ml-4 text-[#636363] text-[24px]'>Activity Log</p>
          <hr className={`w-full mt-4 border border-[#CCCCCC]`} />
          <ol className='relative border-l border-gray-200 dark:border-gray-700 mt-8 ml-6'>
            {logs &&
              logs.map((log, index) => (
                <li key={index} className='mb-10 ml-6'>
                  <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-[#636363] rounded-full ring-8 ring-white'>
                    {/* <ProcessStep /> */}
                  </span>
                  <p className='mb-4 font-normal text-gray-500 dark:text-gray-400 text-xs'>
                    {log.description} <br />
                    <span className=' text-xs text-[#636363]'>{log.createdAt}</span>
                  </p>
                </li>
              ))}
          </ol>
        </div>
      )}
    </>
  )
}
export default ActivityLog
