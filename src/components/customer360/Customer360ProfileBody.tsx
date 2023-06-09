import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileBodyNav from './ProfileBodyNav'
import BackButton from 'Components/MainScreenLayout/BackButton'
import TopNavProfile from './TopNavProfile'
import { AppRoutes } from 'Routes/AppRoutes'
import mapRouteParam from 'Utilities/mapRouteParam'
import { ReducersType } from 'Redux/store'
import { useSelector } from 'react-redux'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'
import Accordion from './Accordion'
import _ from 'lodash'

type Props = {}

const Customer360ProfileBody = (props: Props) => {
  const { customerId } = useParams()
  const [singleCustomerProfile, setSingleCustomerProfile] = useState([]) as any

  const {
    loading: singleCustomerLoading,
    success: singleCustomerSuccess,
    serverResponse: singleCustomerData,
    serverError: singleCustomerError,
  } = useSelector((store: any) => store.getSingleCustomer)
  const userData = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as UserProfileTypes

  const [activeTab, setActiveTab] = useState<string>('profile')

  useEffect(() => {
    if (singleCustomerSuccess) {
      const data = singleCustomerData?.data?.customer_profiles
      setSingleCustomerProfile(data)
    }
  }, [singleCustomerSuccess])

  return (
    <div className='h-[80vh] pb-4 overflow-y-auto'>
      <BackButton
        text='Back'
        link={mapRouteParam(AppRoutes.customer360Screen, ':customerId', customerId)}
      />
      <div className='flex flex-row items-end gap-x-12 mt-1'>
        <TopNavProfile hideControl={true} />
        {!singleCustomerLoading && <div>
          <ProfileBodyNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>}
      </div>
      {(activeTab === 'profile' && singleCustomerProfile.length > 0)
          ? singleCustomerProfile.map((customerDetails: any, customerIndex: any) => {
              return (
                <div className='flex flex-col justify-between px-10 py-7 border border-[#EEEEEE] rounded-[10px] gap-[1rem] mt-7' key={customerIndex}>
                  <div>
                    <Accordion title="Biodata" expand={true}>
                      <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Title</span>
                          <span>
                            {_.defaultTo(customerDetails?.title, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Surname</span>
                          <span>
                            {_.defaultTo(customerDetails?.surname, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>First Name</span>
                          <span>
                            {_.defaultTo(customerDetails?.firstName, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Other Names</span>
                          <span>
                            {_.defaultTo(customerDetails?.otherNames, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Mother's Maiden Name</span>
                          <span>
                            {_.defaultTo(customerDetails?.motherMaidenName, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Gender</span>
                          <span>
                            {_.defaultTo(customerDetails?.gender, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Marital Status</span>
                          <span>
                            {_.defaultTo(customerDetails?.maritalStatus, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Date of Birth</span>
                          <span>
                            {_.defaultTo(customerDetails?.dateOfBirth, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Country</span>
                          <span>
                            {_.defaultTo(customerDetails?.country, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>State of Origin</span>
                          <span>
                            {_.defaultTo(customerDetails?.stateOfOrigin, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>LGA</span>
                          <span>
                            {_.defaultTo(customerDetails?.lga, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Dual Citizenship</span>
                          <span>
                            {_.defaultTo(customerDetails?.dualCitizenship, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>If yes, specify</span>
                          <span>
                            {_.defaultTo(customerDetails?.dualCitizenshipCountry, '-')}
                          </span>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion title="Identity Verification">
                      <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>BVN</span>
                          <span>
                            {_.defaultTo(customerDetails?.bvn, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Choose an ID</span>
                          <span>
                            {_.defaultTo(customerDetails?.idType, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>ID Number</span>
                          <span>
                            {_.defaultTo(customerDetails?.idNumber, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Issue date</span>
                          <span>
                            {_.defaultTo(customerDetails?.issueDate, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Expiry date</span>
                          <span>
                            {_.defaultTo(customerDetails?.expiryDate, '-')}
                          </span>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion title="Contact Information">
                      <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Residential Address
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.residentialAddress, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Detailed Description of Address
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.residentialAddressDetailedDesc, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Country</span>
                          <span>
                            {_.defaultTo(customerDetails?.country, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>State</span>
                          <span>
                            {_.defaultTo(customerDetails?.state, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>City/Town</span>
                          <span>
                            {_.defaultTo(customerDetails?.cityTown, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            LGA
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.lga, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Mobile Number</span>
                          <span>
                            {_.defaultTo(customerDetails?.mobileNumber, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Alternate Phone Number
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.alternativeMobileNumber, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Email Address</span>
                          <span>
                            {_.defaultTo(customerDetails?.emailAddress, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Mailing Address is same as Residential Address
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.mailingAddressSameAsResidentialAddress, '-')}
                          </span>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                  <div>
                    <Accordion title="Details of Next of Kin">
                      <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Title</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_title, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Surname</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_surname, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>First Name</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_firstName, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Other Names</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_otherNames, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Relationship</span>
                          <span>
                            {_.defaultTo(customerDetails?.relationship, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Gender</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_gender, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Date of Birth</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_dateOfBirth, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Residential Address
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_residentialAddress, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Detailed Description of Address
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_detailedDescriptionOfResidentialAddress, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Country</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_countryOfResidence, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>State</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_stateOfResidence, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>City/Town</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_cityTown, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            LGA
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_lga, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Mobile Number</span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_mobileNumber, '-')}
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Alternate Phone Number
                          </span>
                          <span>
                            {_.defaultTo(customerDetails?.donok_alternatePhoneNumber, '-')}
                          </span>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                  {/* <div>
                    <Accordion title="Section Name">
                    <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Title</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Surname</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>First Name</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Other Names</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Mother's Maiden Name</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Gender</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Marital Status</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Date of Birth</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Country</span>
                          <span>Mr</span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>State of Origin</span>
                          <span>Mr</span>
                        </div>
                      </div>
                    </Accordion>
                  </div> */}
                  <div>
                    <Accordion title="Documentation">
                    <div className='flex flex-col px-4 lg:px-[70px] py-6 lg:py-8 gap-y-5'>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>Customer Photo</span>
                          <span>
                            {customerDetails?.customersPhoto ? 'Uploaded' : 'Not Uploaded'}
                            {
                              customerDetails?.customersPhoto &&
                              <a
                                href={customerDetails?.customersPhoto}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Customer's Signature
                          </span>
                          <span>
                            {customerDetails?.customersSignature ? 'Uploaded' : 'Not Uploaded'}
                            {
                              customerDetails?.customersSignature &&
                              <a
                                href={customerDetails?.customersSignature}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Proof of Identity
                          </span>
                          <span>
                            {customerDetails?.validID ? 'Uploaded' : 'Not Uploaded'}
                            {
                              customerDetails?.validID &&
                              <a
                                href={customerDetails?.validID}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Proof of Address
                          </span>
                          <span>
                            {customerDetails?.proofOfResidentialAddress ? 'Uploaded' : 'Not Uploaded'}
                            {
                              customerDetails?.proofOfResidentialAddress &&
                              <a
                                href={customerDetails?.proofOfResidentialAddress}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Residential Permit
                          </span>
                          <span>
                            {customerDetails?.residentialPermit ? 'Uploaded' : 'Not Applicable'}
                            {
                              customerDetails?.residentialPermit &&
                              <a
                                href={customerDetails?.residentialPermit}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Marriage Certificate
                          </span>
                          <span>
                            {customerDetails?.marriageCertificate ? 'Uploaded' : 'Not Applicable'}
                            {
                              customerDetails?.marriageCertificate &&
                              <a
                                href={customerDetails?.marriageCertificate}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Letter from Employer/School/NYSC
                          </span>
                          <span>
                            {customerDetails?.letterFromEmployerSchoolNYSC ? 'Uploaded' : 'Not Applicable'}
                            {
                              customerDetails?.letterFromEmployerSchoolNYSC &&
                              <a
                                href={customerDetails?.letterFromEmployerSchoolNYSC}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Independent Satisfactory References
                          </span>
                          <span>
                            {customerDetails?.letterFromEmployerSchoolNYSC ? 'Uploaded' : 'Not Applicable'}
                            {
                              customerDetails?.letterFromEmployerSchoolNYSC &&
                              <a
                                href={customerDetails?.letterFromEmployerSchoolNYSC}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                        <div className='flex text-base text-[#636363]'>
                          <span className='font-medium w-[260px] pr-5'>
                            Other Documents Provided
                          </span>
                          <span>
                            {customerDetails?.otherUncategorizedDocuments ? 'Uploaded' : 'Not Applicable'}
                            {
                              customerDetails?.otherUncategorizedDocuments &&
                              <a
                                href={customerDetails?.otherUncategorizedDocuments}
                                target="_blank"
                                className="pl-2"
                              >
                                (View)
                              </a>
                            }
                          </span>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                </div>
              )
          }) :
        ''
      }
    </div>
  )
}

export default Customer360ProfileBody
