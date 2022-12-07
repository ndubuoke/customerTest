import { Close, upload } from 'Assets/svgs'
import Button from 'Components/Shareables/Button'
import React, { useState, useCallback } from 'react'
import { UploadFile } from 'Components/Shareables'
import { API } from 'Utilities/api'
import { FileRejection, useDropzone } from 'react-dropzone'
import FileUpload from 'Components/Form/Form-UIs/FileUpload'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'

type Props = {
  closeModalFunction: () => void
  handleSubmitWaiver: () => void
}

const WaiverRequestForm = ({ closeModalFunction, handleSubmitWaiver }: Props) => {
  const [text, setText] = useState<string>('')

  // const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  // const [isProcessing, setIsProcessing] = useState(false)

  // const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
  //   setIsProcessing(true)
  //   const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
  //     try {
  //       const formdata = new FormData()
  //       formdata.append('fileName', file)
  //       const response = await API.post('/file/upload', formdata)

  //       return response
  //     } catch (err) {
  //       console.error(err.message, `failed to upload file - ${file.name}`)
  //       return null
  //     }
  //   })
  //   const awaitUploadedFiles = await Promise.all(uploadedFiles)
  //   const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
  //   setuploadedFiles((prev) => [...prev, ...filterSuccessUploadedFiles])
  //   // setLocalUpload((prev) => [...prev, ...filterSuccessUploadedFiles])
  //   setIsProcessing(false)
  // }, [])

  // const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
  //   console.log('fileRejections', fileRejections)
  // }, [])

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   onDropRejected,
  //   accept: {
  //     'image/jpeg': [],
  //     'image/png': [],
  //     'application/pdf': ['.pdf'],
  //   },
  // })

  // const handleRemoveFile = (e: any, index: number) => {
  //   e.stopPropagation()
  //   const newFiles = uploadedFiles.filter((item, i) => i !== index)

  //   setuploadedFiles((prev) => newFiles)
  //   // setLocalUpload((prev) => newFiles)
  // }
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
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <FileUploadComponent setLocalUpload={(file) => console.log({ theReceivedFiles: file })} hideAddMoreFiles={true} />
        <div className='mx-auto w-fit'>
          <Button disabled={false} onClick={handleSubmitWaiver} text='Submit' />
        </div>
      </section>
    </aside>
  )
}

export default WaiverRequestForm
