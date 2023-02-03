import React, { useState } from 'react'
import TopNavProfile from './TopNavProfile'
import TopNavReusable from './TopNavReusable'

type Props = {}

const TopMenuUserSummary = (props: Props) => {
  const [CustomerBvn, setCustomerBvn] = useState<string>('1234567890')
  const [CustomerPhoneNumber, setCustomerPhoneNumber] = useState<string>('1234567890')
  const [CustomerEmail, setCustomerEmail] = useState<string>('samuelusuf@gmail.com')
  const [customerName, setCustomerName] = useState<string>('Iyke David')
  const [customerKycStatus, setCustomerKycStatus] = useState<string>('')
  const [customerRiskStatus, setCustomerRiskStatus] = useState<string>('low')
  const [customerType, setCustomerType] = useState<string>('')
  //   mt-[7.125rem] ml-[4.4375rem]

  return (
    <div className='  mt-[4.125rem] px-[4.4rem] flex justify-between'>
      <TopNavProfile />
      <TopNavReusable type='bvn' heading='BVN' Id={CustomerBvn} subHeader='Customer Persona' text='high net-worth individual' />
      <TopNavReusable type='phone number' heading='Phone Number' Id={CustomerPhoneNumber} subHeader='Customer Type' text={customerType} />
      <TopNavReusable type='email address' heading='Email Address' Id={CustomerEmail} subHeader='KYC Status' text={customerKycStatus} />
      <TopNavReusable type='relationship manager' heading='Relational Manager' Id={customerName} subHeader='Risk Status' text={customerRiskStatus} />
    </div>
  )
}

export default TopMenuUserSummary
