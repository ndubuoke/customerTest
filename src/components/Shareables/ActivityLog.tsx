import { ProcessStep } from 'Assets/svgs'

type Props = {}

const ActivityLog = (props: Props) => {
  return (
    <div className=''>
      <p className='ml-4'>Activity Log</p>
      <hr className={`w-full mt-4 border border-[#CCCCCC]`} />
      <ol className='relative border-l border-gray-200 dark:border-gray-700 mt-8 ml-6'>
        <li className='mb-10 ml-6'>
          <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-[#636363] rounded-full ring-8 ring-white'>
            {/* <ProcessStep /> */}
          </span>
          <p className='mb-4 font-normal text-gray-500 dark:text-gray-400 text-xs'>
            Bulk Customer Creation submitted by John Smith <br />
            <span className=' text-xs text-[#636363]'>12 Mar 2021 [12:03 PM]</span>
          </p>
        </li>
        <li className='mb-10 ml-6'>
          <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-[#636363] rounded-full ring-8 ring-white'></span>
          <p className='text-xs font-normal text-gray-500 dark:text-gray-400'>
            Pending Activity
            <br />
            <span className=' text-xs text-[#636363]'>12 Mar 2021 [12:03 PM]</span>
          </p>
        </li>
      </ol>
    </div>
  )
}
export default ActivityLog
