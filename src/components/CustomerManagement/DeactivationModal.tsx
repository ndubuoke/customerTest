import { Close } from 'Assets/svgs'

import Button from 'Components/Shareables/Button'
import React, { useEffect, useState } from 'react'
import { useCharacterCount } from '../../hooks/use-character-count'
import FileUploadComponent from './FileUploadComponent'
import Textarea from './Textarea'

type props = {
  setShowDeactivationModal: (e) => void
  deactivateCustomerHandler: () => void
  setUploadKeys: (e) => void
  setDeactivateCustomerJustification: (e) => void
}

const DeactivationModal = ({ setShowDeactivationModal, deactivateCustomerHandler, setUploadKeys, setDeactivateCustomerJustification }: props) => {
  const [localUpload, setLocalUpload] = useState<Array<any>>([])
  const [buttonDisabledStatus, setButtonDisabledStatus] = useState(true)
  const [uploadKey, setUploadKey] = useState<Array<string>>([])
  const { characterCount, characterLengthChangeHandler, character } = useCharacterCount()
  const closeModal = () => {
    setShowDeactivationModal(false)
  }
  // console.log(uploadKey)
  //  console.log(localUpload)
  useEffect(() => {
    if (uploadKey.length > 0) {
      setButtonDisabledStatus(false)
      setUploadKeys(uploadKey)
    }
    if (localUpload.length < 1) {
      setButtonDisabledStatus(true)
    }
    if (character !== '') {
      setDeactivateCustomerJustification(character)
    }
  }, [uploadKey, localUpload, buttonDisabledStatus, character])
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` w-[50%] h-[70%] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full h-full flex flex-col  justify-between'>
          <div className='flex border-b  justify-between border-b-[#CCCCCC] pb-4'>
            <h6 className='text-text-secondary'>DEACTIVATION REQUEST</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
          <div className='mt-4 h-fit '>
            <Textarea
              character={character}
              characterCount={characterCount}
              characterLengthChangeHandler={characterLengthChangeHandler}
              label={'Provide justification for deactivation'}
            />
          </div>

          <div className='mt-4 h-[30%] '>
            <FileUploadComponent setLocalUpload={setLocalUpload} setUploadKey={setUploadKey} />
          </div>

          <div className='w-full mt-12 h-[10%] text-center '>
            <Button disabled={buttonDisabledStatus} text={'Submit'} onClick={deactivateCustomerHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeactivationModal
