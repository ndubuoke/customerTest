import { useState } from 'react'
import { info } from 'Assets/svgs'
import { CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import DropDown from './DropDown'

type Props = {
  customerType: CustomerType
  setIdentificationDetails: (value: IdentificationDetailsType) => void
}

enum VerificationModeEnum {
  BVN = 'bvn',
  NIN = 'nin',
  CAC = 'cac',
  TIN = 'tin',
}

export type IdentificationTypeType = 'bvn' | 'nin' | 'cac' | 'tin' | null
export type IdentificationNumberType = string | null

const IdentificationTypeAndNumber = ({ customerType, setIdentificationDetails }: Props) => {
  const [selectedIdentificationType, setSelectedIdentificationType] = useState<IdentificationTypeType>(null)
  const [identificationNumber, setIdentificationNumber] = useState<IdentificationNumberType>(null)

  return (
    <div className='flex flex-col gap-8 whitespace-nowrap w-full xl:ml-5 px-8'>
      <div className='flex gap-10  '>
        <div className='flex justify-end gap-3 min-w-[200px] items-center'>
          {customerType === 'sme' ? <span>Identification Type</span> : null}
          {customerType === 'individual' ? <span>Customer's Identification Type</span> : null}
          {customerType === 'sme' ? (
            <div>
              <img src={info} />
            </div>
          ) : null}
        </div>
        <div className='max-w-[318px] w-full '>
          {customerType === 'individual' ? <DropDown options={['bvn', 'nin']} getValue={setSelectedIdentificationType} /> : null}
          {customerType === 'sme' ? <DropDown options={['cac', 'tin']} getValue={setSelectedIdentificationType} /> : null}
        </div>
      </div>
      <div className='flex gap-10'>
        <div className='flex  gap-3 justify-end min-w-[200px] items-center'>
          <span>Identification Number</span>
          {customerType === 'sme' ? (
            <div>
              <img src={info} />
            </div>
          ) : null}
        </div>
        <div className='w-full flex justify-between py-2 leading-6 border-b-2 border-[#8F8F8F] text-text-disabled max-w-[318px]'>
          <input
            type='text'
            placeholder='Enter text'
            onChange={(e) => {
              setIdentificationNumber(e.target.value.trim())
              setIdentificationDetails({
                identificationType: selectedIdentificationType,
                identificationNumber: e.target.value.trim(),
              })
            }}
            readOnly={!selectedIdentificationType}
          />
        </div>
      </div>
    </div>
  )
}

export default IdentificationTypeAndNumber
