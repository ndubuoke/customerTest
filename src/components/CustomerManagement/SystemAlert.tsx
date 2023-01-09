import { Close, Substract, Substract2, warning } from 'Assets/svgs'
import React from 'react'

type systemAlertType = {
  setShowSystemAlert: (e) => void
  message: string
}

const SystemAlert = ({ setShowSystemAlert, message }: systemAlertType) => {
  const closeModal = () => {
    setShowSystemAlert(false)
  }
  return (
    <div
      className={`fixed   z-50 w-screen h-screen grid content-end     `}
    
    >
      <div className={` h-[150px] w-[400px]  bg-white relative  bottom-14 rounded    `}>
        <div className='flex  my-6 mx-8 '>
          <img className=' h-fit' src={Substract2} />

          <div className=' w-full ml-8  min-h-[300px] flex flex-col  justify-between'>
            <div className='flex   justify-between  pb-4'>
              <h6 className='text-text-secondary text-md text-[#333333] font-bold'>System Alert!</h6>
              <button onClick={closeModal}>
                <img src={Close} className={"w-4"} />
              </button>
            </div>
            <div className='absolute bottom-8 color-[#666666]  '>
              <p>{message}</p>
            </div>
          </div>
        </div>
        <div className='border-b-4 absolute bottom-0  w-[50%] border-b-primay-main w-full'></div>
      </div>
    </div>
  )
}

export default SystemAlert
