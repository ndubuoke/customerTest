import { useCallback } from 'react'
import { bulkTemplate, bulkUpload } from 'Assets/svgs'
import { useDropzone } from 'react-dropzone'

export const BulkCreation = () => {
  const fileTypes = ['JPG', 'PNG', 'GIF']

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        console.log(e.target.result)
      }
      reader.readAsDataURL(file)
      return file
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='flex justify-center gap-16 text-[#636363] mt-2'>
      <div className='flex flex-col justify-center w-1/2'>
        <div className='flex items-center mb-10 self-end mr-[48px]'>
          <span className={`text-right w-[200px] leadiing-[0px]`}>Upload Bulk Customer Creation File</span>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
        </div>
      </div>
      {/* <div className='border-r border-[#8F8F8F]'></div> */}
      <div className={`w-1/2`}>
        <div className='flex flex-col py-20 px-0 gap-y-5 w-fit'>
          <div {...getRootProps({ className: `${isDragActive ? 'test-center rounded border-2 border-dashed border-[#CF2A2A]' : ''}` })}>
            <img src={bulkUpload} alt={''} />
            <input type={`file`} hidden {...getInputProps()} />
          </div>
          <button className={`self-end `}>
            <img src={bulkTemplate} alt={''} />
          </button>
        </div>
      </div>
    </div>
  )
}
