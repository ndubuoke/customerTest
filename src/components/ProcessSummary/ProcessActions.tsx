import React, { useState, useEffect } from 'react'
import { goBackToForm, cancelForm, submitForm, ModifyIcon } from 'Assets/svgs'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import { isForm } from 'Screens/CustomerCreation'
import { Modal } from 'Components/Modal'
import CancelFormModal from './CancelFormModal'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import WaiverRequestForm, { WaiverTypeType } from './WaiverRequestForm'
import { FormStructureType } from 'Components/types/FormStructure.types'
import FormSubmissionAlert from './FormSubmissionAlert'
import WaiverRequestFormBoth from './WaiverRequestFormBoth'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { submitFormAction } from 'Redux/actions/FormManagement.actions'
import { FormTypeType } from 'Screens/ProcessSummary'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import FormSubmissionLoader from './Loader'
import FormSubmissionError from './FormSubmissionError'

type Props = {
  openWaiver: 'show' | 'hide'
  mode: 'creation' | 'modification'
  customerType: 'individual' | 'sme'
  waiverType: WaiverTypeType
  formType: FormTypeType
  initiator: string
  initiatorId: string
}

const ProcessActions = ({ openWaiver, mode, customerType, waiverType = 'both', formType, initiator, initiatorId }: Props) => {
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openCancelFormModal, setOpenCancelFormModal] = useState<boolean>(false)
  const [openWaiverRequestForm, setOpenWaiverRequestForm] = useState<boolean>(false)

  // Remove this later
  const [openModal, setOpenModal] = useState<boolean>(false)

  const submitFormRedux = useSelector<ReducersType>((state: ReducersType) => state.submitForm) as any // ResponseType

  const handleBackToForm = (e: any) => {
    e.stopPropagation()
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

    // setOpenModal(true)
  }

  const handleCancelFormCreation = (e: any) => {
    e.stopPropagation()
    sessionStorage.removeItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.FORM_MODE_STATUS)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    sessionStorage.setItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS, JSON.stringify('clear'))

    navigate(AppRoutes.mainScreen)
  }

  const handleSubmitForm = () => {
    // Simulate success
    setOpenModal(true)
    if (customerType === 'individual') {
      fillingFormInStorage.data.requestData = {
        initiator,
        initiatorId,
        requestType: mode,
      }
      // console.log(fillingFormInStorage)
      dispatch(submitFormAction(formType, customerType, fillingFormInStorage) as any)
    }
  }

  const handleSubmitModifiedForm = () => {
    // Simulate success
    setOpenModal(true)
    if (customerType === 'individual') {
      fillingFormInStorage.data.requestData = {
        initiator,
        initiatorId,
        requestType: mode,
      }

      // console.log(fillingFormInStorage)
      dispatch(submitFormAction(formType, customerType, fillingFormInStorage) as any)
    }
  }
  console.log('submitFormRedux', submitFormRedux)
  useEffect(() => {
    if (submitFormRedux?.success) {
      console.log(submitFormRedux)
    }
  }, [submitFormRedux?.success])

  useEffect(() => {
    if (submitFormRedux?.serverError) {
      console.log(submitFormRedux)
    }
  }, [submitFormRedux.serverError])

  return (
    <div
      className={`absolute   m-auto bottom-2 right-2  grid grid-cols-3 gap-0 rounded-lg  max-w-[31.25rem] px-4 py-2 bg-white`}
      style={{
        boxShadow: '0rem 0rem .5rem rgba(0, 0, 0, 0.25)',
        zIndex: '1000',
      }}
    >
      <div className={`text-center  flex flex-col items-center max-w-[5rem] cursor-pointer `} onClick={handleBackToForm}>
        <div className='w-[2.1875rem] h-[2.1875rem] mb-2  '>
          <img src={goBackToForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[.75rem]  '>Modify Form</div>
      </div>
      <div className={`text-center  flex flex-col items-center max-w-[5rem] cursor-pointer`} onClick={handleOpenCancelFormModal}>
        <div className='w-[2.1875rem] h-[2.1875rem] mb-2 '>
          <img src={cancelForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px] '>Cancel</div>
      </div>
      <div
        className={`text-center flex flex-col items-center max-w-[5rem] cursor-pointer`}
        onClick={openWaiver === 'show' ? handleOpenWaiverRequestForm : mode === 'creation' ? handleSubmitForm : handleSubmitModifiedForm}
      >
        <div className='w-[2.1875rem] h-[2.1875rem] mb-2 '>
          <img src={submitForm} alt='go back' width={30} height={24} />
        </div>
        <div className='text-[12px] '>{openWaiver === 'show' ? 'Request for waiver \n & submit form' : 'Submit form'}</div>
      </div>
      {openCancelFormModal ? <CancelFormModal closeModalFunction={handleOpenCancelFormModal} cancelFormCreation={handleCancelFormCreation} /> : null}

      {openWaiverRequestForm ? (
        waiverType === 'both' ? (
          <WaiverRequestFormBoth closeModalFunction={handleOpenWaiverRequestForm} waiverType={waiverType} />
        ) : (
          <WaiverRequestForm
            closeModalFunction={handleOpenWaiverRequestForm}
            waiverType={waiverType}
            initiator={initiator}
            initiatorId={initiatorId}
          />
        )
      ) : null}
      {openWaiver === 'hide' && submitFormRedux?.loading ? <FormSubmissionLoader /> : null}
      {openWaiver === 'hide' && openModal ? (
        <> {submitFormRedux?.success ? <FormSubmissionAlert closeModalFunction={() => setOpenModal(false)} /> : null}</>
      ) : null}
      {openWaiver === 'hide' && openModal ? (
        <>
          {' '}
          {submitFormRedux?.serverError && Object.keys(submitFormRedux.serverError).length ? (
            <FormSubmissionError
              error={submitFormRedux?.serverError?.error?.message || 'An error occured. Could not save the form'}
              closeModalFunction={() => setOpenModal(false)}
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default ProcessActions
