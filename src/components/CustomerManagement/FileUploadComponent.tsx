import React, { useCallback, useState, useEffect, memo } from 'react'
import { useDropzone } from 'react-dropzone'

import { add, upload, deleteBtn } from 'Assets/svgs'
import IndividualFile from 'Components/Shareables/IndividualFile'
import { API } from 'Utilities/api'

type Props = {
  setLocalUpload: (file: any) => void
}
type UploadFile = {
  file: File
  key: string
}

const FileUploadComponent = ({ setLocalUpload }: Props) => {
  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)
        return {
          file,
          key: response.data.data.fileKey,
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
        <label className='capitalize text-[#333333] text-sm'>Upload Supporting Documents</label>
      </div>
      <div {...getRootProps()} className={`border border-b-0 p-2 mt-2 rounded-md w-[70%] h-[50px] cursor-pointer`}>
        <input type={`file`} hidden {...getInputProps()} />

        {uploadedFiles.length === 0 ? (
          <div className='flex  justify-between items-center pt-3 pb-3 h-full '>
            <div>
              <img src={upload} className='w-12' />
            </div>

            <p className='mb-2 text-sm   '>
              <span className='font-semibold text-primay-main'>Click to upload</span>
              <span> or drag and drop</span>
              {/* <span className='block text-center'>customer's documents</span>
              <span className='block text-center'>.pdf .jpeg .png</span> */}
            </p>
          </div>
        ) : (
          <div className='flex flex-col justify-between  p-2 border h-full overflow-y-auto'>
            <div className='flex gap-3 w-[95%] mx-auto ' style={{ flexWrap: 'wrap' }}>
              {uploadedFiles.map((file: UploadFile, index) => {
                return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
              })}
              <div className='flex items-end mt-auto'>
                <button className='flex items-end ' style={{ marginTop: 'auto' }}>
                  <img src={add} className='mr-1 inline' /> Add more files
                </button>
              </div>
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
                Delete all
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FileUploadComponent
