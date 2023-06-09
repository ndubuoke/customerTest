import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { Form } from 'Components/Form/Types'

import GoBack from 'Components/MainScreenLayout/GoBack'
import ProcessActions from 'Components/ProcessSummary/ProcessActions'
import ProgressBar from 'Components/ProcessSummary/ProgressBar'
import SignatorySummary from 'Components/ProcessSummary/SignatorySummary'
import ExecutiveSummary from 'Components/ProcessSummary/ExecutiveSummary'
import AdditionalDetailsSummary from 'Components/ProcessSummary/AdditionalDetailsSummary'
import SingleSection from 'Components/ProcessSummary/SingleSection'
import ActivityLog from 'Components/Shareables/ActivityLog'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showWaiverModalInFormAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType, ShowModalInFormType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import convertCamelCaseToTitleCaseText from 'Utilities/convertCamelCaseToTitleCaseText'
import {
  individualCustomerCreationData,
  individualCustomerModificationData,
  smeCustomerCreationData,
  smeCustomerModificationData,
} from '../data/process-summary'
import { CreationModeType } from './CustomerCreation'

export type FormModeType = 'creation' | 'modification'
export type TimelineType = 'show' | 'hide'
export type StatusType = 'not approved' | 'approved'
export type ProgressStatusType = 'both' | 'edd' | 'documentation'
export type CustomerTypeType = 'individual' | 'sme'
export type FormTypeType = 'legacy' | 'accelerated'

type Props = {
  headerText: string
  customerType: CustomerTypeType
}

