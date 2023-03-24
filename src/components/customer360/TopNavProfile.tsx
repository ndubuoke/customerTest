import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { profileImage2 } from 'Assets/svgs'
import { modifyVector } from 'Assets/svgs'
import { disableVector } from 'Assets/svgs'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { getSingleCustomerAction } from 'Redux/actions/Customer360.actions'
import {
  deactivateCustomerAction,
} from '../../redux/actions/CustomerManagement.actions'
import DeactivationModal from '../CustomerManagement/DeactivationModal'
import getCustomerDetail from '../../utilities/getCustomerDetail'
import mapRouteParam from '../../utilities/mapRouteParam'
import { AppRoutes } from 'Routes/AppRoutes'

import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'

type Props = {
  hideControl?: boolean;
}

const TopNavProfile = ({ hideControl = false }: Props) => {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const splitLocation = location.split('/')
  const getLocationId = splitLocation[3]

  // below values will be dispatch from redux
  const [profileImage, setProfileImage] = useState<string>(profileImage2)
  // const [id, setId] = useState<Number>(1022245678)

  const [singleCustomerProfile, setSingleCustomerProfile] = useState([]) as any
  const [uploadKeys, setUploadKeys] = useState([])
  const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  const [deactivateCustomerJustification, setDeactivateCustomerJustification] = useState('')
  const [showDeactivateCustomerAlertModal, setShowDeactivateCustomerAlertModal] = useState(false)

  const {
    loading: singleCustomerLoading,
    success: singleCustomerSuccess,
    serverResponse: singleCustomerData,
    serverError: singleCustomerError,
  } = useSelector((store: any) => store.getSingleCustomer)
  const userData = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes

  const deactivateCustomerHandler = (customer?: any) => {
    const body = {
      requestType: 'deactivation',

      firstName: getCustomerDetail(customer, 'firstName')[0],

      surname: getCustomerDetail(customer, 'surname')[0],

      customerType: customer?.customerType,
      waiverRequestId: null,

      initiator: `${userData.user?.firstname} ${userData.user?.lastname}`,

      initiatorId: `${userData.user?.id}`,

      customerId: getCustomerDetail(customer, 'customerId')[0],
      justification: `${deactivateCustomerJustification}`,
      documents: uploadKeys,
    }
    setShowDeactivationModal(false)
    setShowDeactivateCustomerAlertModal(true)
    dispatch(deactivateCustomerAction(body) as any)
  }

  const navigateToProfile = () => {
    if (!hideControl) navigate(mapRouteParam(AppRoutes.customer360ProfileScreen, ':customerId', customerId));
  }

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
    <>
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
                    <p className={classnames('flex text-[1.5rem] font-roboto text-[#636363] font-medium max-w-[239px] leading-tight', {'cursor-pointer hover:underline': !hideControl})} style={{minHeight: '56px'}} onClick={navigateToProfile}>
                      {[customerDetails?.firstName, customerDetails?.surname, customerDetails?.otherNames].join(' ')}
                    </p>
                    <span className='text-[1rem]'><strong>ID:</strong> {customerDetails?.customerEntityId} </span>

                    {!hideControl && <section className='flex gap-[1.8125rem] mt-[.8975rem]'>
                      <div className='flex items-center gap-[.75rem] cursor-pointer' onClick={() => navigate(mapRouteParam(AppRoutes.customerAccountProfileModify, ':customerId', customerId))}>
                        <img src={modifyVector} alt='modify vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
                        <span className='text-[1rem] tracking-wider capitalize '>modify</span>
                      </div>
                      <div className='flex items-center gap-[.75rem] cursor-pointer' onClick={() => navigate(mapRouteParam(AppRoutes.customerAccountProfileDeactivate, ':customerId', customerId))}>
                        <img src={disableVector} alt='disable vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
                        <span className='text-[1rem] capitalize'>deactivate</span>
                      </div>
                    </section>}
                  </div>
                </div>
              )
            })
          : null}
      </div>

      {showDeactivationModal ? (
        <DeactivationModal
          setUploadKeys={setUploadKeys}
          setDeactivateCustomerJustification={setDeactivateCustomerJustification}
          deactivateCustomerHandler={deactivateCustomerHandler}
          setShowDeactivationModal={setShowDeactivationModal}
        />
      ) : null}
    </>
  )
}

export default TopNavProfile
