import { useState, ChangeEvent } from 'react'
import { info } from 'Assets/svgs'
import { CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import DropDown from './DropDown'
import { API } from '../../utilities/api'

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
type FieldStatus = 'default' | 'success' | 'error'

const IdentificationTypeAndNumber = ({ customerType, setIdentificationDetails }: Props) => {
  const [selectedIdentificationType, setSelectedIdentificationType] = useState<IdentificationTypeType>(null)
  const [identificationNumber, setIdentificationNumber] = useState<IdentificationNumberType>('')
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [status, setStatus] = useState<FieldStatus>('default')
  const [isAlreadyACustomer, setIsAlreadyACustomer] = useState(false)

  const MAX_FIELD_LENGTH = 10

  const handleVerification = async (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    setIdentificationNumber(value)
    setStatus('default')
    if (value.length === MAX_FIELD_LENGTH) {
      try {
        const response = await API.get(`/verification/${selectedIdentificationType}/${value.trim()}`)
        if (response.data && response.status == 200) {
          setIsVerified(true)
          setStatus('success')
          setIdentificationDetails({
            identificationType: selectedIdentificationType,
            identificationNumber: value.trim(),
          })
          try {
            const existingCustomer = await API.get(`/customer/id?field=${selectedIdentificationType}&id=${value.trim()}`)
            // console.log('existingCustomer', existingCustomer)
            if (existingCustomer.data && existingCustomer.status == 200) {
              setIsAlreadyACustomer(true)
            }
          } catch (err) {
            // console.log(err.response)
            if (err.response && err.response.status === 404) {
              setIsAlreadyACustomer(false)
            }
          }
        }
        // console.log('response', response)
      } catch (err) {
        console.error(err.message)
        setStatus('error')
      }
      console.log('completed - verify')
    }
  }

  return (
    <div className='flex flex-col w-full gap-8 px-8 whitespace-nowrap xl:ml-5'>
      <div className='flex gap-10 '>
        <div className='flex justify-end gap-3 min-w-[200px] items-center '>
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
      <div className='flex gap-10 '>
        <div className='flex  gap-3 justify-end min-w-[200px] items-center '>
          <span>Identification Number</span>
          {customerType === 'sme' ? (
            <div>
              <img src={info} />
            </div>
          ) : null}
        </div>
        <div
          className={`w-full flex justify-between py-2 leading-6 border-b border-[${
            status === 'success' ? 'green' : status === 'error' ? 'text-primay-main' : '#8F8F8F'
          }] text-text-disabled max-w-[318px]`}
        >
          <input
            type='text'
            placeholder='Enter text'
            onChange={handleVerification}
            maxLength={MAX_FIELD_LENGTH}
            readOnly={!selectedIdentificationType}
            value={identificationNumber}
          />
        </div>
        {/* 9856409479 */}
      </div>
      {isAlreadyACustomer && (
        <div className='ml-auto'>
          Customer profile already exists, <br /> <span className='underline cursor-pointer text-primay-main'>click here</span> to view
        </div>
      )}
    </div>
  )
}

export default IdentificationTypeAndNumber
