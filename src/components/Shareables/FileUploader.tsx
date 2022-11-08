import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import { IdentificationDetailsType } from 'Screens/CustomerCreation'
import IndividualFile from './IndividualFile'

type Props = {
  identificationDetails: IdentificationDetailsType
  setLocalUpload: (file: any) => void
}

const FileUploader = memo(({ identificationDetails, setLocalUpload }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<File>>([])

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setuploadedFiles((prev) => [...prev, ...acceptedFiles])
    setLocalUpload((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': ['.pdf'],
    },
  })

  const handleRemoveFile = (e: any, index: number) => {
    e.stopPropagation()
    const newFiles = uploadedFiles.filter((item, i) => i !== index)

    setuploadedFiles((prev) => newFiles)
    setLocalUpload((prev) => newFiles)
  }

  return (
    <div {...getRootProps()} className='border rounded-md max-w-[599px] h-[312px] cursor-pointer'>
      {identificationDetails.identificationNumber && identificationDetails.identificationType ? (
        <input type={`file`} hidden {...getInputProps()} />
      ) : null}
      {uploadedFiles.length === 0 ? (
        <div className='flex flex-col items-center justify-center pt-3 pb-3 h-full'>
          <div>
            <img src={upload} />
          </div>

          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 border-b-purple-900  '>
            <span className='font-semibold text-primay-main'>Click to upload</span>
            <span> or drag and drop</span>
            <span className='block text-center'>customer's documents</span>
            <span className='block text-center'>.pdf .jpeg .png</span>
          </p>
        </div>
      ) : (
        <div className='flex flex-col justify-between  p-2 border h-full overflow-y-auto'>
          <div className='flex gap-3 w-[95%] mx-auto ' style={{ flexWrap: 'wrap' }}>
            {uploadedFiles.map((file: File, index) => {
              return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
            })}
            <div className='flex items-end mt-auto'>
              <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                <img src={add} className='mr-1 inline' /> Add more files
              </button>
            </div>
          </div>
          <div className='flex justify-between'>
            <p onClick={(e) => e.stopPropagation()}>{uploadedFiles.length} files uploaded</p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setLocalUpload([])
                setuploadedFiles([])
              }}
              className='flex gap-3'
            >
              <img src={deleteBtn} />
              Delete all
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default FileUploader
