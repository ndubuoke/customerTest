import SignatoriesTable from 'Components/Form/Signatory/SignatoriesTable'
import { SignatoryDetailsType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect, useState } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import SignatoryModalSummary from './SignatoryModalSummary'

type Props = {}

const SignatorySummary = (props: Props) => {
  const signatoryInStorage = sessionStorage.getItem(STORAGE_NAMES.SIGNATORY_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.SIGNATORY_IN_STORAGE))
    : null

  const [signatories, setSignatories] = useState<Array<SignatoryDetailsType>>([])
  const [openSignatoryModalSummary, setOpenSignatoryModalSummary] = useState<boolean>(false)
  //   const [currentSignatory, setCurrentSignatory] = useState<>()

  const handleSignatoryModal = () => {
    setOpenSignatoryModalSummary((prev) => !prev)
  }

  const handleViewSignatory = (id: number | string) => {
    console.log({ id })
    handleSignatoryModal()
  }

  useEffect(() => {
    if (signatoryInStorage) {
      setSignatories(signatoryInStorage)
    }
  }, [])

  return (
    <div className='mx-6'>
      <h3 className='font-roboto font-bold text-[18px] leading-[16px] pt-6 pb-4  ml-12'>Account Signatory Details</h3>
      <SignatoriesTable signatories={signatories} handleViewSignatory={handleViewSignatory} viewSignatory={true} collapsed={false} />
      {openSignatoryModalSummary ? <SignatoryModalSummary closeModalFunction={handleSignatoryModal} /> : null}
    </div>
  )
}

export default SignatorySummary
