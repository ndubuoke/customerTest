import { useState, ChangeEvent } from 'react'
import { ExclaimateIcon, GreenCheck, info } from 'Assets/svgs'
import { CustomerType, IdentificationDetailsType } from 'Screens/CustomerCreation'
import DropDown from './DropDown'
import { API } from '../../utilities/api'
import ViewCustomerModal from 'Components/CustomerManagement/ViewCustomerModal'
import Spinner from './Spinner'

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
type FieldStatus = 'loading' | 'success' | 'error'

const IdentificationTypeAndNumber = ({ customerType, setIdentificationDetails }: Props) => {
  const [selectedIdentificationType, setSelectedIdentificationType] = useState<IdentificationTypeType>(null)
  const [identificationNumber, setIdentificationNumber] = useState<IdentificationNumberType>('')
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [status, setStatus] = useState<FieldStatus>(null)
  const [customer, setCustomer] = useState(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  const MAX_FIELD_LENGTH = 11

  const handleVerification = async (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    setIdentificationNumber(value)
    setStatus(null)
    if (value.length === MAX_FIELD_LENGTH) {
      try {
        setStatus('loading')
        const response = await API.get(`/verification/${selectedIdentificationType}/${value.trim()}`)
        if (response.data && response.status == 200) {
          setIsVerified(true)
          setStatus('success')
          if (selectedIdentificationType === 'bvn') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data.response,
            })
          } else if (selectedIdentificationType === 'nin') {
            setIdentificationDetails({
              identificationType: selectedIdentificationType,
              identificationNumber: value.trim(),
              identityData: response.data.data.response[0],
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
    <div className='flex flex-col w-full gap-8 px-8 whitespace-nowrap xl:ml-5'>
      <div className='flex justify-end text-sm gap-3'>
        <img src={info} />
        Provide some customer’s basic information and upload relevant <br /> documents to help you fast-track the customer creation process.
      </div>
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
        <div
          className={`w-full flex justify-between py-2 leading-6 border-b border-b-[${
            status === 'success' ? '#00FF00' : status === 'error' ? '#FF0000' : '#8F8F8F'
          }] text-text-disabled  max-w-[318px]`}
        >
          <input
            type='text'
            placeholder='Enter text'
            onChange={handleVerification}
            maxLength={MAX_FIELD_LENGTH}
            readOnly={!selectedIdentificationType}
            value={identificationNumber}
          />
          {status === 'loading' ? <Spinner size='medium' /> : status === 'success' ? <GreenCheck /> : null}
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
