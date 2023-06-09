import { upload } from 'Assets/svgs'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {}

const FileUpload = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback(async (acceptedFiles: Array<any>, fileRejections) => {
    console.log(acceptedFiles)
  }, [])

  //   const { getRootProps, getInputProps } = useDropzone({
  //     onDrop,
  //     onDropRejected,
  //     multiple: false,
  //     // accept: ['png', 'jpeg', 'pdf'],
  //   })

  return (
    <div>
      <div className='text-[#333333] text-[1rem] font-normal leading-[1.1875rem] mb-3'>Upload Supporting Documents</div>
      <div className='flex gap-12 w-full max-w-[24.5rem] h-[5.375rem] border border-[#c4c4c4] rounded-[.625rem] items-center px-3'>
        <div>
          <img src={upload} className='w-12' />
        </div>
        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 '>
          <span className='font-semibold text-primay-main'>Click to upload</span>
          <span> or drag and drop</span>
          <span className='block text-center'>.pdf .jpeg .png</span>
        </p>
      </div>
    </div>
  )
}

export default FileUpload
