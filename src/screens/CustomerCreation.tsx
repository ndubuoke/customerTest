import React, { useState } from 'react'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'
import SwitchToFormType from 'Components/Shareables/SwitchToFormType'
import WizardChanger from 'Components/Shareables/WizardChanger'
import CreationMode from 'Components/Shareables/CreationMode'
import CustomerCreationBox from 'Components/Shareables/CustomerCreation'

type Props = {
  customerType: 'sme' | 'individual'
}

export type FormModeType = 'accelerated' | 'legacy'
export type CreationModeType = 'single' | 'bulk'

const CustomerCreation = ({ customerType }: Props) => {
  const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'
  const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  const [creationMode, setCreationMode] = useState<CreationModeType>('single')

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className='bg-background-dash relative flex flex-col h-full mx-auto p-[15px]  max-h-1117 min-h-50 '>
        <div className='h-[845px] min-h-[845px] bg-white rounded-lg border border-[#E5E9EB] relative'>
          <SwitchToFormType mode={formMode} setFormMode={setFormMode} />
          <WizardChanger formMode={formMode} creationMode={creationMode} />
          {formMode === 'accelerated' ? <CreationMode mode={creationMode} setCreationMode={setCreationMode} /> : null}
          <section>
            <CustomerCreationBox />
          </section>
        </div>
      </main>
    </>
  )
}

export default CustomerCreation
