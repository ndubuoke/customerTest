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

export type WaiverTypeType = 'both'

type Props = {
  closeModalFunction: () => void
  waiverType: WaiverTypeType
}

const WaiverRequestFormBoth = ({ closeModalFunction, waiverType = 'both' }: Props) => {
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null
  const [localUploadDOC, setLocalUploadDOC] = useState<Array<any>>([{ file: 'hjjldlssls', signedUrl: 'jhjh' }])
  const [justificationDOC, setJustificationDOC] = useState<string>('')
  const [uploadKeyDOC, setUploadKeyDOC] = useState<Array<string>>([])
  const [initiatorDOC, setInitiatorDOC] = useState('Bona name')
  const [initiatorIdDOC, setInitiatorIdDOC] = useState('rhyme id')

  const [localUploadEDD, setLocalUploadEDD] = useState<Array<any>>([{ file: 'hjjldlssls', signedUrl: 'jhjh' }])
  const [justificationEDD, setJustificationEDD] = useState<string>('')
  const [uploadKeyEDD, setUploadKeyEDD] = useState<Array<string>>([])
  const [initiatorEDD, setInitiatorEDD] = useState('Bona name')
  const [initiatorIdEDD, setInitiatorIdEDD] = useState('rhyme id')

  const handleSubmitWaiver = () => {
    // if (localUploadDOC && localUploadDOC.length > 0 && localUploadEDD && localUploadEDD.length > 0) {
    if (fillingFormInStorage.data.customerData.length > 0) {
      //   fillingFormInStorage.data.waiverData
      //   console.log({ fillingFormInStorage, updatedData })
      const updatedData = fillingFormInStorage.data.waiverData.push(
        {
          documents: [...uploadKeyDOC],
          initiator: initiatorDOC,
          initiatorId: initiatorIdDOC,
          type: 'documentation',
          justification: justificationDOC,
        },
        {
          documents: [...uploadKeyEDD],
          initiator: initiatorEDD,
          initiatorId: initiatorIdEDD,
          type: 'edd',
          justification: justificationEDD,
        }
      )
      console.log(fillingFormInStorage)

      // sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormInStorage))

      // closeModalFunction()
    }
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
      <section className='bg-white min-w-[600px]  w-full max-w-[704px] h-[628px] rounded-[11px] py-6 px-[40px] flex flex-col justify-between overflow-y-auto gap-8'>
        <div className='flex justify-between relative border-b py-3'>
          <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Waiver Request</div>
          <button onClick={closeModalFunction} className=''>
            <img src={Close} width={20} height={20} alt='close' />
          </button>
        </div>
        <div>
          <div className='text-[#333333] text-[16px] font-normal leading-[19px] mb-3'>Provide justification for documentation waiver request:</div>
          <div>
            <textarea
              className='border border-[#aaaaaa] rounded-[4px] h-[120px] max-h-[140px] w-full placeholder:text-[#bcbbbb] text-[#121212] p-3'
              placeholder='Enter text'
              style={{
                border: '1px solid #aaaaaa',
                borderRadius: '4px',
              }}
              value={justificationDOC}
              onChange={(e) => setJustificationDOC(e.target.value)}
            ></textarea>
          </div>
        </div>
        <FileUploadComponent
          setLocalUpload={setLocalUploadDOC}
          hideAddMoreFiles={true}
          setUploadKey={setUploadKeyDOC}
          label='Upload Documentation Supporting Documents'
        />
        <div>
          <div className='text-[#333333] text-[16px] font-normal leading-[19px] mb-3'>Provide justification for EDD waiver request:</div>
          <div>
            <textarea
              className='border border-[#aaaaaa] rounded-[4px] h-[120px] max-h-[140px] w-full placeholder:text-[#bcbbbb] text-[#121212] p-3'
              placeholder='Enter text'
              style={{
                border: '1px solid #aaaaaa',
                borderRadius: '4px',
              }}
              value={justificationEDD}
              onChange={(e) => setJustificationEDD(e.target.value)}
            ></textarea>
          </div>
        </div>
        <FileUploadComponent
          setLocalUpload={setLocalUploadEDD}
          hideAddMoreFiles={true}
          setUploadKey={setUploadKeyEDD}
          label='Upload EDD Supporting Documents'
        />
        <div className='mx-auto w-fit'>
          <Button
            disabled={false}
            // disabled={uploadKeyDOC.length === 0 || uploadKeyEDD.length === 0 || !justificationEDD || !justificationDOC}
            onClick={handleSubmitWaiver}
            text='Submit'
          />
        </div>
      </section>
    </aside>
  )
}

export default WaiverRequestFormBoth
