import GoBack from 'Components/MainScreenLayout/GoBack'
import React from 'react'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'

type Props = {
  customerType: 'sme' | 'individual'
}

const CustomerCreation = ({ customerType }: Props) => {
  const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className='bg-background-dash relative flex flex-col h-full pt-2 mx-auto pb-10 lg:min-w-7xl max-h-1117 min-h-50'>
        <h1>In customer creation</h1>
      </main>
    </>
  )
}

export default CustomerCreation
