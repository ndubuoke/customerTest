import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import { IdentificationDetailsType } from 'Screens/CustomerCreation'
import IndividualFile from './IndividualFile'
import { API } from '../../utilities/api'
import Spinner from './Spinner'
import { UploadFile } from 'Components/Shareables'

type Props = {
  identificationDetails?: IdentificationDetailsType
  setLocalUpload: (file: any) => void
}

const FileUploader = memo(({ identificationDetails, setLocalUpload }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    setIsProcessing(true)
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
            // console.log('ocrVerificationResponse', ocrVerificationResponse.data)
            return {
              file,
              verificationData: {
                docType: ocrVerificationResponse.data.data.docType || '',
                extractedData: ocrVerificationResponse.data.data.extractedData || [],
              },
            }
            // if (ocrVerificationResponse.data.data.docType && ocrVerificationResponse.data.data.extractedData.length) {
            //   return {
            //     file,
            //     verificationData: ocrVerificationResponse.data.data,
            //   }
            // } else {
            //   console.error(`docType missing or no extracted data- ${file.name}`)
            //   return null
            // }
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
    setIsProcessing(false)
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

  // useEffect(() => {
  //   console.log({ uploadedFiles })
  // }, [uploadedFiles])

  return (
    <div className={`border rounded-md max-w-[37.4375rem] h-full `}>
      <div className='flex flex-col w-full h-full rounded-lg overflow-hidden bg-white shadow relative min-h-[19.5rem]'>
        {/* loading overlay  */}
        {isProcessing && (
          <div className='absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center min-h-[19.5rem]'>
            <div className='flex items-center'>
              <span className='text-3xl mr-4'>Loading</span>
              {/* loading icon */}
              <Spinner size={'medium'} />
            </div>
          </div>
        )}

        <div {...getRootProps()} className='cursor-pointer'>
          {identificationDetails?.identificationNumber && identificationDetails?.identificationType ? (
            <input type={`file`} hidden {...getInputProps()} />
          ) : null}
          {uploadedFiles.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full pt-3 pb-3 min-h-[19.5rem]'>
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
            <div className='flex flex-col justify-between h-full p-2 overflow-y-auto min-h-[19.5rem]'>
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
      </div>
    </div>
  )
})

export default FileUploader
