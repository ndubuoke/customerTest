import React from 'react'
import { CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { formTypeSwitch as formTypeSwitchImage } from 'Assets/svgs'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { useDispatch } from 'react-redux'
import { formStruture } from 'Components/Form/formStructure'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { FormStructureType } from 'Components/types/FormStructure.types'

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

  const handleSetFormType = (formMode: FormModeType) => {
    // const theMode = formMode === 'accelerated' ? 'legacy' : 'accelerated'
    if (!window.confirm(`Switch to ${formMode} form? The information captured so far will be transferred to the ${formMode} form`)) {
      return
    }

    setFillingFormState(formStruture)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    setPublishedFormState(null)

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
    <div
      onClick={() => {
        mode === 'accelerated' ? handleSetFormType('legacy') : handleSetFormType('accelerated')
      }}
      className='absolute right-2 top-2 max-w-[179px]  rounded-lg border border-[#EBE9E9] flex items-center gap-2 p-[18px] pr-2 cursor-pointer bg-white z-50'
    >
      <div>
        <img src={formTypeSwitchImage} />
      </div>
      <span className='text-[14px] min-w-[110px] font-roboto text-center font-normal'>
        Switch to {mode === 'accelerated' ? 'legacy' : 'accelerated'} form
      </span>
    </div>
  )
}

export default SwitchToFormType
