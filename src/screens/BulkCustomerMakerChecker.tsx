import { useState, useCallback, useEffect, memo } from 'react'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'
import SwitchToFormType from 'Components/Shareables/SwitchToFormType'
import WizardChanger from 'Components/Shareables/WizardChanger'
import CreationMode from 'Components/Shareables/CreationMode'
import CustomerCreationBox from 'Components/Shareables/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import { IdentificationNumberType, IdentificationTypeType } from 'Components/Shareables/IdentificationTypeAndNumber'
import Button from 'Components/Shareables/Button'
import SkipToForm from 'Components/Shareables/SkipToForm'
import Form from 'Components/Form'

type Props = {
  customerType: 'sme' | 'individual'
}


export const BulkCustomerMakerChecker = memo(({ customerType }: Props) => {
  const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'
  // const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  // const [creationMode, setCreationMode] = useState<CreationModeType>(CreationModeEnum.Bulk)
  // const [identificationDetails, setIdentificationDetails] = useState<IdentificationDetailsType>({
  //   identificationType: null,
  //   identificationNumber: null,
  // })
  // const [localUpload, setLocalUpload] = useState<Array<File>>([])
  // const [formCreationStarted, setFormCreationStarted] = useState<boolean>(false)

  // const onSetFormMode = useCallback(
  //   (value) => {
  //     setFormMode(value)
  //     setCreationMode(CreationModeEnum.Single)
  //   },
  //   [formMode, creationMode]
  // )

  // const handleProceed = () => { }

  // useEffect(() => {
  //   // console.log(identificationDetails)
  // }, [identificationDetails])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className='bg-background-dash relative flex flex-col h-full mx-auto p-[15px]  max-h-1117 min-h-50'>

      </main>
    </>
  )
})
