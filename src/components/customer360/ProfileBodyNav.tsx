import React, { useEffect, useState } from 'react'

type Props = {
  activeTab: any
  setActiveTab: any
}

const BodyNav = ({ activeTab, setActiveTab }: Props) => {
  // const [borderColor, setBorderColor] = useState<string>('')

  return (
    <div className=' flex text-[#636363] gap-[2rem] pt-3 capitalize text-[2rem] tracking-[]-0.006em'>
      <h5
        className={`border-b-2 text-[1rem] font-normal leading-loose hover:text-[#252C32] cursor-pointer ${
          activeTab === 'profile' ? 'border-[#CF2A2A] font-semibold text-[#252C32]' : 'border-[#DDE2E4]'
        }`}
        onClick={() => setActiveTab('profile')}
      >
        profile
      </h5>
      <h5
        className={`border-b-2 text-[1rem] font-normal leading-loose hover:text-[#252C32] cursor-pointer ${
          activeTab === 'active products' ? 'border-[#CF2A2A] font-semibold text-[#252C32]' : 'border-[#DDE2E4]'
        } `}
        onClick={() => setActiveTab('active products')}
      >
        active products
      </h5>
      <h5
        className={`border-b-2 text-[1rem] font-normal leading-loose hover:text-[#252C32] cursor-pointer ${
          activeTab === 'risk-profile' ? 'border-[#CF2A2A] font-semibold text-[#252C32]' : 'border-[#DDE2E4]'
        }`}
        onClick={() => setActiveTab('risk-profile')}
      >
        risk profile
      </h5>
    </div>
  )
}

export default BodyNav
