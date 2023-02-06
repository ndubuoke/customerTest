import Customer360Final from 'Components/Customer360Search/Customer360Final'
import GoBack, { BreadCrumbsListItemType } from 'Components/MainScreenLayout/GoBack'
import React, { useEffect, useState } from 'react'
import { customer360Data } from '../data/customerCreationBreadcrumbs'

type Props = {}

const Customer360Search = (props: Props) => {
  const [linkData, setLinkData] = useState([])

  useEffect(() => {
    setLinkData([...customer360Data])
  }, [])

  return (
    <>
      <GoBack headerText='' breadCrumbsList={linkData} />
      <section className='bg-[#E5E5E5] p-[1.875rem]'>
        <Customer360Final />
      </section>
    </>
  )
}

export default Customer360Search
