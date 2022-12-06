import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'

import GoBack from 'Components/MainScreenLayout/GoBack'
import ProcessActions from 'Components/ProcessSummary/ProcessActions'
import ProgressBar from 'Components/ProcessSummary/ProgressBar'
import SingleSection from 'Components/ProcessSummary/SingleSection'
import ActivityLog from 'Components/Shareables/ActivityLog'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showWaiverModalInFormAction } from 'Redux/actions/FormManagement.actions'
import { ShowModalInFormType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/process-summary'

type Props = {
  headerText: string
  customerType: 'individual' | 'sme'
}

const ProcessSummary = ({ headerText, customerType }: Props) => {
  const dispatch = useDispatch()
  const fillingFormInStorage: FormStructureType = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE))
    : null
  const showWaiverModalInFormStorage: 'show' | 'hide' = sessionStorage.getItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM))
    : null

  const [showWaiverTimeline, setShowWaiverTimeline] = useState<'show' | 'hide'>('hide')

  // const showWaiverModalInForm = useSelector<ReducersType>((state: ReducersType) => state?.showWaiverModalInForm) as ShowModalInFormType

  useEffect(() => {
    // if (showWaiverModalInForm && showWaiverModalInForm.status === 'show') {
    //   setShowWaiverTimeline(true)
    //   console.log('In the waiver modal in form')
    // } else {
    if (showWaiverModalInFormStorage && showWaiverModalInFormStorage === 'show') {
      console.log('In the stoirage')
      setShowWaiverTimeline('show')
    } else {
      console.log('Not in the storage')
      setShowWaiverTimeline('hide')
    }
  }, [])

  useEffect(() => {
    console.log({ showWaiverModalInFormStorage, showWaiverTimeline })
  }, [showWaiverModalInFormStorage, showWaiverTimeline])

  return (
    <>
      <nav>
        <GoBack
          headerText='PROCESS SUMMARY'
          breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData}
        />
      </nav>

      <main className={`bg-background-dash relative flex mx-auto py-12 font-roboto px-[30px] gap-x-[20px] min-h-50  `}>
        <section className={`w-[75%] relative `}>
          <div className={`relative rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full  bg-white py-6`}>
            <div className='p-4'>
              <ProgressBar mode='creation' waiverRequest={showWaiverTimeline} waiverStatus='not approved' />
            </div>
            <div className='px-4 flex flex-col gap-8 h-[70vh] min-h-50  overflow-y-auto pt-4 pb-12'>
              <h2
                className='capitalize font-medium text-[24px] leading-[28px] text-[#636363] px-4 py-4'
                style={{
                  letterSpacing: '0.025em',
                }}
              >
                {customerType.split('--')[0].trim()} Customer Creation
              </h2>
              <div className='px-4 flex flex-col gap-8 '>
                {!fillingFormInStorage
                  ? null
                  : fillingFormInStorage?.data?.customerData?.map((x, i) => {
                      return <SingleSection section={x} key={i} />
                    })}
              </div>
            </div>
          </div>
          <div className='absolute bg-white  m-auto bottom-2 right-2 '>
            <ProcessActions waiver={showWaiverTimeline} mode='creation' customerType={customerType} />
          </div>
        </section>
        <section className={`w-[25%]`}>
          <div
            className={`rounded-lg text-[#636363] text-[16px] leading-6 font-medium font-[Inter] tracking-wide w-full h-full bg-white pt-[25px] px-[20px overflow-y-auto`}
          >
            <ActivityLog />
          </div>
        </section>
      </main>
    </>
  )
}

export default ProcessSummary
