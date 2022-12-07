import { Close, Substract2 } from 'Assets/svgs'
import Button from 'Components/Shareables/Button'
import React from 'react'

type requestModalType = {
  setShowRequestModal: (e) => void
  message: string
  externalFunctionToDoSomething:()=> void
}

const RequestModal = ({ setShowRequestModal, message, externalFunctionToDoSomething }: requestModalType) => {
  const closeModal = () => {
    setShowRequestModal(false)
  }
  const RequestHandler = () => {
    externalFunctionToDoSomething()
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` h-[200px] w-[400px] bg-white py-6 px-6 rounded-2xl `}>
        <div className=' w-full  flex flex-col  justify-between'>
          <div className='flex justify-between  pb-4'>
            <img className=' h-fit' src={Substract2} />
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
          <div className='flex mt-2'>
            <p>{message}</p>
          </div>
          <div className='flex mt-6 w-full justify-between'>
            <button onClick={closeModal} className={` rounded text-[#667085] border border-[#D8DAE5] cursor-pointer h-full w-fit px-10 py-3  `}>
              Cancel
            </button>
            <button onClick={RequestHandler} className={`rounded text-white bg-button-hover-background  cursor-pointer h-full w-fit px-10 py-3 `}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestModal
