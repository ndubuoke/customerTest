import React, { useState, ChangeEvent } from 'react'

type Props = {}

const CustomerCreationBox = (props: Props) => {
  const [verificationMode, setVerificationMode] = useState('bvn')
  const [text, setText] = useState('')
  const handleVerification = (ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value)
    if (ev.target.value.length === 20) {
      console.log('completed - verify ' + verificationMode)
    }
  }
  return (
    <div className='flex justify-center gap-5 text-[#636363] mt-20 '>
      <div className='flex flex-col justify-center '>
        <div className='flex items-center mb-10 self-end'>
          Identification Type{' '}
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <select
            name='ll'
            id='select'
            onChange={(ev) => {
              setVerificationMode(ev.target.value)
              setText('')
            }}
            className=' w-[250px] ml-10 '
          >
            <option>Select</option>
            <option value='bvn'>BVN</option>
            <option value='nin'>NIN</option>
          </select>
        </div>
        <div className='flex items-center'>
          Identification Number{' '}
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <div className='flex  border-b border-y-[#8F8F8F] ml-10 w-[250px]'>
            <input
              type='text'
              value={text}
              placeholder={`Enter your ${verificationMode}`}
              onChange={handleVerification}
              maxLength={20}
              className='w-full'
            />
          </div>
        </div>
      </div>
      <div className='border-r border-[#8F8F8F]'></div>
      <div>
        <div className='flex flex-col items-center justify-center py-20 px-28  border'>
          <svg
            aria-hidden='true'
            className='w-10 h-10 mb-3 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 border-b-purple-900'>
            <span className='font-semibold text-[red]'>Click to upload</span> or drag and drop
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomerCreationBox
