import { Close } from 'Assets/svgs'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'

import Button from 'Components/Shareables/Button'
import React from 'react'

type props = {
  setShowWaiverRequestModal: (e) => void
}

const WaiverModal = ({ setShowWaiverRequestModal }: props) => {
  const closeModal = () => {
    setShowWaiverRequestModal(false)
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[18.75rem] min-w-[31.25rem] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full  min-h-[18.75rem] flex flex-col  justify-between'>
          <div className='flex border-b  justify-between border-b-[#CCCCCC] pb-4'>
            <h6 className='text-text-secondary'>WAIVER REQUEST</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
          <div className='mt-12'>
            <div className='  w-full relative '>
              <div>
                <label className='capitalize text-[#333333] text-sm'>Provide justification for waiver request</label>
              </div>
              <textarea
                rows={4}
                maxLength={150}
                className=' bg-transparent   text-text-secondary p-2 rounded  resize-none text-sm   w-full  border-common-title border outline-none '
                placeholder='Enter text'
              ></textarea>
            </div>
          </div>

          <div className='mt-6'>
            <FileUploadComponent setLocalUpload={() => { }} />
          </div>

          <div className='w-full text-center mt-12'>
            <Button disabled={false} text={'Submit'} onClick={() => { }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaiverModal
