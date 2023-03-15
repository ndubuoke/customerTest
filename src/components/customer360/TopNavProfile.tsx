import React, { useState, useEffect } from 'react'
import { profileImage2 } from 'Assets/svgs'
import { modifyVector } from 'Assets/svgs'
import { disableVector } from 'Assets/svgs'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { useLocation } from 'react-router-dom'
import { getSingleCustomerAction } from 'Redux/actions/Customer360.actions'

type Props = {}

const TopNavProfile = (props: Props) => {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const splitLocation = location.split('/')
  const getLocationId = splitLocation[3]

  // below values will be dispatch from redux
  const [profileImage, setProfileImage] = useState<string>(profileImage2)
  // const [id, setId] = useState<Number>(1022245678)
  // const [firstName, setFirstName] = useState<string>('Temitope')
  // const [lastName, setLastName] = useState<string>('Yusuf')
  // const [otherName, setOtherName] = useState<string>('chukwuma')

  const [singleCustomerProfile, setSingleCustomerProfile] = useState([]) as any

  const {
    loading: singleCustomerLoading,
    success: singleCustomerSuccess,
    serverResponse: singleCustomerData,
    serverError: singleCustomerError,
  } = useSelector((store: any) => store.getSingleCustomer)

  useEffect(() => {
    dispatch(getSingleCustomerAction(getLocationId) as any)
  }, [])

  // useEffect(() => {
  //   console.log(getLocationId)
  // }, [])

  useEffect(() => {
    if (singleCustomerSuccess) {
      const data = singleCustomerData?.data?.customer_profiles
      setSingleCustomerProfile(data)
    }
  }, [singleCustomerSuccess])

  return (
    <div className='flex gap-[1.25rem] items-center'>

      {singleCustomerProfile.length > 0
        ? singleCustomerProfile.map((customerDetails: any, customerIndex: any) => {
            return (
              <div key={customerIndex} className='flex items-center gap-4'>
                <div>
                  {' '}
                  {customerDetails?.image ? (
                    customerDetails?.image
                  ) : (
                    <>
                      {' '}
                      <div className=' w-[9.375rem] h-[9.375rem] p-[1.6744rem] border-[.1875rem] border-[#AAAAAA] rounded-[50%]  flex items-center justify-center'>
                        <img src={profileImage} alt='profile image' className='w-[5.5806rem] h-[5.7062rem]' />
                      </div>
                    </>
                  )}{' '}
                </div>

                <div>
                  <p className='flex text-[1.5rem] font-roboto text-[#636363] font-medium' style={{minHeight: '56px'}}>
                    {[customerDetails?.firstName, customerDetails?.lastName, customerDetails?.otherName].join(' ')}
                  </p>
                  <span className='text-[1rem]'>ID :{customerDetails?.idNumber} </span>

                  <section className='flex gap-[1.8125rem] mt-[.8975rem]'>
                    <div className='flex items-center gap-[.75rem] cursor-pointer'>
                      <img src={modifyVector} alt='modify vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
                      <span className='text-[1rem] tracking-wider capitalize '>modify</span>
                    </div>
                    <div className='flex items-center gap-[.75rem] cursor-pointer'>
                      <img src={disableVector} alt='disable vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
                      <span className='text-[1rem]  capitalize '>deactivate</span>
                    </div>
                  </section>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default TopNavProfile
