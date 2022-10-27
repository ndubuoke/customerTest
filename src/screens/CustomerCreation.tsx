import { GoBack } from 'Components/MainScreenLayout'
import React from 'react'

type Props = {
  customerType: 'sme' | 'individual'
}

const CustomerCreation = (props: Props) => {
  return (
    <>
      <nav>
        <GoBack />
      </nav>

      <main>
        <h1>In customer creation</h1>
      </main>
    </>
  )
}

export default CustomerCreation
