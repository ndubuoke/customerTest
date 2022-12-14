import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { API } from 'Utilities/api'
import FieldLabel from './FieldLabel'
import { add, upload, deleteBtn } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import IndividualFile from 'Components/Shareables/IndividualFile'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { unfilledRequiredSignatoryListAction } from 'Redux/actions/FormManagement.actions'

type UploadFile = {
  file: File
  signedUrl: string
}

type Props = {
  required: 'on' | 'off'
  id: SignatoryDetailType
  colspan?: number
  text: SignatoryDetailType
  value: UploadFile
  setValue: (value: any) => any
  type?: 'text' | 'number' | 'date' | 'email'
  placeholder: string
  maximumNumbersOfCharacters: number
  setLocalUpload: (file: any) => void
  setUploadKey?: any
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
  const dispatch = useDispatch()

  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState({
    isError: false,
    message: '',
  })

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

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
      // console.log({ fileName: filterSuccessUploadedFiles[0].signedUrl })
      setValue((prev: any) => ({
        ...prev,
        [text]: {
          file: {
            type: filterSuccessUploadedFiles[0].file.type,
          },
          signedUrl: filterSuccessUploadedFiles[0].signedUrl,
        },
      }))
      handleRedispatchOfRequiredFields()
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

    setValue((prev: any) => ({
      ...prev,
      [text]: null,
    }))
  }

  const handleRedispatchOfRequiredFields = () => {
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }
  }

  return (
    <div>
      <div className='relative w-fit mb-2'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel text={text} colspan={colspan} id={id} />
      </div>

      <div className='flex'>
        <div
          className={`flex gap-12 w-full max-w-[392px] min-h-[100px] max-h-[100px] border border-[#c4c4c4] rounded-[10px] items-center px-3  relative `}
        >
          {isUploading ? (
            <div className='flex items-center  h-[100px]'>
              <span>Loading</span>
              <Spinner size={'small'} />
            </div>
          ) : (
            <>
              {' '}
              {uploadedFiles && uploadedFiles?.length === 0 ? (
                !value?.signedUrl ? (
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
                    className='flex flex-col justify-between  p-2 h-full overflow-y-auto overflow-x-hidden gap-2 max-h-[95px] w-[90%]'
                    style={{
                      border: '1px solid #cccccc',
                    }}
                  >
                    <div> {value?.signedUrl ? value?.signedUrl : null}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile(e, 0)
                      }}
                      className='absolute right-1 bottom-1'
                    >
                      <img src={deleteBtn} />
                    </button>
                  </div>
                )
              ) : (
                <div
                  className='flex flex-col justify-between  p-2 h-full overflow-y-auto overflow-x-hidden gap-2 max-h-[95px]  w-[90%]'
                  style={{
                    border: '1px solid #cccccc',
                  }}
                >
                  <div> {uploadedFiles[0]?.file?.name ? uploadedFiles[0]?.file?.name : value?.signedUrl ? value?.signedUrl : null}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile(e, 0)
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
        <div className=' h-full mx-4'>
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((file: UploadFile, index) => {
              return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} height={90} />
            })
          ) : value?.signedUrl ? (
            <IndividualFile
              file={value}
              removeFile={(e) =>
                setValue((prev: any) => ({
                  ...prev,
                  [text]: null,
                }))
              }
              height={90}
            />
          ) : null}
        </div>
      </div>
      {fileUploadError.isError && <p className='text-red-400'>{fileUploadError.message}</p>}
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default FileUploadSignatory
