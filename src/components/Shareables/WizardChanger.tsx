import React from 'react'
import { CreationModeType, FormModeType } from 'Screens/CustomerCreation'
import { timer } from 'Assets/svgs'

type Props = {
  formMode: FormModeType
  creationMode: CreationModeType
}

const WizardChanger = ({ formMode, creationMode }: Props) => {
  return (
    <>
      {creationMode === 'single' ? (
        <div className='mt-10 max-w-[770px]   m-auto  flex flex-col justify-center items-center font-roboto'>
          <h2 className='font-bold text-lg text-[#636363]  h-[62px]'>
            Welcome to the {formMode === 'accelerated' ? 'Accelerated' : 'Legacy'} Customer Creation Wizard
          </h2>

          <div className='flex items-center gap-3'>
            <img src={timer} />
            <p className='text-18 font-normal text-[#8F8F8F]'>
              {formMode === 'accelerated'
                ? 'The form involves three phases and will require 5 minutes to complete.'
                : 'The form involves four phases and will require 20 minutes to complete.'}
            </p>
          </div>
        </div>
      ) : (
        <div>For bulk</div>
      )}
    </>
  )
}

export default WizardChanger
