import { useState, useCallback, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'
import SwitchToFormType from 'Components/Shareables/SwitchToFormType'
import WizardChanger from 'Components/Shareables/WizardChanger'
import CreationMode from 'Components/Shareables/CreationMode'
import CustomerCreationBox from 'Components/Shareables/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import { IdentificationNumberType, IdentificationTypeType } from 'Components/Shareables/IdentificationTypeAndNumber'
import Button from 'Components/Shareables/Button'
import SkipToForm from 'Components/Shareables/SkipToForm'
import Form from 'Components/Form'
import { bulkProcessSummaryColumns } from 'Utilities/columns'
import { BulkTable } from 'Components/BulkCreation/BulkTable'
import { BulkProcessSummaryTypes } from 'Redux/reducers/BulkCreation'
import { ReducersType } from 'Redux/store'
import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { CancelIcon, ModifyIcon, SubmitIcon } from 'Assets/svgs'
import { BulkProcessSummaryTable } from 'Components/BulkCreation/BulkProcessSummaryTable'

type Props = {
  headerText: string,
  customerType: "individual" | "sme"
}


export const BulkCustomerProcessSummary = memo(({ headerText, customerType }: Props) => {
  const naviate = useNavigate()
  const { bulkSummary } = useSelector<ReducersType>((state) => state.bulkProcessSummary) as BulkProcessSummaryTypes

  const onCancelCreation = useCallback(() => {
    naviate("/")
  }, [])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className={`bg-background-dash relative flex mx-auto py-[20px] font-roboto px-[30px] gap-x-[20px] h-screen`}>
        <section className={`w-[80%]`}>
          <div className={`relative rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-auto bg-white pt-20`}>
            <div className={`relative ml-20 mb-20 h-[108px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}>
              <div className={`w-[80%] flex justify-center items-center`}>
                <div className={`absolute bg-white border-none -top-3 left-7`}>Processing Status:</div>
                <div className={`w-[90%] relative h-[50px]`}>
                  <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
                  <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={ProcessDoneStateIcon} alt="" />
                  <div className={`absolute m-auto -bottom-[30px] -left-[50px] h-[30px] `}>Pending Submission</div>
                  <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt="" />
                  <div className={`absolute m-auto -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>Approval</div>
                </div>
              </div>
            </div>
            <div className={`px-20 mt-20 h-[300px] overflow-auto`}>

              <BulkProcessSummaryTable
                onSearchStringChange={undefined}
                records={bulkSummary}
                tableTitle={`Bulk Individual Customer Details`}
                bulkTableColumns={bulkProcessSummaryColumns}
              />
            </div>

            <div className={`bg-white absolute m-auto bottom-2 right-2 w-[254px] h-[64px] flex justify-evenly items-center rounded-lg shadow-md`}>
              <button className={`flex flex-col justify-center items-center`}>
                <ModifyIcon />
                <div>
                  Modify
                </div>
              </button>
              <button className={`flex flex-col justify-center items-center`} onClick={onCancelCreation}>
                <CancelIcon />
                <div>
                  Cancel
                </div>
              </button>
              <button className={`flex flex-col justify-center items-center`}>
                <SubmitIcon />
                <div>
                  Submit Form
                </div>
              </button>
            </div>
          </div>
        </section>
        <section className={`w-[20%]`}>
          <div className={`rounded-lg text-[#636363] text-[24px] leading-6 font-medium font-[Inter] tracking-wide w-full h-full bg-white pt-[25px] px-[20px]`}>
            <div>
              Activity Log
              <hr className={`w-full mt-4 border border-[#CCCCCC]`} />
            </div>
            <div className={`mt-5 min-h-[70%] w-full max-h-[70%] overflow-auto`}>

            </div>
          </div>
        </section>

      </main>
    </>
  )
})
