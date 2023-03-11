import { danger, Close, ExclaimateIcon, exclamationYellow, greaterThanRed, returnIcon } from 'Assets/svgs'
import React from 'react'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { formStruture } from 'Components/Form/formStructure'
import { useDispatch } from 'react-redux'
import { API } from 'Utilities/api'

type Props = {
  closeModalFunction: () => void
}

const SaveToDraftsModal = ({ closeModalFunction }: Props) => {
  const dispatch = useDispatch()

  //   const handleSetFormType = () => {
  //     console.log('hello')
  //     const formMode = mode === 'accelerated' ? 'legacy' : 'accelerated'
  //     setFillingFormState(formStruture)
  //     sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
  //     sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
  //     setPublishedFormState(null)

  //     if (formMode === 'legacy') {
  //       onSetFormMode(formMode)

  //       if (formCreationStarted) {
  //         dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
  //       }
  //       closeModalFunction()
  //       return
  //     }

  //   }

  const handleSubmit = async () => {
    const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
      ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
      : null

    if (fillingFormInStorage.data.customerData) {
      const data = fillingFormInStorage.data.customerData.map((d) => {
        return {
          sectionId: d.sectionId,
          data: d.data,
        }
      })
      console.log('savetodraft-handleSubmit', data)
      API.post('/draft', {
        requestType: sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS) ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS)) : '',
        firstName: 'Ibrahim',
        surname: 'Adekunle',
        customerType: 'Individual',
        waiverRequestId: null,
        initiator: fillingFormInStorage.data?.requestData?.initiator || '',
        initiatorId: fillingFormInStorage.data?.requestData?.initiatorId || '',
        data,
      })
        .then((res) => console.log('res', res))
        .catch((err) => console.error(err))
    }
    closeModalFunction()
  }

  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
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
          {/* /v1/draft */}
          <div className='mb-4'>
            <img src={exclamationYellow} width={100} height={100} alt='danger' />
          </div>
          Are you sure you want to save to drafts?
          {/* <div
            className='py-3 text-[1rem] leading-[1.75rem] text-[#636363] max-w-[500px] text-center'
            style={{
              letterSpacing: '0.5px',
            }}
          >
           
          </div> */}
        </div>
        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button className=' flex items-center justify-center text-[#667085]'>
            <img src={returnIcon} width={30} height={26} alt='return to modify' />
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4' onClick={handleSubmit}>
              yes
            </span>
          </button>
          <button className='flex items-center justify-center text-white ' onClick={closeModalFunction}>
            <span className='text-[#667085] text-[1rem] leading-[1.1875rem] mx-4'>no</span>
            <img src={greaterThanRed} width={30} height={26} />
          </button>
        </div>
      </section>
    </aside>
  )
}

export default SaveToDraftsModal
