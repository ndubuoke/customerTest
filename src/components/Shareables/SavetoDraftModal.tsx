import { danger, Close, ExclaimateIcon, exclamationYellow, greaterThanRed, returnIcon } from 'Assets/svgs'
import React from 'react'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { CustomerType, FormModeType } from 'Screens/CustomerCreation'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { formStruture } from 'Components/Form/formStructure'
import { useDispatch, useSelector } from 'react-redux'
import { API } from 'Utilities/api'
import { ReducersType } from 'Redux/store'

type Props = {
  closeModalFunction: () => void
}

const SaveToDraftsModal = ({ closeModalFunction }: Props) => {
  const dispatch = useDispatch()
  const userProfileRedux = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as any

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
        initiator: userProfileRedux?.user?.firstname || '' + ' ' + userProfileRedux?.user?.lastname || '',
        initiatorId: userProfileRedux?.user?.id || '',
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
      <section className='bg-white min-w-[25rem] w-[25rem] h-auto rounded-[.5rem] py-6 px-6 flex flex-col gap-4'>
        <div className='flex justify-between '>
          <div>
            <img src={danger} width={30} height={30} alt='danger' />
          </div>
          <button onClick={closeModalFunction}>
            <img src={Close} width={30} height={30} alt='close' />
          </button>
        </div>
        <div className='py-3 text-[1.125rem] leading-[1.75rem] text-[#333333] font-medium  '>
          Do you want to save to drafts?
          <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>Requests in drafts will be deleted after 30days of inactivity</div>
        </div>

        <div className='flex justify-between font-medium text-[base] leading-[1.5rem]'>
          <button
            className='border border-[#d8dae5] rounded-[.5rem] h-[2.75rem] flex items-center justify-center text-[#667085]'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={closeModalFunction}
          >
            No
          </button>
          <button
            className='border  border-[#DC5A5D] bg-[#DC5A5D] rounded-[.5rem] w-[10.375rem] h-[2.75rem] flex items-center justify-center text-white'
            style={{
              width: '10.375rem',
              height: '2.75rem',
            }}
            onClick={handleSubmit}
          >
            Yes
          </button>
        </div>
      </section>
    </aside>
  )
}

export default SaveToDraftsModal
