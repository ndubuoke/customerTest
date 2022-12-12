import { Close } from 'Assets/svgs'

import Button from 'Components/Shareables/Button'
import React from 'react'
import { useCharacterCount } from '../../hooks/use-character-count'
import FileUploadComponent from './FileUploadComponent'
import Textarea from './Textarea'

type props = {
  setShowDeactivationModal: (e) => void
}

const DeactivationModal = ({ setShowDeactivationModal }: props) => {
  const { characterCount, characterLengthChangeHandler, character } = useCharacterCount()
  const closeModal = () => {
    setShowDeactivationModal(false)
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[300px] min-w-[500px] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full  min-h-[300px] flex flex-col  justify-between'>
          <div className='flex border-b  justify-between border-b-[#CCCCCC] pb-4'>
            <h6 className='text-text-secondary'>DEACTIVATION REQUEST</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
          <div className='mt-12'>
            <Textarea
              character={character}
              characterCount={characterCount}
              characterLengthChangeHandler={characterLengthChangeHandler}
              label={'Provide justification for deactivation'}
            />
          </div>

          <div className='mt-6'>
            <FileUploadComponent setLocalUpload={() => {}} />
          </div>

          <div className='w-full text-center mt-12'>
            <Button disabled={false} text={'Submit'} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeactivationModal
