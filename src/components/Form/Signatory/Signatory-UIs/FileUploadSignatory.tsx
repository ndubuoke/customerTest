import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { API } from 'Utilities/api'
import FieldLabel from './FieldLabel'
import { add, upload, deleteBtn } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import IndividualFile from 'Components/Shareables/IndividualFile'

type Props = {
  required: 'on' | 'off'
  id: SignatoryDetailType
  colspan?: number
  text: SignatoryDetailType
  value: string
  setValue: (value: any) => any
  type?: 'text' | 'number' | 'date' | 'email'
  placeholder: string
  maximumNumbersOfCharacters: number
  setLocalUpload: (file: any) => void
  setUploadKey?: any
}

type UploadFile = {
  file: File
  signedUrl: string
}

const FileUploadSignatory = ({
  id,
  maximumNumbersOfCharacters,
  placeholder,
  required,
  setValue,
  text,
  value,
  colspan,
  type,
  setLocalUpload,
  setUploadKey,
}: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState({
    isError: false,
    message: '',
  })

  const onDrop = useCallback(async (acceptedFiles: Array<File>, fileRejections) => {
    setIsUploading(true)
    const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)
        try {
          const signedUrlResponse = await API.get('/file/signedurl/' + response.data.data.fileKey)
          setIsUploading(false)
          return {
            file,
            signedUrl: signedUrlResponse.data.data,
          }
        } catch (err) {
          setIsUploading(false)
          console.error(err.message, `failed to get signed url - ${file.name}`)
          setFileUploadError({
            isError: true,
            message: `failed to get signed url - ${file.name}`,
          })
          return null
        }
      } catch (err) {
        setIsUploading(false)
        console.error(err.message, `failed to upload file - ${file.name}`)
        setFileUploadError({
          isError: true,
          message: `failed to upload file - ${file.name}`,
        })
        return null
      }
    })

    if (fileRejections.length) {
      setFileUploadError({
        isError: true,
        message: 'File not accepted',
      })
      return
    }
    const awaitUploadedFiles = await Promise.all(uploadedFiles)
    const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
    setuploadedFiles(filterSuccessUploadedFiles)
    setIsUploading(false)

    if (filterSuccessUploadedFiles.length) {
      setValue((prev: any) => ({
        ...prev,
        [text]: {
          file: {
            type: filterSuccessUploadedFiles[0].file.type,
          },
          signedUrl: filterSuccessUploadedFiles[0].signedUrl,
        },
      }))
    }
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
    <div>
      <div className='relative w-fit mb-2'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel text={text} colspan={colspan} id={id} />
      </div>

      <div
        className={`flex gap-12 w-full max-w-[392px] min-h-[110px] max-h-[140px] border border-[#c4c4c4] rounded-[10px] items-center px-3  relative `}
      >
        {isUploading ? (
          <div className='flex items-center  h-[150px]'>
            <span>Loading</span>
            <Spinner size={'small'} />
          </div>
        ) : (
          <>
            {' '}
            {uploadedFiles && uploadedFiles?.length === 0 ? (
              <div {...getRootProps()} className='flex  justify-between items-center pt-3 pb-3 h-full cursor-pointer'>
                <input type={`file`} hidden {...getInputProps()} />
                <div>
                  <img src={upload} className='w-12' width={48} height={48} />
                </div>

                <p className='mb-2 text-sm   '>
                  <span className='font-semibold text-primay-main'>Click to upload</span>
                  <span> or drag and drop</span>
                </p>
              </div>
            ) : (
              <div
                className='flex flex-col justify-between  p-2 h-full overflow-y-auto overflow-x-hidden gap-2'
                style={{
                  border: '1px solid #cccccc',
                }}
              >
                <div className=' h-full'>
                  {uploadedFiles.map((file: UploadFile, index) => {
                    return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} height={110} waiverRequest />
                  })}
                  {/* {hideAddMoreFiles ? null : (
                    <div className='flex items-end mt-auto' {...getRootProps()}>
                      <input type={`file`} hidden {...getInputProps()} />
                      <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                        <img src={add} className='mr-1 inline' /> Add more files
                      </button>
                    </div>
                  )} */}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLocalUpload([])
                    setuploadedFiles([])
                  }}
                  className='absolute right-1 bottom-1'
                >
                  <img src={deleteBtn} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {fileUploadError.isError && <p className='text-red-400'>{fileUploadError.message}</p>}
    </div>
  )
}

export default FileUploadSignatory
