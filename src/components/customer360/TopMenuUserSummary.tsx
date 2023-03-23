import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link, useParams } from 'react-router-dom'
import { getSingleCustomerAction } from 'Redux/actions/Customer360.actions'
import TopNavProfile from './TopNavProfile'
import TopNavReusable from './TopNavReusable'
import _ from 'lodash'
import mapRouteParam from '../../utilities/mapRouteParam'
import { AppRoutes } from 'Routes/AppRoutes'

type Props = {}

const TopMenuUserSummary = (props: Props) => {
  const { customerId } = useParams()
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
  const [customerRelationshipManager, setCustomerRelationshipManager] = useState<string>('N/A')
  const [customerDetails, setCustomerDetails] = useState([]) as any

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
      // setCustomerKycStatus(singleCustomerData?.data?.customerKycStatus)
      setCustomerType(singleCustomerData?.data?.customerType)
      setCustomerRiskStatus(_.defaultTo(singleCustomerData?.data?.riskStatus, 'N/A'))
      setCustomerDetails(data)
    }
  }, [singleCustomerSuccess])

  return (
    <div>
      {customerDetails?.length
        ? customerDetails?.map((data: any, index: any) => {
            const bvnNo = _.defaultTo(_.get(data, 'bvn'), 'N/A')
            return (
              <div key={index} className=' bg-white py-[2.75rem] px-3'>
                <div className='flex justify-between'>
                  <TopNavProfile />
                  <TopNavReusable type='bvn' heading='Customer Type' Id={customerType} subHeader='Customer Persona' text='high net-worth' />
                  <TopNavReusable type='email address' heading='BVN' Id={bvnNo} subHeader='KYC Status' text={customerKycStatus} />
                  <TopNavReusable type='relationship manager' heading='Phone Number' Id={data?.mobileNumber} subHeader='Risk Status' text={customerRiskStatus} />
                  <TopNavReusable
                    type='text'
                    heading='Email Address'
                    Id={data?.emailAddress}
                    subHeader='Relational Manager'
                    text={customerRelationshipManager}
                  />
                </div>
                <div className='flex justify-end leading-none'>
                  <Link to={mapRouteParam(AppRoutes.customer360ProfileScreen, ':customerId', customerId)} className='underline text-[#CF2A2A]'>
                    <a>View More</a>
                  </Link>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default TopMenuUserSummary
