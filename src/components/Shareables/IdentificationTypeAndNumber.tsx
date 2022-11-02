import React, { ChangeEvent, useState } from 'react'

type Props = {
  customerType: 'sme' | 'individual'
}

enum VerificationModeEnum {
  BVN = 'bvn',
  NIN = 'nin',
  CAC = 'cac',
  TIN = 'tin',
}

const IdentificationTypeAndNumber = (props: Props) => {
  const [verificationMode, setVerificationMode] = useState('')
  const [singleMode, setSingleMode] = useState<boolean>(true)
  const [bulkMode, setBulkMode] = useState<boolean>(false)
  const [text, setText] = useState('')
  const dataSource = {
    bvn: {
      textLength: 20,
      handler: (val: string) => val,
    },
    nin: {
      textLength: 20,
      handler: (val: string) => val,
    },
    cac: {
      textLength: 20,
      handler: (val: string) => val,
    },
    tin: {
      textLength: 20,
      handler: (val: string) => val,
    },
  }
  const options = {
    sme: [VerificationModeEnum.CAC, VerificationModeEnum.TIN],
    individual: [VerificationModeEnum.BVN, VerificationModeEnum.NIN],
  }
  const handleVerification = (ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value)
    if (ev.target.value.length === dataSource[verificationMode].textLength) {
      console.log('completed - verify ' + verificationMode)
      dataSource[verificationMode].handler(ev.target.value)
    }
  }

  return (
    <>
      <div className='flex items-center mb-10 self-end'>
        Identification Type{' '}
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
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
          <option value=''>select one</option>
          {options[props.customerType].map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center'>
        Identification Number{' '}
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <div className='flex  border-b border-y-[#8F8F8F] ml-10 w-[250px]'>
          <input
            type='text'
            value={text}
            placeholder={`Enter your ${verificationMode}`}
            onChange={handleVerification}
            maxLength={dataSource[verificationMode]?.textLength || 0}
            className='w-full'
            disabled={!verificationMode}
          />
        </div>
      </div>
    </>
  )
}

export default IdentificationTypeAndNumber
