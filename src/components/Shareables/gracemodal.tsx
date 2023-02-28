import { danger, Close, ExclaimateIcon, exclamationYellow, greaterThanRed, returnIcon } from 'Assets/svgs'
import React from 'react'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { formStruture } from 'Components/Form/formStructure'
import { useDispatch } from 'react-redux'

type Props = {
  closeModalFunction: () => void
  switchFunction?: any
  message?: string
  mode: FormModeType
  onSetFormMode: (mode: FormModeType) => void
  customerType: CustomerType
  formCreationStarted: boolean
  fillingFormState: FormStructureType
  setFillingFormState: any
  setPublishedFormState: any
}

const GraceFormModal = ({
  closeModalFunction,
  switchFunction,
  message,
  mode,
  onSetFormMode,
  customerType,
  formCreationStarted,
  fillingFormState,
  setFillingFormState,
  setPublishedFormState,
}: Props) => {
  const dispatch = useDispatch()

  const handleSetFormType = () => {
    console.log('hello')
    const formMode = mode === 'accelerated' ? 'legacy' : 'accelerated'
    setFillingFormState(formStruture)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    setPublishedFormState(null)

    if (formMode === 'legacy') {
      onSetFormMode(formMode)

      if (formCreationStarted) {
        dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
      }
      closeModalFunction()
      return
    }

    // if (formMode === 'accelerated') {
    //   onSetFormMode(formMode)
    //   if (formCreationStarted) {
    //     dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
    //   }
    //   return
    // }
  }

  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[35rem] w-[35rem] h-auto rounded-[.5rem] py-6 px-6 flex flex-col gap-6'>
        <div className='flex justify-between '>
          <div>{/* <img src={danger} width={30} height={30} alt='danger' /> */}</div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div
          className=' py-3 text-[1.125rem] leading-[1.75rem] text-[#333333] font-medium  '
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#636363',
            fontFamily: 'Inter',
            lineHeight: '24px',
          }}
        >
          <div className='mb-4'>
            <img src={exclamationYellow} width={100} height={100} alt='danger' />
          </div>
          Grace period is not enabled!
          <div
            className='py-3 text-[1rem] leading-[1.75rem] text-[#636363] max-w-[500px] text-center'
            style={{
              letterSpacing: '0.5px',
            }}
          >
            Customers created via the accelerated route will remain inactive until document regularization is completed. <br /> Click{' '}
            <span
              style={{
                textDecoration: 'underline',
                color: 'red',
                cursor: 'pointer',
              }}
              onClick={closeModalFunction}
            >
              here
            </span>{' '}
            to enable Grace period
          </div>
        </div>
        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button className='  flex items-center justify-center text-[#667085]' onClick={handleSetFormType}>
            <img src={returnIcon} width={30} height={26} alt='return to modify' />
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Switch to legacy form</span>
          </button>
          <button className='flex items-center justify-center text-white ' onClick={closeModalFunction}>
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>Continue</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </div>

        {/* <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <div
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={handleSetFormType}
          >
            Switch to legacy form
          </div>
          <div
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={closeModalFunction}
          >
            Continue
          </div>
        </div> */}
      </section>
    </aside>
  )
}

export default GraceFormModal
