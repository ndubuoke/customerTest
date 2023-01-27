import { Close } from 'Assets/svgs'
import Button from 'Components/Shareables/Button'
import React from 'react'
import { useCharacterCount } from '../../hooks/use-character-count'
import Textarea from './Textarea'
import { useEffect } from 'react'

type props = {
  setShowJustificationModal: (e) => void

  interimApprovalModalSubmitHandler: () => void
  setJustification: (e) => void
}

const JustificationModal = ({ setShowJustificationModal, interimApprovalModalSubmitHandler, setJustification }: props) => {
  const { characterCount, characterLengthChangeHandler, character } = useCharacterCount()
  const closeModal = () => {
    setShowJustificationModal(false)
  }
  useEffect(() => {
    setJustification(character)
  }, [character])

  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` flex flex-col h-[34.375rem] min-w-[37.5rem] bg-white  py-6 px-8 rounded-2xl `}>
        <div className=' w-full   flex flex-col  justify-between'>
          <div className='flex   justify-between  pb-4'>
            <h6 className='text-text-secondary text-[1.5rem] text-3xl'>INTERIM APPROVAL</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
        </div>
        <div className='h-full  flex flex-col justify-between'>
          <div className=''>
            <Textarea
              character={character}
              characterCount={characterCount}
              characterLengthChangeHandler={characterLengthChangeHandler}
              label={'Provide reason for rejection'}
              value={''}
              rows={10}
            />
          </div>
          <div className='w-full text-center mt-8'>
            <Button disabled={false} text={'Submit'} onClick={interimApprovalModalSubmitHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JustificationModal
