import React, { useState } from 'react'
import { CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { formTypeSwitch as formTypeSwitchImage } from 'Assets/svgs'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { useDispatch } from 'react-redux'
import { formStruture } from 'Components/Form/formStructure'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { FormStructureType } from 'Components/types/FormStructure.types'
import SwitchFormModal from './SwitchFormModal'

type Props = {
  mode: FormModeType
  onSetFormMode: (mode: FormModeType) => void
  customerType: CustomerType
  formCreationStarted: boolean
  fillingFormState: FormStructureType
  setFillingFormState: any
  setPublishedFormState: any
}

const SwitchToFormType = ({
  mode,
  onSetFormMode,
  customerType,
  formCreationStarted,
  fillingFormState,
  setFillingFormState,
  setPublishedFormState,
}: Props) => {
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal((prev) => !prev)
  }

  const handleSetFormType = () => {
    const formMode = mode === 'accelerated' ? 'legacy' : 'accelerated'
    setFillingFormState(formStruture)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    setPublishedFormState(null)
    handleOpenModal()

    if (formMode === 'legacy') {
      onSetFormMode(formMode)

      if (formCreationStarted) {
        dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
      }
      return
    }

    if (formMode === 'accelerated') {
      onSetFormMode(formMode)
      if (formCreationStarted) {
        dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
      }
      return
    }
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation()
          // handleOpenModal()
          mode === 'accelerated' ? handleSetFormType() : handleSetFormType()
        }}
        className='absolute right-2 top-2 max-w-[11.1875rem]  rounded-lg border border-[#EBE9E9] flex items-center gap-2 p-[1.125rem] pr-2 cursor-pointer '
        style={{
          background: 'rgba(219, 53, 57, 0.02)',
          color: '#636363',
        }}
      >
        <div>
          <img src={formTypeSwitchImage} />
        </div>
        <span className=' min-w-[6.875rem] font-roboto text-center font-light bg-background-[red]' style={{ fontSize: '0.8rem' }}>
          Switch to {mode === 'accelerated' ? 'legacy' : 'accelerated'} form
        </span>
      </div>
      {/* {openModal ? (
        <SwitchFormModal
          message={` Switch to ${
            mode === 'accelerated' ? 'legacy' : 'accelerated'
          } form? The information captured so far will be transferred to the ${mode === 'accelerated' ? 'legacy' : 'accelerated'} form`}
          closeModalFunction={handleOpenModal}
          switchFunction={handleSetFormType}
        />
      ) : null} */}
    </>
  )
}

export default SwitchToFormType
