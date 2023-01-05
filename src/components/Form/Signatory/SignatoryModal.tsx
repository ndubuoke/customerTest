import { Close, info } from 'Assets/svgs'
import FileUploadComponent from 'Components/CustomerManagement/FileUploadComponent'
import Button from 'Components/Shareables/Button'
import DropDown from 'Components/Shareables/DropDown'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { generateID } from 'Utilities/generateId'
import { SignatoryDetailType, SignatoryDetailsType } from '../Types/SignatoryTypes'
import { SignatoryDetailsInitial, SignatoryDetailsRequiredDataStatus } from './InitialData'
import { unfilledRequiredSignatoryListAction, unfilledRequiredSignatoryListButtonAction } from 'Redux/actions/FormManagement.actions'
import SignatoryDropDown from './Signatory-UIs/DropDown'
import FileUploadSignatory from './Signatory-UIs/FileUploadSignatory'
import PhoneInputSignatory from './Signatory-UIs/PhoneInputSIgnatory'
import SearchAndSelectSignatory from './Signatory-UIs/SearchAndSelectSignatory'
import TextArea from './Signatory-UIs/TextArea'
import TextInput from './Signatory-UIs/TextInput'
import { ReducersType } from 'Redux/store'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import IdPrefiller from './Signatory-UIs/IdPrefiller'
import { PrefillerIDTypeLengths, useIdFormPrefiller } from '../../../hooks/useIdFormPrefiller'

type Props = {
  signatories?: Array<any>
  setSignatories?: (value: any) => void
  closeModalFunction: () => void
  modification: boolean
  setModification: (prev: boolean) => void
  signatoryDetails: SignatoryDetailsType
  setSignatoryDetails: (prev: SignatoryDetailsType) => void
}

