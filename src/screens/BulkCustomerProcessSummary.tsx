import { useState, useCallback, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'
import { bulkProcessSummaryColumns } from 'Utilities/columns'
import { BulkProcessSummaryTypes, SaveBulkCreationTypes } from 'Redux/reducers/BulkCreation'
import { ReducersType } from 'Redux/store'
import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { CancelIcon, ModifyIcon, SubmitIcon } from 'Assets/svgs'
import { BulkProcessSummaryTable } from 'Components/BulkCreation/BulkProcessSummaryTable'
import ActivityLog from 'Components/Shareables/ActivityLog'
import { AppRoutes } from 'Routes/AppRoutes'
import { saveCustomers, setFileUploaded, updateValidatedCustomers } from 'Redux/actions/BulkCreation'
import AlertModal from 'Components/Shareables/AlertModal'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'
import { BulkCreationDataInitialData } from 'Utilities/interfaces'
import { getUserProfile } from 'Redux/actions/UserPersmissions'

type Props = {
  headerText: string
  customerType: 'individual' | 'sme'
}

export const BulkCustomerProcessSummary = memo(({ headerText, customerType }: Props) => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const [beforeSave, setBeforeSave] = useState(false)
  const [onSaving, setOnSaving] = useState(false)
  const [dataToSave, setDataToSave] = useState(BulkCreationDataInitialData)

  const { bulkSummary } = useSelector<ReducersType>((state) => state.bulkProcessSummary) as BulkProcessSummaryTypes
  const { user } = useSelector<ReducersType>((state) => state.userProfile) as UserProfileTypes
  const {
    loading: saveLoading,
    message: saveMessage,
    error: saveError,
    success: saveSuccess,
  } = useSelector<ReducersType>((state) => state.saveBulkCustomerCreation) as SaveBulkCreationTypes

  const onCancelCreation = useCallback(() => {
    dispatch(setFileUploaded(false))
    dispatch(updateValidatedCustomers([]))
    navigate('/')
  }, [])

  const onSubmitCreation = useCallback(() => {
    setBeforeSave(false)
    setOnSaving(true)
    const tempData = dataToSave
    bulkSummary.forEach((summary) => {
      tempData?.data?.customerData.push(summary)
    })
    tempData.data.requestData.initiator = `${user?.firstname} ${user?.lastname}`
    tempData.data.requestData.initiatorId = user?.id
    tempData.data.requestData.requestType = 'Creation'
    setDataToSave(tempData)

    dispatch(saveCustomers(tempData))
    // console.log(tempData)

    // console.log(user)
  }, [onSaving, beforeSave, dataToSave, bulkSummary])

  const openBeforeSave = useCallback(() => {
    setBeforeSave(true)
  }, [beforeSave])

  const closeBeforeSave = useCallback(() => {
    setBeforeSave(false)
  }, [beforeSave])

  const closeSavingModal = useCallback(() => {
    setOnSaving(false)
    setDataToSave(BulkCreationDataInitialData)
  }, [dataToSave, onSaving])

  useEffect(() => {
    if (!user.email) {
      dispatch(getUserProfile())
    }
    if (!bulkSummary?.length) {
      navigate(AppRoutes.individualCustomerCreationScreen)
    }
  }, [user, bulkSummary])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className={`bg-background-dash relative flex mx-auto py-[1.25rem] font-roboto px-[1.875rem] gap-x-[1.25rem] h-screen`}>
        <section className={`w-[75%]`}>
          <div className={`relative rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-auto bg-white pt-20`}>
            <div className={`relative ml-20 mb-20 h-[6.75rem] w-[60%] rounded-[1.25rem] border border-[#d2d2d2] flex justify-center items-center`}>
              <div className={`w-[80%] flex justify-center items-center`}>
                <div className={`absolute bg-white border-none -top-3 left-7`}>Processing Status:</div>
                <div className={`w-[90%] relative h-[3.125rem]`}>
                  <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[.625rem]`}></div>
                  <img className={`absolute m-auto inset-y-0 left-0 w-[2.25rem] rounded-full`} src={ProcessDoneStateIcon} alt='' />
                  <div className={`absolute m-auto -bottom-[1.875rem] -left-[3.125rem] h-[1.875rem] `}>Pending Submission</div>
                  <img className={`absolute m-auto inset-y-0 right-0 w-[2.25rem] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                  <div className={`absolute m-auto -bottom-[1.875rem] text-center -right-[3.75rem] w-[9.375rem] h-[1.875rem]`}>Approval</div>
                </div>
              </div>
            </div>
            <div className={`px-20 mt-20 h-[18.75rem] overflow-auto`}>
              <BulkProcessSummaryTable
                onSearchStringChange={undefined}
                records={bulkSummary}
                tableTitle={`Bulk Individual Customer Details`}
                bulkTableColumns={bulkProcessSummaryColumns}
              />
            </div>

            <div className={`bg-white absolute m-auto bottom-2 right-2 w-[15.875rem] h-[4rem] flex justify-evenly items-center rounded-lg shadow-md`}>
              <button className={`flex flex-col justify-center items-center`} onClick={() => navigate(AppRoutes.individualCustomerCreationScreen)}>
                <ModifyIcon />
                <div>Modify</div>
              </button>
              <button className={`flex flex-col justify-center items-center`} onClick={onCancelCreation}>
                <CancelIcon />
                <div>Cancel</div>
              </button>
              <button className={`flex flex-col justify-center items-center`} onClick={openBeforeSave}>
                <SubmitIcon />
                <div>Submit Form</div>
              </button>
            </div>
          </div>
        </section>

        <section className={`w-[25%]`}>
          <div
            className={`rounded-lg text-[#636363] text-[1.5rem] leading-6 font-medium font-[Inter] tracking-wide w-full h-full bg-white pt-[1.5625rem] px-[1.25rem]`}
          >
            <div>
              <ActivityLog mode={'modification'} />
            </div>
            <div className={`mt-5 min-h-[70%] w-full max-h-[70%] overflow-auto`}></div>
          </div>
        </section>
      </main>
      <AlertModal
        leftClick={onCancelCreation}
        leftClickText={'Cancel'}
        rightClick={onSubmitCreation}
        rightClickText={'Yes'}
        message={`Default Savings Product will be Assigned to Customers `}
        closeModal={closeBeforeSave}
        loading={false}
        status={'warning'}
        isOpen={beforeSave}
      />
      <AlertModal
        leftClick={() => navigate(AppRoutes.mainScreen)}
        leftClickText={'Return to dashboard'}
        rightClick={() => navigate(AppRoutes.individualCustomerCreationScreen)}
        rightClickText={'Create another customer'}
        message={saveMessage}
        closeModal={closeSavingModal}
        loading={saveLoading}
        status={saveSuccess ? 'success' : saveError ? 'error' : 'warning'}
        isOpen={onSaving}
      />
    </>
  )
})

// Bulk Customer profiles created successfully
//
// 20 of 20 new customer profiles submitted
// for authorization
