import React, { useEffect, useState } from 'react'
import GoBack, { BreadCrumbsListItemType } from 'Components/MainScreenLayout/GoBack'
import { customer360Data } from '../data/customerCreationBreadcrumbs'
import TopNavMenu from 'Components/customer360/TopNavMenu'

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

      <main className='bg-background-dash relative flex flex-col h-full mx-auto p-[15px] min-h-50 '>
        <TopNavMenu />
      </main>
    </>
  )
}

export default Customer360
