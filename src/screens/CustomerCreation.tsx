import { useState, useCallback, useEffect } from 'react'
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

type Props = {
  customerType: 'sme' | 'individual'
}

export type CustomerType = 'sme' | 'individual'
export type FormModeType = 'accelerated' | 'legacy'
export type CreationModeType = 'single' | 'bulk'
export type IdentificationDetailsType = {
  identificationType: IdentificationTypeType
  identificationNumber: IdentificationNumberType
}

const CustomerCreation = ({ customerType }: Props) => {
  const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'
  const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  const [creationMode, setCreationMode] = useState<CreationModeType>(CreationModeEnum.Single)

  const [identificationDetails, setIdentificationDetails] = useState<IdentificationDetailsType>({
    identificationType: null,
    identificationNumber: null,
  })

  const onSetFormMode = useCallback(
    (value) => {
      setFormMode(value)
      setCreationMode(CreationModeEnum.Single)
    },
    [formMode, creationMode]
  )

  const handleProceed = () => {}

  useEffect(() => {
    console.log(identificationDetails)
  }, [identificationDetails])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className='bg-background-dash relative flex flex-col h-full mx-auto p-[15px]  max-h-1117 min-h-50'>
        <div className='h-[845px] min-h-[845px] bg-white rounded-lg border border-[#E5E9EB] relative'>
          <SwitchToFormType mode={formMode} onSetFormMode={onSetFormMode} />
          <WizardChanger formMode={formMode} creationMode={creationMode} customerType={customerType} />
          {customerType === 'individual' && formMode === 'accelerated' ? (
            <CreationMode mode={creationMode} setCreationMode={setCreationMode} />
          ) : null}
          <section className=' h-3/4 flex flex-col justify-between pb-20'>
            <CustomerCreationBox creationMode={creationMode} customerType={customerType} setIdentificationDetails={setIdentificationDetails} />

            <div className='flex  justify-center relative  gap-1'>
              <div className=' absolute right-3 -top-16'>
                <SkipToForm />
              </div>
              <Button
                text='Proceed'
                disabled={!identificationDetails.identificationNumber && !identificationDetails.identificationType}
                onClick={() => handleProceed()}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default CustomerCreation
