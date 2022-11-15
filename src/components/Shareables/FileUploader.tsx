import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import { IdentificationDetailsType } from 'Screens/CustomerCreation'
import IndividualFile from './IndividualFile'
import { API } from '../../utilities/api'

export type UploadFile = {
  file: File
  key: string
}

type Props = {
  identificationDetails?: IdentificationDetailsType
  setLocalUpload: (file: any) => void
}

const FileUploader = memo(({ identificationDetails, setLocalUpload }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)
        try {
          const signedUrlResponse = await API.get('/file/signedurl/' + response.data.data.fileKey)
          try {
            const ocrVerificationResponse = await API.post('/verification/ocr/extraction', {
              imageUrl: signedUrlResponse.data.data,
            })
            console.log('ocrVerificationResponse', ocrVerificationResponse.data)
            return {
              file,
              key: response.data.data.fileKey,
            }
          } catch (err) {
            console.error(err.message, `failed to verify with ocr - ${file.name}`)
            return null
          }
        } catch (err) {
          console.error(err.message, `failed to get signed url - ${file.name}`)
          return null
        }
      } catch (err) {
        console.error(err.message, `failed to upload file - ${file.name}`)
        return null
      }
    })
    const awaitUploadedFiles = await Promise.all(uploadedFiles)
    const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
    setuploadedFiles((prev) => [...prev, ...filterSuccessUploadedFiles])
    setLocalUpload((prev) => [...prev, ...filterSuccessUploadedFiles])
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.log('fileRejections', fileRejections)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
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
    <div {...getRootProps()} className={`border rounded-md max-w-[599px] h-[312px] cursor-pointer`}>
      {identificationDetails?.identificationNumber && identificationDetails?.identificationType ? (
        <input type={`file`} hidden {...getInputProps()} />
      ) : null}
      {uploadedFiles.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full pt-3 pb-3'>
          <div>
            <img src={upload} />
          </div>

          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 border-b-purple-900 '>
            <span className='font-semibold text-primay-main'>Click to upload</span>
            <span> or drag and drop</span>
            <span className='block text-center'>customer's documents</span>
            <span className='block text-center'>.pdf .jpeg .png</span>
          </p>
        </div>
      ) : (
        <div className='flex flex-col justify-between h-full p-2 overflow-y-auto border'>
          <div className='flex gap-3 w-[95%] mx-auto ' style={{ flexWrap: 'wrap' }}>
            {uploadedFiles.map((file: UploadFile, index) => {
              return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
            })}
            <div className='flex items-end mt-auto'>
              <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                <img src={add} className='inline mr-1' /> Add more files
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