const SignatoryModal = memo(
  ({ closeModalFunction, setSignatories, signatories, modification = false, setModification, signatoryDetails, setSignatoryDetails }: Props) => {
    const dispatch = useDispatch()

    const { loading, success, error, response, getIdDetails } = useIdFormPrefiller()

    const unfilledRequiredSignatoryList = useSelector<ReducersType>(
      (state) => state.unfilledRequiredSignatoryList
    ) as UnfilledRequiredSignatoryListReducerType
    const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
      (state) => state.unfilledRequiredSignatoryListButton
    ) as UnfilledRequiredSignatoryListReducerType

    const [localUploadPassport, setLocalUploadPassport] = useState<any>([])
    const [localUploadIdentity, setLocalUploadIdentity] = useState<any>([])
    const [localUploadAddress, setLocalUploadAddress] = useState<any>([])

    const [hideButton, setHideButton] = useState<boolean>(true)

    // Add a check
    const handleAddSignatory = (id: string | number) => {
      if (checkRequiredFields().success) {
        setSignatories((prev: Array<any>) => [...prev, { ...signatoryDetails, id }])
        setSignatoryDetails({ ...SignatoryDetailsInitial })
        closeModalFunction()
      }
    }

    const handleModifySignatory = (id: string | number) => {
      const signatoryIndex = signatories.findIndex((x) => x?.id === id)
      setSignatories((prev) => {
        const copied = [...prev]

        copied.splice(signatoryIndex, 1, signatoryDetails)
        return copied
      })
      setSignatoryDetails({ ...SignatoryDetailsInitial })
      closeModalFunction()
    }

    const _checkRequiredFields = () => {
      const allItems = Object.entries(SignatoryDetailsRequiredDataStatus)

      // [[key, value], [key, value]]

      const requiredItems = allItems?.filter((x) => {
        return x[1] === 'required'
      })

      const copiedAllSignatoryDetails = { ...signatoryDetails }

      const copiedAllSignatoryDetailsArray = Object.entries(copiedAllSignatoryDetails)

      const unfilledRequiredFields = []

      copiedAllSignatoryDetailsArray.forEach((x) => {
        const itemKey = x[0]
        const checkItemIsRequired = requiredItems.find((y) => y[0] === itemKey)
        if (checkItemIsRequired && !x[1]) {
          unfilledRequiredFields.push(checkItemIsRequired)
        }
      })

      return unfilledRequiredFields
    }

    const checkRequiredFields = () => {
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(_checkRequiredFields()) as any)

      return { success: _checkRequiredFields().length === 0 }
    }

    const checkRequiredFieldsButton = () => {
      dispatch(unfilledRequiredSignatoryListButtonAction(_checkRequiredFields()) as any)
      return { success: _checkRequiredFields().length === 0 }
    }

    useEffect(() => {
      checkRequiredFieldsButton()
      // checkRequiredFields()
    }, [signatoryDetails])

    useEffect(() => {
      console.log(signatoryDetails)
    }, [signatoryDetails])

    useEffect(() => {
      if (
        signatoryDetails['Means of Identification'] &&
        signatoryDetails['ID Number'].length === PrefillerIDTypeLengths[signatoryDetails['Means of Identification']]
      ) {
        if (signatoryDetails['Means of Identification'] === 'BVN') {
          getIdDetails({ idNumber: signatoryDetails['ID Number'], idType: 'bvn' })
        }
        if (signatoryDetails['Means of Identification'] === "Driver's License") {
          getIdDetails({ idNumber: signatoryDetails['ID Number'], idType: 'dl' })
        }
        if (signatoryDetails['Means of Identification'] === 'NIN') {
          getIdDetails({ idNumber: signatoryDetails['ID Number'], idType: 'nin' })
        }
        if (signatoryDetails['Means of Identification'] === "Permanent Voter's Card") {
          getIdDetails({ idNumber: signatoryDetails['ID Number'], idType: 'pvc' })
        }
      }
    }, [signatoryDetails['ID Number'], signatoryDetails['Means of Identification']])

    useEffect(() => {
      console.log({
        [signatoryDetails['Means of Identification']]: PrefillerIDTypeLengths[signatoryDetails['Means of Identification']],
      })
    }, [signatoryDetails['Means of Identification']])

    return (
      <aside
        className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center py-16'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '1000',
        }}
      >
        <section className='bg-white min-w-[600px]   w-full max-w-[1060px] min-h-[400px] h-full  max-h-[880px]  rounded-[11px] py-6 px-[40px] flex flex-col '>
          <div>
            <div className='relative flex justify-between py-3 border-b'>
              <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Signatory Details</div>
              <button onClick={closeModalFunction} type='button' className=''>
                <img src={Close} width={20} height={20} alt='close' />
              </button>
            </div>
          </div>
          <div className='h-full overflow-y-auto  max-h-[780px] p-2'>
            <div className='flex gap-2 mt-3 text-[#8F8F8F]'>
              <img src={info} /> Provide signatory&apos;s identification to prefill form or proceed to fill form manually.
            </div>
            <IdPrefiller setSignatoryDetails={setSignatoryDetails} />
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
                  required='off'
                  text='If yes, specify'
                  optionsField={['Nigerian', 'Ghanaian']}
                  selectedDropdownItem={signatoryDetails['If yes, specify']}
                  setSelectedDropdownItem={setSignatoryDetails}
                />

                <TextInput
                  id='Residential Address'
                  placeholder='Enter Residential Address'
                  required='on'
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
                  required='on'
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
                  optionsField={['BVN', 'NIN', "Permanent Voter's Card", "Driver's License"]}
                  selectedDropdownItem={signatoryDetails['Means of Identification']}
                  setSelectedDropdownItem={setSignatoryDetails}
                />

                <TextInput
                  id='ID Number'
                  placeholder='Enter ID Number'
                  required='on'
                  maximumNumbersOfCharacters={PrefillerIDTypeLengths[signatoryDetails['Means of Identification']] || 10}
                  setValue={setSignatoryDetails}
                  value={signatoryDetails['ID Number']}
                  text='ID Number'
                  colspan={1}
                  type='text'
                  loading={loading}
                  success={success}
                  idPrefiller
                  error={error?.status}
                />
                <TextInput
                  id='ID Issue Date'
                  placeholder='Enter ID Issue Date'
                  required='on'
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
                  required='on'
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
                  required='on'
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
                  required='on'
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
            <div className='flex justify-center my-6'>
              <Button
                // disabled={false}
                disabled={unfilledRequiredSignatoryListButton.list.length !== 0}
                onClick={() => {
                  if (modification) {
                    handleModifySignatory(signatoryDetails['id'])
                  } else {
                    handleAddSignatory(generateID())
                  }
                }}
                text='Done'
              />
            </div>
          </div>
        </section>
      </aside>
    )
  }
)

export default SignatoryModal
