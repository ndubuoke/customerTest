import { Close, info } from 'Assets/svgs'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'
import DropDown from 'Components/Shareables/DropDown'
import React, { memo, useEffect, useState } from 'react'
import { SignatoryDetailType, SignatoryDetailsType } from '../Types/SignatoryTypes'
import { SignatoryDetailsInitial } from './InitialData'
import SignatoryDropDown from './Signatory-UIs/DropDown'
import FileUploadSignatory from './Signatory-UIs/FileUploadSignatory'
import PhoneInputSignatory from './Signatory-UIs/PhoneInputSIgnatory'
import SearchAndSelectSignatory from './Signatory-UIs/SearchAndSelectSignatory'
import TextArea from './Signatory-UIs/TextArea'
import TextInput from './Signatory-UIs/TextInput'

type Props = {
  closeModalFunction: () => void
}

const SignatoryModal = memo(({ closeModalFunction }: Props) => {
  const [signatoryPrefillInput, setSignatoryPrefillInput] = useState<{ 'Identification Method': string; 'ID Number': string }>({
    'Identification Method': '',
    'ID Number': '',
  })
  const [signatoryDetails, setSignatoryDetails] = useState<SignatoryDetailsType>(SignatoryDetailsInitial)

  const [localUploadPassport, setLocalUploadPassport] = useState<any>([])
  const [localUploadIdentity, setLocalUploadIdentity] = useState<any>([])
  const [localUploadAddress, setLocalUploadAddress] = useState<any>([])

  useEffect(() => {
    console.log(signatoryDetails)
  }, [signatoryDetails])

  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center  py-16'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[600px]   w-full max-w-[1060px] min-h-[400px] h-full  max-h-[780px] overflow-y-auto rounded-[11px] py-6 px-[40px] flex flex-col '>
        <div>
          <div className='flex justify-between relative border-b py-3'>
            <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Signatory Details</div>
            <button onClick={closeModalFunction} type='button' className=''>
              <img src={Close} width={20} height={20} alt='close' />
            </button>
          </div>
          <div className='flex gap-2 mt-3 text-[#8F8F8F]'>
            <img src={info} /> Provide signatory&apos;s identification to prefill form or proceed to fill form manually.
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '20px',
            padding: '10px',
            paddingBottom: '3rem',
            paddingTop: '1rem',
          }}
        >
          <SignatoryDropDown
            id='Identification Method'
            required='off'
            text='Identification Method'
            optionsField={['BVN', 'NIN', 'Customer ID', 'Customer account number']}
            selectedDropdownItem={signatoryPrefillInput['Identification Method']}
            setSelectedDropdownItem={setSignatoryPrefillInput}
          />
          <TextInput
            id='ID Number'
            placeholder='Enter Number'
            required='off'
            maximumNumbersOfCharacters={30}
            setValue={setSignatoryPrefillInput}
            value={signatoryPrefillInput['ID Number']}
            text='ID Number'
            colspan={2}
            type='text'
          />
        </div>
        <form>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <SignatoryDropDown
              id='Title'
              required='on'
              text='Title'
              optionsField={['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Engr']}
              selectedDropdownItem={signatoryDetails['Title']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <TextInput
              id='Surname'
              placeholder='Enter Surname'
              required='on'
              maximumNumbersOfCharacters={30}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Surname']}
              text='Surname'
              colspan={2}
              type='text'
            />
            <TextInput
              id='First Name'
              placeholder='Enter First Name'
              required='on'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['First Name']}
              text='First Name'
              colspan={2}
              type='text'
            />
            <TextInput
              id='Other Names'
              placeholder='Enter Other Names'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Other Names']}
              text='Other Names'
              colspan={2}
              type='text'
            />
            <TextInput
              id="Mother's Maiden Name"
              placeholder="Enter Mother's Maiden Name"
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails["Mother's Maiden Name"]}
              text="Mother's Maiden Name"
              colspan={2}
              type='text'
            />
            <SignatoryDropDown
              id='Gender'
              required='on'
              text='Gender'
              optionsField={['Male', 'Female']}
              selectedDropdownItem={signatoryDetails['Gender']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <TextInput
              id='Date of Birth'
              placeholder='Enter Date of Birth'
              required='on'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Date of Birth']}
              text='Date of Birth'
              colspan={1}
              type='date'
            />
            <SignatoryDropDown
              id='Marital Status'
              required='on'
              text='Marital Status'
              optionsField={['Single', 'Married', 'Widowed', 'Divorced', 'Seperated']}
              selectedDropdownItem={signatoryDetails['Marital Status']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <SignatoryDropDown
              id='Nationality'
              required='on'
              text='Nationality'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['Nationality']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='State of Origin'
              required='on'
              text='State of Origin'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['State of Origin']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='LGA'
              required='on'
              text='LGA'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['LGA']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='Dual Citizenship'
              required='on'
              text='Dual Citizenship'
              optionsField={['Yes', 'No']}
              selectedDropdownItem={signatoryDetails['Dual Citizenship']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='If yes, specify'
              required='on'
              text='If yes, specify'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['If yes, specify']}
              setSelectedDropdownItem={setSignatoryDetails}
            />

            <TextInput
              id='Residential Address'
              placeholder='Enter Residential Address'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Residential Address']}
              text='Residential Address'
              colspan={1}
              type='text'
            />
            <TextArea
              id='Detailed Description of Address'
              placeholder='Enter Detailed Description of Address'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Detailed Description of Address']}
              text='Detailed Description of Address'
              colspan={3}
              type='text'
            />
            <SignatoryDropDown
              id='Country'
              required='on'
              text='Country'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['Country']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='State'
              required='on'
              text='State'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['State']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='City/Town'
              required='on'
              text='City/Town'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['City/Town']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SignatoryDropDown
              id='LGA-RA'
              required='on'
              text='LGA-RA'
              optionsField={['Nigerian', 'Ghanaian']}
              selectedDropdownItem={signatoryDetails['LGA-RA']}
              setSelectedDropdownItem={setSignatoryDetails}
            />

            <TextInput
              id='P.O. Box'
              placeholder='Enter P.O. Box'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['P.O. Box']}
              text='P.O. Box'
              colspan={2}
              type='text'
            />
            <PhoneInputSignatory
              id='Mobile Number'
              placeholder='Enter Mobile Number'
              required='on'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Mobile Number']}
              text='Mobile Number'
              colspan={1}
              type='tel'
            />
            <PhoneInputSignatory
              id='Alternate Phone Number'
              placeholder='Enter Alternate Phone Number'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Alternate Phone Number']}
              text='Alternate Phone Number'
              colspan={1}
              type='tel'
            />

            <TextInput
              id='Email address'
              placeholder='Enter Email address'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Email address']}
              text='Email address'
              colspan={2}
              type='email'
            />
            <SignatoryDropDown
              id='Means of Identification'
              required='on'
              text='Means of Identification'
              optionsField={['BVN', 'NIN', "Permanent Voter's Card", 'Driver;s License']}
              selectedDropdownItem={signatoryDetails['Means of Identification']}
              setSelectedDropdownItem={setSignatoryDetails}
            />

            <TextInput
              id='ID Number'
              placeholder='Enter ID Number'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['ID Number']}
              text='ID Number'
              colspan={1}
              type='text'
            />
            <TextInput
              id='ID Issue Date'
              placeholder='Enter ID Issue Date'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['ID Issue Date']}
              text='ID Issue Date'
              colspan={1}
              type='date'
            />
            <TextInput
              id='ID Expiry Date'
              placeholder='Enter ID Expiry Date'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['ID Expiry Date']}
              text='ID Expiry Date'
              colspan={1}
              type='date'
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <SignatoryDropDown
              id='Employment Status'
              required='on'
              text='Employment Status'
              optionsField={['Employed', 'Self Employed', 'Unemployed', 'Retired', 'Student', 'Others']}
              selectedDropdownItem={signatoryDetails['Employment Status']}
              setSelectedDropdownItem={setSignatoryDetails}
            />
            <SearchAndSelectSignatory
              id='Nature of Business/Occupation'
              required='on'
              text='Nature of Business/Occupation'
              optionsField={[
                { label: 'Accounting/auditing', key: 'Accounting/auditing' },
                { label: 'Aviation', key: 'Aviation' },
                { label: 'Military', key: 'Military' },
              ]}
              selectedDropdownItem={signatoryDetails['Nature of Business/Occupation']}
              setSelectedDropdownItem={setSignatoryDetails}
              placeholder='Nature of Business/Occupation'
            />
            <TextInput
              id='Position/Rank'
              placeholder='Enter Position/Rank'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Position/Rank']}
              text='Position/Rank'
              colspan={1}
              type='text'
            />
          </div>
          <div className='flex flex-col gap-8'>
            <FileUploadSignatory
              id='Upload Passport Photograph'
              placeholder='Enter Upload Passport Photograph'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Upload Passport Photograph']}
              text='Upload Passport Photograph'
              colspan={1}
              type='text'
              setLocalUpload={setLocalUploadPassport}
            />
            <FileUploadSignatory
              id='Upload Proof of Identity'
              placeholder='Enter Upload Proof of Identity'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Upload Proof of Identity']}
              text='Upload Proof of Identity'
              colspan={1}
              type='text'
              setLocalUpload={setLocalUploadIdentity}
            />
            <FileUploadSignatory
              id='Upload Proof of Address'
              placeholder='Enter Upload Proof of Address'
              required='off'
              maximumNumbersOfCharacters={20}
              setValue={setSignatoryDetails}
              value={signatoryDetails['Upload Proof of Address']}
              text='Upload Proof of Address'
              colspan={1}
              type='text'
              setLocalUpload={setLocalUploadAddress}
            />
          </div>
        </form>
      </section>
    </aside>
  )
})

export default SignatoryModal
