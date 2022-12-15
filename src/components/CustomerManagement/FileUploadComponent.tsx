import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import IndividualFile from 'Components/Shareables/IndividualFile'
import { API } from 'Utilities/api'
import Spinner from 'Components/Shareables/Spinner'

type Props = {
  setLocalUpload: (file: any) => void
  hideAddMoreFiles?: boolean
  setUploadKey?: any
}
type UploadFile = {
  file: File
  signedUrl: string
}

const FileUploadComponent = ({ setLocalUpload, hideAddMoreFiles, setUploadKey }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errorUploading, setErrorUploading] = useState<string>('')

  const onDrop = useCallback(async (acceptedFiles: Array<File>, fileRejections) => {
    setLoading(true)
    const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)
        setLoading(false)

        console.log(response?.data?.data)
        setUploadKey((prev) => [...prev, response?.data?.data?.fileKey])
        try {
          const signedUrlResponse = await API.get('/file/signedurl/' + response?.data?.data?.fileKey)
          return {
            file,
            signedUrl: signedUrlResponse?.data?.data,
          }
        } catch (err) {
          console.error(err.message, `failed to get signed url - ${file.name}`)
          setErrorUploading(`failed to upload file - ${file.name}`)

          return null
        }
      } catch (err) {
        setLoading(false)
        setErrorUploading(`failed2to upload file - ${file.name}`)

        console.error(err.message, `failed to upload file - ${file.name}`)
        return null
      }
    })
    if (fileRejections.length) {
      setErrorUploading(`File not accepted`)
      return
    }

    // response?.data?.data?.fileKey
    const awaitUploadedFiles = await Promise.all(uploadedFiles)
    const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
    setuploadedFiles((prev) => [...prev, ...filterSuccessUploadedFiles])
    setLocalUpload((prev) => [...prev, ...filterSuccessUploadedFiles])
    // console.log(filterSuccessUploadedFiles)
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
      <div className='mb-3'>
        <label className='capitalize text-[#333333] text-[16px] leading-[19px] '>Upload Supporting Documents</label>
      </div>
      <div
        className={`flex gap-12 w-full max-w-[392px] min-h-[110px] max-h-[120px] border border-[#c4c4c4] rounded-[10px] items-center px-3  relative `}
      >
        {loading ? (
          <div className='flex items-center  h-[150px]'>
            <span>Loading</span>
            <Spinner size={'small'} />
          </div>
        ) : (
          <>
            {' '}
            {uploadedFiles && uploadedFiles?.length === 0 ? (
              <div {...getRootProps()} className='flex items-center justify-between h-full pt-3 pb-3 cursor-pointer'>
                <input type={`file`} hidden {...getInputProps()} />
                <div>
                  <img src={upload} className='w-12' width={48} height={48} />
                </div>

                <p className='mb-2 text-sm '>
                  <span className='font-semibold text-primay-main'>Click to upload</span>
                  <span> or drag and drop</span>
                </p>
              </div>
            ) : (
              <div
                className='flex flex-col justify-between h-full gap-2 p-2 overflow-x-hidden overflow-y-auto'
                style={{
                  border: hideAddMoreFiles ? '' : '1px solid #cccccc',
                }}
              >
                <div className='h-full '>
                  {uploadedFiles.map((file: UploadFile, index) => {
                    return (
                      <IndividualFile
                        file={file}
                        key={index}
                        removeFile={(e) => handleRemoveFile(e, index)}
                        height={hideAddMoreFiles ? 100 : 110}
                        waiverRequest
                      />
                    )
                  })}
                  {hideAddMoreFiles ? null : (
                    <div className='flex items-end mt-auto' {...getRootProps()}>
                      <input type={`file`} hidden {...getInputProps()} />
                      <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                        <img src={add} className='inline mr-1' /> Add more files
                      </button>
                    </div>
                  )}
                </div>
                {hideAddMoreFiles ? (
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
                ) : (
                  <div
                    className='flex gap-2 '
                    style={{
                      justifyContent: 'space-between',
                    }}
                  >
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
                )}
              </div>
            )}
          </>
        )}
      </div>
      {errorUploading ? <p className='text-red-400'>{errorUploading}</p> : null}
    </div>
  )
}

export default FileUploadComponent
