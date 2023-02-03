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
    <>
      <nav>
        <GoBack headerText={name} breadCrumbsList={linkData} />
      </nav>

      {/* bg-[#E5E5E5] */}
      <main className='bg-[#EFEFEF] relative flex flex-col h-full mx-auto p-[.9375rem] min-h-50 pl-[1.5rem] pr-[1.5rem]'>
        <div className='mt-[1.5rem] bg-[#fff] pt-4'>
          <Customer360Body />
        </div>
      </main>
    </>
  )
}

export default Customer360
