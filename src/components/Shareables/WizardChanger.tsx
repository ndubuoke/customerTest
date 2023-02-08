import React from 'react'
import { CreationModeType, CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { timer } from 'Assets/svgs'

type Props = {
  formMode: FormModeType
  creationMode: CreationModeType
  customerType: CustomerType
}

const WizardChanger = ({ formMode, creationMode, customerType }: Props) => {
  return (
    <>
      {creationMode === 'single' ? (
        <div className='mt-10 max-w-[48.125rem]   m-auto  flex flex-col justify-center items-center font-roboto'>
          <h2 className='font-bold text-lg text-[#636363]  h-[3rem] mt-5'>
            Welcome to the {formMode === 'accelerated' ? 'Accelerated' : 'Legacy'} Customer Creation Wizard
          </h2>

          <div className='flex items-center gap-3'>
            {customerType === 'individual' ? <img src={timer} /> : null}
            <p className='text-base font-normal text-center text-[#8F8F8F]'>
              {customerType === 'individual' ? (
                formMode === 'accelerated' ? (
                  'The form involves three phases and will require 5 minutes to complete.'
                ) : (
                  'The form involves four phases and will require 20 minutes to complete.'
                )
              ) : formMode === 'accelerated' ? (
                "Please provide some customer's basic information or upload relevant documents to help us fast-track the customer creation process."
              ) : (
                <LegacyTextSme />
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className='mt-10 max-w-[48.125rem]   m-auto  flex flex-col justify-center items-center font-roboto'>
          <h2 className='font-bold text-lg text-[#636363]  h-[3.875rem]'>Welcome to the Accelerated Bulk Customer Creation Wizard</h2>

          <div className='flex items-center gap-3'>
            <p className='text-18 font-normal text-[#8F8F8F] text-center'>
              Please download and complete the provided bulk customer creation template and upload the file in the field below to proceed
            </p>
          </div>
        </div>
      )}
    </>
  )
}

const LegacyTextSme = () => {
  return (
    <>
      Please upload relevant documents to help us fast track the customer creation process. You can simply skip upload by clicking{' '}
      <b>&apos;Skip to form&apos;</b>
    </>
  )
}

export default WizardChanger
