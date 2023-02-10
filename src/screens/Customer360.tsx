import React, { useEffect, useState } from 'react'
import GoBack, { BreadCrumbsListItemType } from 'Components/MainScreenLayout/GoBack'
import { customer360Data } from '../data/customerCreationBreadcrumbs'
import TopNavMenu from 'Components/customer360/TopNavMenu'
import Customer360Body from 'Components/customer360/Customer360Body'
import TopMenuUserSummary from 'Components/customer360/TopMenuUserSummary'

type Props = {}

const Customer360 = (props: Props) => {
  const [linkData, setLinkData] = useState<Array<BreadCrumbsListItemType>>()
  const [name, setName] = useState<string>('Temotope Yusuf Chukwuma')

  useEffect(() => {
    if (name) {
      setLinkData([
        ...customer360Data,
        {
          link: '#',
          text: name?.toUpperCase(),
        },
      ])
    }
  }, [name])

  return (
    <section className='h-screen min-h-screen max-h-screen'>
      <nav>
        <GoBack headerText={name} breadCrumbsList={linkData} />
      </nav>
      <main className='bg-[#EFEFEF] w-full p-[.875rem]   pt-6'>
        <div className='bg-white  px-[4.438rem] '>
          <TopNavMenu />

          <Customer360Body />
        </div>
      </main>
    </section>
  )
}

export default Customer360
