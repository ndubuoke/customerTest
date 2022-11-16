import { useState, useCallback, useEffect, memo } from 'react'
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

type Props = {
  headerText: string,
  customerType: "individual" | "sme"
}


export const BulkCustomerProcessSummary = memo(({ headerText, customerType }: Props) => {
  const { bulkSummary } = useSelector<ReducersType>((state) => state.bulkProcessSummary) as BulkProcessSummaryTypes
  // const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'
  // const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  // const [creationMode, setCreationMode] = useState<CreationModeType>(CreationModeEnum.Bulk)
  // const [identificationDetails, setIdentificationDetails] = useState<IdentificationDetailsType>({
  //   identificationType: null,
  //   identificationNumber: null,
  // })
  // const [localUpload, setLocalUpload] = useState<Array<File>>([])
  // const [formCreationStarted, setFormCreationStarted] = useState<boolean>(false)

  // const onSetFormMode = useCallback(
  //   (value) => {
  //     setFormMode(value)
  //     setCreationMode(CreationModeEnum.Single)
  //   },
  //   [formMode, creationMode]
  // )

  // const handleProceed = () => { }

  // useEffect(() => {
  //   // console.log(identificationDetails)
  // }, [identificationDetails])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className={`bg-background-dash relative flex mx-auto py-[20px] font-roboto px-[30px] gap-x-[20px] h-screen`}>
        <section className={`w-[80%]`}>
          <div className={`rounded-lg text-[#636363]font-[Inter] w-full h-full bg-white`}>
            <BulkTable
              onSearchStringChange={undefined}
              records={bulkSummary}
              tableTitle={`Bulk Individual Customer Details`}
              bulkTableColumns={bulkProcessSummaryColumns}
            />
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
