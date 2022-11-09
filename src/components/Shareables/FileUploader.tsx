import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { upload } from 'Assets/svgs'

type Props = {
  height?:string
}

const FileUploader = ({height}: Props) => {
  const onDrop = useCallback((acceptedFiles) => {}, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <div {...getRootProps()} className={`border rounded-md max-w-[599px] h-[${height ? height:"312px"}] cursor-pointer`}>
      <input type={`file`} hidden {...getInputProps()} />
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
    </div>
  )
}

export default FileUploader
