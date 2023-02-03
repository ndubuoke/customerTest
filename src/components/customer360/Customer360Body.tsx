import React, { useState } from 'react'
import BodyNav from './BodyNav'
import CustomerPortfolio from './CustomerPortfolio'

type Props = {}

const Customer360Body = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>('') as any
  return (
    <div className='bg-[#E5E5E5] px-2'>
      <BodyNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <CustomerPortfolio activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Customer360Body
