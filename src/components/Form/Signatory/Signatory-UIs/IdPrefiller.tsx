import React, { useEffect, useState } from 'react'
import SignatoryDropDown from './DropDown'
import TextInput from './TextInput'
import { PrefillerIDTypeLengths, PrefillerIDTypeType, useIdFormPrefiller } from '../../../../hooks/useIdFormPrefiller'
import { SignatoryDetailsType, SignatoryDetailType, SignatoryInitialDetailsType } from 'Components/Form/Types/SignatoryTypes'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import { unfilledRequiredSignatoryListAction, unfilledRequiredSignatoryListButtonAction } from 'Redux/actions/FormManagement.actions'

type Props = {
  signatoryDetails: SignatoryInitialDetailsType
  setSignatoryDetails: (prev: any) => void
}
const IdPrefiller = ({ setSignatoryDetails, signatoryDetails }: Props) => {
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const { loading, success, error, response, getIdDetails } = useIdFormPrefiller()

  const [signatoryPrefillInput, setSignatoryPrefillInput] = useState<{ 'Identification Method': PrefillerIDTypeType; 'ID Number': string }>({
    'Identification Method': null,
    'ID Number': '',
  })

  useEffect(() => {
    setSignatoryPrefillInput(() => ({
      'Identification Method': signatoryDetails['meansOfIdentification'] as PrefillerIDTypeType,
      'ID Number': signatoryDetails['iDNumber'],
    }))
  }, [])

  useEffect(() => {
    setSignatoryDetails((prev) => ({
      ...prev,
      iDNumber: signatoryPrefillInput['ID Number'],
      meansOfIdentification: signatoryPrefillInput['Identification Method'],
    }))
    if (signatoryPrefillInput['Identification Method'] === 'BVN' && signatoryPrefillInput['ID Number'].length === PrefillerIDTypeLengths.BVN) {
      getIdDetails({ idNumber: signatoryPrefillInput['ID Number'], idType: 'bvn' })
      console.log({ ID: signatoryPrefillInput, loading, success, error, response })
    }

    if (
      signatoryPrefillInput['Identification Method'] === 'Customer ID' &&
      signatoryPrefillInput['ID Number'].length === PrefillerIDTypeLengths['Customer ID']
    ) {
      getIdDetails({ idNumber: signatoryPrefillInput['ID Number'], idType: 'Customer ID' })
      console.log({ ID: signatoryPrefillInput, loading, success, error, response })
    }

    if (
      signatoryPrefillInput['Identification Method'] === 'Customer Account Number' &&
      signatoryPrefillInput['ID Number'].length === PrefillerIDTypeLengths['Customer Account Number']
    ) {
      getIdDetails({ idNumber: signatoryPrefillInput['ID Number'], idType: 'Customer Account Number' })
      console.log({ ID: signatoryPrefillInput, loading, success, error, response })
    }

    if (signatoryPrefillInput['Identification Method'] === 'NIN' && signatoryPrefillInput['ID Number'].length === PrefillerIDTypeLengths['NIN']) {
      getIdDetails({ idNumber: signatoryPrefillInput['ID Number'], idType: 'nin' })
      console.log({ ID: signatoryPrefillInput, loading, success, error, response })
    }
  }, [signatoryPrefillInput])

  const details = {
    'First Name': 'Onuorah',
    Surname: 'Bonaventure',
    Status: 'king',
    Title: 'Mr',
  }

  // TODO: Handle the key of the incoming prefiller

  useEffect(() => {
    // const k = { man: 'w' }

    // console.log({ k: !k['man'] })
    setSignatoryDetails((prev: any) => {
      const copied = { ...prev }
      // const detailsList = Object.entries(details).forEach((x: Array<any>) => {
      //   if (copied.hasOwnProperty([x[0]])) {
      //     if (!copied[x[0]]) {
      //       copied[x[0]] = x[1]
      //       console.log(x[0])
      //       handleRedispatchOfRequiredFields(x[0])
      //     }
      //   }
      // })
      if (response?.data) {
        const keys = Object.keys(response.data)
        keys.forEach((key) => {
          if (key === 'mobile') {
            copied['mobileNumber'] = response.data[key]
          } else if (key === 'lastName') {
            copied['surname'] = response.data[key]
          } else if (key === 'lastName') {
            copied['surname'] = response.data[key]
          } else if (copied.hasOwnProperty(key)) {
            copied[key] = response.data[key]
          }
        })
      }
      console.log('copied', copied)
      // console.log('detailsList', detailsList)
      console.log('response', response?.data)

      // console.log({ copied })
      return copied
    })
  }, [response])

  const handleRedispatchOfRequiredFields = (text: SignatoryDetailType) => {
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }

    const isPresentInRequiredListButton = unfilledRequiredSignatoryListButton?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredListButton) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryListButton?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListButtonAction(newUnfilledRequiredFields) as any)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1.25rem',
        padding: '.625rem',
        paddingBottom: '48px',
        paddingTop: '16px',
      }}
    >
      <SignatoryDropDown
        id='Identification Method'
        required='off'
        text='Identification Method'
        _optionsField={['BVN', 'NIN', 'Customer ID', 'Customer account number']}
        selectedDropdownItem={signatoryPrefillInput['Identification Method']}
        setSelectedDropdownItem={setSignatoryPrefillInput}
      />
      <TextInput
        id='ID Number'
        placeholder='Enter Number'
        required='off'
        maximumNumbersOfCharacters={
          PrefillerIDTypeLengths[signatoryPrefillInput['Identification Method']]
            ? PrefillerIDTypeLengths[signatoryPrefillInput['Identification Method']]
            : 10
        }
        setValue={setSignatoryPrefillInput}
        value={signatoryDetails['iDNumber'] || signatoryPrefillInput['ID Number']}
        text='ID Number'
        colspan={2}
        type='text'
        loading={loading}
        success={success}
        idPrefiller
        error={error?.status}
      />
    </div>
  )
}

export default IdPrefiller
