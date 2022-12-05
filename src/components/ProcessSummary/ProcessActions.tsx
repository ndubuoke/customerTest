import React, { useState } from 'react'
import { goBackToForm, cancelForm, submitForm, ModifyIcon } from 'Assets/svgs'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import { isForm } from 'Screens/CustomerCreation'
import { Modal } from 'Components/Modal'
import CancelFormModal from './CancelFormModal'
import { STORAGE_NAMES } from 'Utilities/browserStorages'

type Props = {
  waiver: boolean
  mode: 'creation' | 'modification'
  customerType: 'individual' | 'sme'
}

const ProcessActions = ({ waiver, mode, customerType }: Props) => {
  const navigate = useNavigate()

  const [openCancelFormModal, setOpenCancelFormModal] = useState<boolean>(false)

  const handleBackToForm = () => {
    if (customerType === 'individual') {
      navigate(AppRoutes.individualCustomerCreationScreen + isForm)
      return
    }

    if (customerType === 'sme') {
      navigate(AppRoutes.SMECustomerCreationScreen + isForm)
    }
  }

  const handleOpenCancelFormModal = () => {
    setOpenCancelFormModal((prev) => !prev)
  }

  const handleCancelFormCreation = () => {
    sessionStorage.removeItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.FORM_MODE_STATUS)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    sessionStorage.setItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS, JSON.stringify('clear'))

    navigate(AppRoutes.mainScreen)
  }
  return (
    <div className={`grid grid-cols-3 gap-0 rounded-lg shadow-md  max-w-[500px] px-4`}>
      <div className={`text-center  flex flex-col items-center max-w-[80px] cursor-pointer `} onClick={handleBackToForm}>
        <div className='w-[35px] h-[35px] mb-2  '>
          <img src={goBackToForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px]  '>Modify Form</div>
      </div>
      <div className={`text-center  flex flex-col items-center max-w-[80px] cursor-pointer`} onClick={handleOpenCancelFormModal}>
        <div className='w-[35px] h-[35px] mb-2 '>
          <img src={cancelForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px] '>Cancel</div>
      </div>
      <div className={`text-center flex flex-col items-center max-w-[80px] cursor-pointer`}>
        <div className='w-[35px] h-[35px] mb-2 '>
          <img src={submitForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px] '>{waiver ? 'Request for waiver \n & submit form' : 'Submit form'}</div>
      </div>
      {openCancelFormModal ? <CancelFormModal closeModalFunction={handleOpenCancelFormModal} cancelFormCreation={handleCancelFormCreation} /> : null}
    </div>
  )
}

export default ProcessActions
