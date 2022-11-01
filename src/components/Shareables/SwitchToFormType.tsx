import React from 'react'
import { FormModeType } from 'Screens/CustomerCreation'
import { formTypeSwitch as formTypeSwitchImage } from 'Assets/svgs'

type Props = {
  mode: FormModeType
  setFormMode: (mode: FormModeType) => void
}

const SwitchToFormType = ({ mode, setFormMode }: Props) => {
  const handleSetFormType = (formMode: FormModeType) => {
    if (formMode === 'legacy') {
      setFormMode(formMode)
      return
    }

    if (formMode === 'accelerated') {
      setFormMode(formMode)
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