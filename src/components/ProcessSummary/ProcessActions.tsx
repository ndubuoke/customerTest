import React, { useState } from 'react'
import { goBackToForm, cancelForm, submitForm, ModifyIcon } from 'Assets/svgs'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import { isForm } from 'Screens/CustomerCreation'
import { Modal } from 'Components/Modal'
import CancelFormModal from './CancelFormModal'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import WaiverRequestForm from './WaiverRequestForm'
import { FormStructureType } from 'Components/types/FormStructure.types'

type Props = {
  waiver: 'show' | 'hide'
  mode: 'creation' | 'modification'
  customerType: 'individual' | 'sme'
}

const ProcessActions = ({ waiver, mode, customerType }: Props) => {
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null

  const navigate = useNavigate()

  const [openCancelFormModal, setOpenCancelFormModal] = useState<boolean>(false)
  const [openWaiverRequestForm, setOpenWaiverRequestForm] = useState<boolean>(false)

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

  const handleOpenWaiverRequestForm = () => {
    setOpenWaiverRequestForm((prev) => !prev)
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
    <div
      className={`absolute   m-auto bottom-2 right-2  grid grid-cols-3 gap-0 rounded-lg  max-w-[500px] px-4 py-2 bg-white`}
      style={{
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
        zIndex: '1000',
      }}
    >
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
      <div className={`text-center flex flex-col items-center max-w-[80px] cursor-pointer`} onClick={handleOpenWaiverRequestForm}>
        <div className='w-[35px] h-[35px] mb-2 '>
          <img src={submitForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px] '>{waiver === 'show' ? 'Request for waiver \n & submit form' : 'Submit form'}</div>
      </div>
      {openCancelFormModal ? <CancelFormModal closeModalFunction={handleOpenCancelFormModal} cancelFormCreation={handleCancelFormCreation} /> : null}

      {openWaiverRequestForm ? <WaiverRequestForm closeModalFunction={handleOpenWaiverRequestForm} /> : null}
    </div>
  )
}

export default ProcessActions
