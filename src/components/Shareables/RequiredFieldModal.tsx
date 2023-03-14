import { add, Avatar, Close, customer360, Disable, Edit, GreenCheck } from 'Assets/svgs'
import { GreenCheckBig } from 'Assets/svgs/GreenCheckBig'
import { Dispatch, SetStateAction } from 'react'

type props = {
  setShowMatchModal: (isVisible: boolean) => void
}
const RequiredFieldModal = ({ setShowMatchModal }: props) => {
  const closeModal = () => {
    setShowMatchModal(false)
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[21.875rem] min-w-[31.25rem] bg-white  rounded-xl `}>
        <div className=' w-full  min-h-[18.75rem] flex flex-col  '>
          <div className='flex justify-between px-8 py-4 border-b'>
            <button className='ml-auto' onClick={closeModal}>
              {' '}
              <img src={Close} />
            </button>
          </div>
          <div className='flex flex-col items-center mt-4 text-center'>
            <GreenCheckBig />
            <p className='text-[#2FB755] text-xl mt-2'>please go fill in required fields</p>

            <button className='border border-[#E5E9EB] mt-5 py-1 px-6 rounded-md text-[#667085]' onClick={closeModal}>
              Rescan and upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequiredFieldModal
