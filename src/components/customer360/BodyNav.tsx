import React, { useEffect, useState } from 'react'

type Props = {
  activeTab: any
  setActiveTab: any
}

const BodyNav = ({ activeTab, setActiveTab }: Props) => {
  // const [borderColor, setBorderColor] = useState<string>('')

  return (
    <div className='w-[88.375rem] flex text-[#636363] gap-[1rem] py-4 capitalize text-[.75rem] tracking-[]-0.006em'>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${activeTab === 'overview' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'}`}
        onClick={() => setActiveTab('overview')}
      >
        overview
      </h5>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${activeTab === 'relationships' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'} `}
        onClick={() => setActiveTab('relationships')}
      >
        relationships
      </h5>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${activeTab === 'offers' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'}`}
        onClick={() => setActiveTab('offers')}
      >
        offers & opportunities
      </h5>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${activeTab === 'complaints' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'}`}
        onClick={() => setActiveTab('complaints')}
      >
        complaints & service request
      </h5>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${
          activeTab === 'transaction history' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'
        }`}
        onClick={() => setActiveTab('transaction history')}
      >
        transaction history
      </h5>
      <h5
        className={`border-b-2  hover:text-[#252C32]  cursor-pointer ${activeTab === 'timeline' ? 'border-[#CF2A2A]' : 'border-[#b9bdbe]'}`}
        onClick={() => setActiveTab('timeline')}
      >
        timeline
      </h5>
    </div>
  )
}

export default BodyNav
