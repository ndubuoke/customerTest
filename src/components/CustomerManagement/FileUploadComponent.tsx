import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import IndividualFile from 'Components/Shareables/IndividualFile'
import { API } from 'Utilities/api'
import Spinner from 'Components/Shareables/Spinner'

type Props = {
  setLocalUpload: (file: any) => void
  hideAddMoreFiles?: boolean
}
type UploadFile = {
  file: File
  key: string
}

const FileUploadComponent = ({ setLocalUpload, hideAddMoreFiles }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errorUploading, setErrorUploading] = useState<string>('')

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    setLoading(true)
    const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)
        setLoading(false)
        return {
          file,
          key: response.data.data.fileKey,
        }
      } catch (err) {
        setLoading(false)
        setErrorUploading(`failed to upload file - ${file.name}`)

        // console.error(err.message, `failed to upload file - ${file.name}`)
        return null
      }
    })
    const awaitUploadedFiles = await Promise.all(uploadedFiles)
    const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
    setuploadedFiles((prev) => [...prev, ...filterSuccessUploadedFiles])
    setLocalUpload((prev) => [...prev, ...filterSuccessUploadedFiles])
    console.log({ filterSuccessUploadedFiles })
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
    <>
      <div>
        <label className='capitalize text-[#333333] text-[16px] leading-[19px] mb-3'>Upload Supporting Documents</label>
      </div>
      <div className={`flex gap-12 w-full max-w-[392px] min-h-[86px] max-h-[120px] border border-[#c4c4c4] rounded-[10px] items-center px-3`}>
        {loading ? (
          <div className='flex items-center  h-[150px]'>
            <span className='text-3xl mr-4'>Loading</span>
            <Spinner size={'small'} />
          </div>
        ) : (
          <>
            {' '}
            {uploadedFiles.length === 0 ? (
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
              <div className='flex flex-col justify-between  p-2 border h-full overflow-y-auto'>
                <>
                  <div className='flex gap-3 w-[95%] mx-auto ' style={{ flexWrap: 'wrap' }}>
                    {uploadedFiles.map((file: UploadFile, index) => {
                      return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
                    })}
                    {hideAddMoreFiles ? null : (
                      <div className='flex items-end mt-auto' {...getRootProps()}>
                        <input type={`file`} hidden {...getInputProps()} />
                        <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                          <img src={add} className='mr-1 inline' /> Add more files
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='flex justify-between '>
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
                      {hideAddMoreFiles ? null : 'Delete all'}
                    </button>
                  </div>
                </>
              </div>
            )}
          </>
        )}
      </div>
      {errorUploading ? <p className='text-red-400'>{errorUploading}</p> : null}
    </>
  )
}

export default FileUploadComponent
