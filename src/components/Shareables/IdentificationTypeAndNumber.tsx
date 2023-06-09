import { useState, ChangeEvent } from 'react'
import { ExclaimateIcon, GreenCheck, closeRed, info } from 'Assets/svgs'
import { CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import DropDown from './DropDown'
import { API } from '../../utilities/api'
import ViewCustomerModal from 'Components/CustomerManagement/ViewCustomerModal'
import Spinner from './Spinner'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'

type Props = {
  customerType: CustomerType
  setIdentificationDetails: (value: IdentificationDetailsType) => void
  setFileUploaded: any
}

enum VerificationModeEnum {
  BVN = 'bvn',
  NIN = 'nin',
  CAC = 'cac',
  TIN = 'tin',
}

const MaxLengthForType = {
  bvn: 11,
  cac: 14,
  nin: 11,
  tin: 14,
}

export type IdentificationTypeType = 'bvn' | 'nin' | 'cac' | 'tin' | null
export type IdentificationNumberType = string | null
type FieldStatus = 'loading' | 'success' | 'error'

const IdentificationTypeAndNumber = ({ customerType, setIdentificationDetails, setFileUploaded }: Props) => {
  const [selectedIdentificationType, setSelectedIdentificationType] = useState<IdentificationTypeType>(null)
  const [identificationNumber, setIdentificationNumber] = useState<IdentificationNumberType>('')
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [status, setStatus] = useState<FieldStatus>(null)
  const [customer, setCustomer] = useState(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  // const MAX_FIELD_LENGTH = 12

  const handleVerification = async (ev: ChangeEvent<HTMLInputElement>) => {
    setFileUploaded(true)
    const { value, validity } = ev.target
    // console.log('ev.target', ev)
    setIdentificationNumber((prev) => {
      if (validity.patternMismatch) {
        return prev
      } else {
        return value
      }
    })
    setStatus(null)
    if (value.length === MaxLengthForType[selectedIdentificationType]) {
      try {
        setStatus('loading')
        const response = await API.get(`/verification/${selectedIdentificationType}/${value.trim()}`)
        // console.log('response.data', response.data)
        if (response.data && response.status == 200) {
          setIsVerified(true)
          setFileUploaded(false)
          setStatus('success')
          if (selectedIdentificationType === 'bvn') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data,
            })
          } else if (selectedIdentificationType === 'nin') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data,
            })
          } else if (selectedIdentificationType === 'cac') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data,
            })
          } else if (selectedIdentificationType === 'tin') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data.response,
            })
          }

          try {
            const existingCustomer = await API.get(`/customer/id?field=${selectedIdentificationType}&id=${value.trim()}`)
            // console.log('existingCustomer', existingCustomer)
            if (existingCustomer.data && existingCustomer.status == 200) {
              console.log('existingCustomer', existingCustomer.data)
              setCustomer(existingCustomer.data.data)
              setIdentificationDetails({
                identificationType: null,
                identificationNumber: null,
                identityData: null,
              })
            }
          } catch (err) {
            // console.log(err.response)
            if (err.response && err.response.status === 404) {
              setCustomer(null)
            }
          }
        }
        // console.log('response', response)
      } catch (err) {
        console.error(err.message)
        setStatus('error')
      }
      console.log('completed - verify')
    } else {
      setIdentificationDetails({
        identificationType: null,
        identificationNumber: null,
        identityData: null,
      })
    }
  }

  return (
    <div className='flex flex-col w-full gap-8 px-8 whitespace-nowrap xl:ml-5 ' style={{ maxWidth: '38.875rem' }}>
      <div className='flex gap-10 '>
        <div className='flex justify-end gap-3 min-w-[12.5rem] items-center '>
          {customerType === 'sme' ? <span>Identification Type</span> : null}
          {customerType === 'individual' ? <span>Customer's Identification Type</span> : null}
          {customerType === 'sme' ? (
            <div>
              <img src={info} />
            </div>
          ) : null}
        </div>
        <div className='max-w-[19.875rem] w-full '>
          {customerType === 'individual' ? <DropDown options={['bvn', 'nin']} getValue={setSelectedIdentificationType} /> : null}
          {customerType === 'sme' ? <DropDown options={['cac', 'tin']} getValue={setSelectedIdentificationType} /> : null}
        </div>
      </div>
      <div className='flex gap-10 '>
        <div className='flex  gap-3 justify-end min-w-[12.5rem] items-center '>
          <span
            style={{
              visibility: 'hidden',
              display: customerType === 'sme' ? 'none' : 'flex',
            }}
          >
            Custo{' '}
          </span>{' '}
          <span>Identification Number</span>
          {customerType === 'sme' ? (
            <div>
              <img src={info} />
            </div>
          ) : null}
        </div>
        {/* {console.log('status', status)} */}
        <div
          className={`w-full flex justify-between py-2 leading-6 border-b  text-text-disabled  max-w-[19.875rem]`}
          style={{
            borderColor: `${status === 'error' ? '#FF0000' : status === 'success' ? '#00FF00' : '#8f8f8f'}
                `,
          }}
        >
          <input
            type='text'
            placeholder='Enter Number'
            onChange={handleVerification}
            maxLength={MaxLengthForType[selectedIdentificationType]}
            readOnly={!selectedIdentificationType}
            value={identificationNumber}
            pattern='[0-9]+'
          />

          {status === 'loading' && <Spinner size='small' />}
          {status === 'success' && <GreenCheck />}
          {status === 'error' && <img src={closeRed} alt='error' width={17} height={17} className='w-[1.0625rem] h-[1.0625rem]' />}
        </div>
      </div>
      {customer && (
        <div className='flex ml-auto'>
          {showCustomerModal && <ViewCustomerModal customer={customer} setShowCustomerModal={setShowCustomerModal} />}
          <div className='self-center mr-3'>
            {' '}
            <ExclaimateIcon />
          </div>
          <div className='text-sm'>
            Customer profile already exists, <br />
            <span className='underline cursor-pointer text-primay-main' onClick={() => setShowCustomerModal(true)}>
              click here
            </span>{' '}
            to view
          </div>
        </div>
      )}
    </div>
  )
}

export default IdentificationTypeAndNumber
