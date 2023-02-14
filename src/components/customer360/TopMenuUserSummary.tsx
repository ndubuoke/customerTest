import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getSingleCustomerAction } from 'Redux/actions/Customer360.actions'
import TopNavProfile from './TopNavProfile'
import TopNavReusable from './TopNavReusable'

type Props = {}

const TopMenuUserSummary = (props: Props) => {
  // get location

  const dispatch = useDispatch()
  const location = useLocation().pathname
  const splitLocation = location.split('/')
  const getLocationId = splitLocation[3]

  // const [CustomerBvn, setCustomerBvn] = useState<string>('1234567890')
  // const [CustomerPhoneNumber, setCustomerPhoneNumber] = useState<string>('1234567890')
  // const [CustomerEmail, setCustomerEmail] = useState<string>('samuelusuf@gmail.com')
  // const [customerName, setCustomerName] = useState<string>('Iyke David')
  const [customerKycStatus, setCustomerKycStatus] = useState<string>('complete')
  const [customerRiskStatus, setCustomerRiskStatus] = useState<string>('low')
  const [customerType, setCustomerType] = useState<string>('individual')
  const [customerDetails, setCustomerDetails] = useState([]) as any
  //   mt-[7.125rem] ml-[4.4375rem]

  const {
    loading: singleCustomerLoading,
    success: singleCustomerSuccess,
    serverResponse: singleCustomerData,
    serverError: singleCustomerError,
  } = useSelector((store: any) => store.getSingleCustomer)

  useEffect(() => {
    dispatch(getSingleCustomerAction(getLocationId) as any)
  }, [])

  useEffect(() => {
    if (singleCustomerSuccess) {
      const data = singleCustomerData?.data?.customer_profiles
      setCustomerDetails(data)
    }
  }, [singleCustomerSuccess])

  // console.log({ det: customerDetails })
  return (
    <div>
      {customerDetails?.length
        ? customerDetails?.map((data: any, index: any) => {
            return (
              <div key={index} className=' bg-white py-[2.75rem] px-3 flex justify-between'>
                <TopNavProfile />
                <TopNavReusable type='bvn' heading='BVN' Id={data?.bvn} subHeader='Customer Persona' text='high net-worth individual' />
                <TopNavReusable type='phone number' heading='Phone Number' Id={data?.mobileNumber} subHeader='Customer Type' text={customerType} />
                <TopNavReusable
                  type='email address'
                  heading='Email Address'
                  Id={data?.emailAddress}
                  subHeader='KYC Status'
                  text={customerKycStatus}
                />
                <TopNavReusable
                  type='relationship manager'
                  heading='Relational Manager'
                  Id={data?.firstName}
                  subHeader='Risk Status'
                  text={customerRiskStatus}
                />
              </div>
            )
          })
        : null}
    </div>
  )
}

export default TopMenuUserSummary
