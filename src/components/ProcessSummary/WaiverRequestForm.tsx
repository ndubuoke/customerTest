import { Close, upload } from 'Assets/svgs'
import Button from 'Components/Shareables/Button'
import React, { useState, useCallback, useEffect } from 'react'
import { UploadFile } from 'Components/Shareables'
import { API } from 'Utilities/api'
import { FileRejection, useDropzone } from 'react-dropzone'
import FileUpload from 'Components/Form/Form-UIs/FileUpload'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { STORAGE_NAMES } from 'Utilities/browserStorages'

export type WaiverTypeType = 'documentation' | 'edd' | 'both'

type Props = {
  closeModalFunction: () => void
  waiverType: WaiverTypeType
}

const WaiverRequestForm = ({ closeModalFunction, waiverType = 'documentation' }: Props) => {
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null
  const [localUpload, setLocalUpload] = useState<Array<any>>([])
  const [justification, setJustification] = useState<string>('')
  const [uploadKey, setUploadKey] = useState<Array<string>>([])
  const [initiator, setInitiator] = useState('Bona name')
  const [initiatorId, setInitiatorId] = useState('rhyme id')

  const handleSubmitWaiver = () => {
    if (localUpload && localUpload.length > 0) {
      if (fillingFormInStorage.data.customerData.length > 0) {
        const updatedData = fillingFormInStorage.data.waiverData
        fillingFormInStorage.data.waiverData.push({
          // ...updatedData,
          documents: [...uploadKey],
          initiator,
          initiatorId,
          type: waiverType,
          justification,
        })

        sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormInStorage))

        closeModalFunction()
      }
    }
  }

  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[600px]  w-full max-w-[704px] h-[628px] rounded-[11px] py-6 px-[40px] flex flex-col justify-between '>
        <div className='flex justify-between relative border-b py-3'>
          <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Waiver Request</div>
          <button onClick={closeModalFunction} className=''>
            <img src={Close} width={20} height={20} alt='close' />
          </button>
        </div>
        <div>
          <div className='text-[#333333] text-[16px] font-normal leading-[19px] mb-3'>Provide justification for waiver request:</div>
          <div>
            <textarea
              className='border border-[#aaaaaa] rounded-[4px] h-[120px] max-h-[140px] w-full placeholder:text-[#bcbbbb] text-[#121212] p-3'
              placeholder='Enter text'
              style={{
                border: '1px solid #aaaaaa',
                borderRadius: '4px',
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
