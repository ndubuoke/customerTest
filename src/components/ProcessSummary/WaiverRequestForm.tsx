import { Close, upload } from 'Assets/svgs'
import Button from 'Components/Shareables/Button'
import React, { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react'
import { UploadFile } from 'Components/Shareables'
import { API } from 'Utilities/api'
import { FileRejection, useDropzone } from 'react-dropzone'
import FileUpload from 'Components/Form/Form-UIs/FileUpload'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { FormTypeType } from 'Screens/ProcessSummary'
import { useDispatch } from 'react-redux'
import { submitFormAction } from 'Redux/actions/FormManagement.actions'

export type WaiverTypeType = 'documentation' | 'edd' | 'both'

type Props = {
  closeModalFunction: () => void
  waiverType: WaiverTypeType
  initiator: string
  initiatorId: string
  customerType: 'individual' | 'sme'
  formType: FormTypeType
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const WaiverRequestForm = ({
  closeModalFunction,
  waiverType = 'documentation',
  initiator,
  initiatorId,
  customerType,
  formType,
  setOpenModal,
}: Props) => {
  const dispatch = useDispatch()
  console.log('waiverType', waiverType)
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null
  const [localUpload, setLocalUpload] = useState<Array<any>>([])
  const [justification, setJustification] = useState<string>('')
  const [uploadKey, setUploadKey] = useState<Array<string>>([])

  const handleSubmitWaiver = () => {
    if (localUpload && localUpload.length > 0 && customerType === 'individual') {
      if (fillingFormInStorage.data.customerData.length > 0) {
        const updatedData = fillingFormInStorage.data.waiverData
        fillingFormInStorage.data.waiverData = [
          {
            // ...updatedData,
            documents: [...uploadKey],
            initiator,
            initiatorId,
            type: waiverType,
            justification,
          },
        ]

        sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormInStorage))
        setOpenModal(true)
        dispatch(submitFormAction(formType, customerType, fillingFormInStorage) as any)
        closeModalFunction()
      }
    }
  }

  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[37.5rem]  w-full max-w-[44rem] h-[39.25rem] rounded-[.6875rem] py-6 px-[2.5rem] flex flex-col justify-between '>
        <div className='relative flex justify-between py-3 border-b'>
          <div className='font-bold text-[1.5rem] leading-[1.8125rem] text-[#747373]'>
            {waiverType === 'edd' ? 'Enhanced Due Dilligence Waiver Request' : 'Waiver Request'}
          </div>
          <button onClick={closeModalFunction} className=''>
            <img src={Close} width={20} height={20} alt='close' />
          </button>
        </div>
        <div>
          <div className='text-[#333333] text-[1rem] font-normal leading-[1.1875rem] mb-3'>Provide justification for waiver request:</div>
          <div>
            <textarea
              className='border border-[#aaaaaa] rounded-[.25rem] h-[7.5rem] max-h-[8.75rem] w-full placeholder:text-[#bcbbbb] text-[#121212] p-3'
              placeholder='Enter text'
              style={{
                border: '.0625rem solid #aaaaaa',
                borderRadius: '.25rem',
              }}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            ></textarea>
          </div>
        </div>
        <FileUploadComponent setLocalUpload={setLocalUpload} hideAddMoreFiles={true} setUploadKey={setUploadKey} />
        <div className='mx-auto w-fit'>
          <Button disabled={uploadKey.length === 0 || !justification} onClick={handleSubmitWaiver} text='Submit' />
        </div>
      </section>
    </aside>
  )
}

export default WaiverRequestForm
