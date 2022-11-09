import { Close } from 'Assets/svgs'
import { FileUploader } from 'Components/Shareables'
import Button from 'Components/Shareables/Button'
import React from 'react'


const DeactivationModal = () => {
  const closeModal = () => {}
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` 'min-h-[300px] min-w-[500px]' bg-white p-6 rounded-2xl `}>
        <div className=' w-full  min-h-[300px] flex flex-col justify-between'>
          <div className='flex  justify-between'>
            <h6 className=''>DEACTIVATION REQUEST</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>

          <div className=''>
            <FileUploader height ={"100px"}/>
          </div>

          <div>
            <Button disabled={false} text={'Submit'} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeactivationModal
