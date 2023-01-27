import React from 'react'
import { Close, Substract2 } from 'Assets/svgs'
import SearchAndSelect from './SearchAndSelect'
import Textarea from './Textarea'
import Button from 'Components/Shareables/Button'
import { useSelector } from 'react-redux'
import { ReducersType } from '../../redux/store'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'
import { useCharacterCount } from '../../hooks/use-character-count'
import {useEffect} from 'react';
type props = {
  setShowRejectionModal: (e) => void
  rejectionModalSubmitHandler: (e) => void
  justification: string
  setJustification: (e) => void
}

const RejectionModal = ({ setShowRejectionModal, rejectionModalSubmitHandler, justification, setJustification }: props) => {
  const data = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes
  const { characterCount, characterLengthChangeHandler, character } = useCharacterCount()
  const closeModal = () => {
    setShowRejectionModal(false)
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
      <div className={` flex flex-col h-[34.375rem] min-w-[37.5rem] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full   flex flex-col  justify-between'>
          <div className='flex   justify-between  pb-4'>
            <h6 className='text-text-secondary text-[1.5rem] text-3xl'>REJECTION</h6>
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex w-full'>
            <div className='w-[50%]'>
              <SearchAndSelect fieldlabel='Route Request To' />
            </div>
            {/* {data && !data.user.is_active && (
              <div className='flex w-[50%] ml-4 items-center '>
                <img className=' w-6 h-6 mr-2' src={Substract2} />
                <p className='text-[#636363]'>User is currently unavailable, please re-route</p>
              </div>
            )} */}
          </div>
          <div className='mt-6'>
            <Textarea
              character={character}
              characterCount={characterCount}
              characterLengthChangeHandler={characterLengthChangeHandler}
              label={'Provide reason for rejection'}
              value={justification === null ? '' : justification}
              rows={10}
            />
          </div>
          <div className='w-full text-center mt-8'>
            <Button disabled={false} text={'Submit'} onClick={rejectionModalSubmitHandler.bind(null, 'Reject')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RejectionModal