const ProcessSummary = ({ headerText, customerType }: Props) => {
  const dispatch = useDispatch()

  const publishedFormInStorage: ResponseType = sessionStorage.getItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE))
    : null

  const FormModeInStorage: FormModeType = sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS))
    : null
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null
  const customerManagementDataInStorage: any = sessionStorage.getItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_MODIFICATION_DATA)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_MODIFICATION_DATA))
    : null
  const showWaiverModalInFormStorage: TimelineType = sessionStorage.getItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM))
    : null
  const showEddModalInFormStorage: TimelineType = sessionStorage.getItem(STORAGE_NAMES.SHOW_EDD_MODAL_IN_FORM)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.SHOW_EDD_MODAL_IN_FORM))
    : null

  const [firstPageLength, setFirstLength] = useState<number>(null)
  const [formMode, setFormMode] = useState<FormModeType>('creation')
  const [docWaiverRequest, setDocWaiverRequest] = useState<TimelineType>('hide')
  const [eddRequest, setEddRequest] = useState<TimelineType>('hide')
  const [docWaiverStatus, setDocWaiverStatus] = useState<StatusType>('not approved')
  const [eddStatus, setEddStatus] = useState<StatusType>('not approved')
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [processActionsMode, setProcessActionsMode] = useState<ProgressStatusType>(null)
  const [openWaiver, setOpenWaiver] = useState<TimelineType>('hide')
  const [formType, setFormType] = useState<FormTypeType>(null)

  // const [initiator, setInitiator] = useState('A Adeshina')
  // const [initiatorId, setInitiatorId] = useState('abf93efb-18c5-4c5e-a8d3-2692675ee3e6')

  // const showWaiverModalInForm = useSelector<ReducersType>((state: ReducersType) => state?.showWaiverModalInForm) as ShowModalInFormType

  const userProfileRedux = useSelector<ReducersType>((state: ReducersType) => state?.userProfile) as any
  const riskAssessmentRedux = useSelector<ReducersType>((state: ReducersType) => state?.riskAssessment) as any
  console.log('profile-summary-riskAssessmentRedux', riskAssessmentRedux)
  // handle initiator
  // useEffect(() => {
  //   if (userProfileRedux?.user?.id) {
  //     setInitiatorId(userProfileRedux?.user?.id)
  //     setInitiator(userProfileRedux?.user?.firstname + ' ' + userProfileRedux?.user?.lastname)
  //   }
  // }, [userProfileRedux])
  // console.log('userprofile', userProfileRedux)
  useEffect(() => {
    if (showWaiverModalInFormStorage && showWaiverModalInFormStorage === 'show') {
      // console.log('In the stoirage')
      setDocWaiverRequest('show')
      if (showEddModalInFormStorage && showEddModalInFormStorage === 'show') {
        setProcessActionsMode('both')
      } else {
        setProcessActionsMode('documentation')
      }
    } else {
      // console.log('Not in the storage')
      setDocWaiverRequest('hide')
    }
  }, [])
  useEffect(() => {
    if (showEddModalInFormStorage && showEddModalInFormStorage === 'show') {
      // console.log('In the stoirage')
      setEddRequest('show')
      if (showWaiverModalInFormStorage && showWaiverModalInFormStorage === 'show') {
        setProcessActionsMode('both')
      } else {
        setProcessActionsMode('edd')
      }
    } else {
      // console.log('Not in the storage')
      setEddRequest('hide')
    }
  }, [])

  useEffect(() => {
    if (
      (showWaiverModalInFormStorage && showWaiverModalInFormStorage === 'show') ||
      (showEddModalInFormStorage && showEddModalInFormStorage === 'show')
    ) {
      setOpenWaiver('show')
    } else {
      setOpenWaiver('hide')
    }
  }, [])

  useEffect(() => {
    const form = publishedFormInStorage?.serverResponse?.data as Form
    const formType = convertCamelCaseToTitleCaseText(form?.formType)?.split(' ')[1]?.toLowerCase() as FormTypeType
    setFormType(formType)

    if (form?.builtFormMetadata?.pages.length > 0) {
      const theFirstPageLength = form?.builtFormMetadata?.pages[0].sections.length

      setFirstLength(theFirstPageLength)
    }
  }, [])

  useEffect(() => {
    if (
      customerType === 'individual' &&
      formType === 'legacy' &&
      (riskAssessmentRedux.riskScoreGuide?.rating === 'HIGH' || riskAssessmentRedux.riskScoreGuide?.rating === 'MEDIUM')
    ) {
      setOpenWaiver('show')
      setProcessActionsMode('edd')
      setEddRequest('show')
    }
  }, [riskAssessmentRedux, formType])
  // console.log('formtype', formType)
  // console.log('customerType', customerType)
  // TODO: Handle submitted state when form is submitted successfully

  useEffect(() => {
    // console.log({ FormModeInStorage })
    setFormMode(FormModeInStorage)
  }, [])

  return (
    <>
      <nav>
        <GoBack
          headerText='PROCESS SUMMARY'
          breadCrumbsList={
            customerType === 'individual'
              ? formMode === 'creation'
                ? individualCustomerCreationData
                : individualCustomerModificationData
              : formMode === 'creation'
              ? smeCustomerCreationData
              : smeCustomerModificationData
          }
        />
      </nav>

      <main className={` relative flex mx-auto py-[1rem] font-roboto px-[1rem] gap-x-[20px] min-h-50   `}>
        <section
          className={` relative `}
          style={{
            maxWidth: '73%',
            width: '70%',
          }}
        >
          <div className={`relative rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full  bg-white py-6`}>
            <div className='p-4'>
              <ProgressBar
                mode={formMode}
                docWaiverRequest={docWaiverRequest}
                docWaiverStatus={docWaiverStatus}
                eddRequest={eddRequest}
                eddStatus={eddStatus}
                customerType={customerManagementDataInStorage?.customerType.toLowerCase()}
              />
            </div>
            <div className='pl-4 flex flex-col gap-8 h-[70vh] min-h-50  overflow-y-auto pt-4 pb-12 overflow-x-hidden'>
              <h2
                className='capitalize font-medium text-[24px] leading-[28px] text-[#636363] px-4 py-4 '
                style={{
                  fontFamily: 'Roboto',
                  letterSpacing: '0.025em',
                }}
              >
                {customerType.split('--')[0].trim()} Customer Creation
              </h2>
              <div className='flex flex-col gap-8 '>
                {!fillingFormInStorage
                  ? null
                  : fillingFormInStorage?.data?.customerData?.map((x, i) => {
                      return (
                        <div key={i}>
                          <SingleSection section={x} name={x?.sectionName} />
                          {customerType === 'sme' && i === firstPageLength ? (
                            <>
                              <SignatorySummary />
                              <ExecutiveSummary />
                              <AdditionalDetailsSummary />
                            </>
                          ) : null}
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>
          <ProcessActions mode={formMode} waiverType={processActionsMode} customerType={customerType} openWaiver={openWaiver} formType={formType} />
        </section>
        <section className={`max-w-[27%] min-w-[350px]`}>
          <div
            className={`rounded-lg text-[#636363] text-[16px] leading-6 font-medium font-[Inter] tracking-wide w-full h-full bg-white pt-[25px] px-[20px] overflow-y-auto`}
          >
            {/* <div className='font-medium text-[24px] leading-28px text-[#636363]'>Activity Log</div> */}
            <ActivityLog customerId={customerManagementDataInStorage?.customerId} mode={formMode} />
          </div>
        </section>
      </main>
    </>
  )
}

export default ProcessSummary
