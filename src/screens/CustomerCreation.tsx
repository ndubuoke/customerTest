import { useState, useCallback, useEffect, memo } from 'react'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { individualCustomerCreationData, smeCustomerCreationData } from '../data/customerCreationBreadcrumbs'
import SwitchToFormType from 'Components/Shareables/SwitchToFormType'
import WizardChanger from 'Components/Shareables/WizardChanger'
import MatchModal from 'Components/Shareables/MatchModal'
import CreationMode from 'Components/Shareables/CreationMode'
import CustomerCreationBox from 'Components/Shareables/CustomerCreation'
import { CreationModeEnum } from 'Utilities/enums'
import { IdentificationNumberType, IdentificationTypeType } from 'Components/Shareables/IdentificationTypeAndNumber'
import Button from 'Components/Shareables/Button'
import SkipToForm from 'Components/Shareables/SkipToForm'
import Form from 'Components/Form'
import { UploadFile } from 'Components/Shareables'
import { useDispatch } from 'react-redux'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { API } from 'Utilities/api'
import ExtractInfoModal from 'Components/Shareables/ExtractInfoModal'

type Props = {
  customerType: 'sme' | 'individual'
}

export type CustomerType = 'sme' | 'individual'
export type FormModeType = 'accelerated' | 'legacy'
export type CreationModeType = 'single' | 'bulk'
export type IdentificationDetailsType = {
  identificationType: IdentificationTypeType
  identificationNumber: IdentificationNumberType
  identityData: any
}

const CustomerCreation = memo(({ customerType }: Props) => {
  const dispatch = useDispatch()

  const headerText = customerType === 'individual' ? 'INDIVIDUAL CUSTOMER CREATION' : 'SME CUSTOMER CREATION'
  const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  const [creationMode, setCreationMode] = useState<CreationModeType>(CreationModeEnum.Bulk)
  const [identificationDetails, setIdentificationDetails] = useState<IdentificationDetailsType>({
    identificationType: null,
    identificationNumber: null,
    identityData: null,
  })
  const [localUpload, setLocalUpload] = useState<Array<UploadFile>>([])
  // changing state to identification type and file upload(formCreationstarted)
  const [formCreationStarted, setFormCreationStarted] = useState<boolean>(false)
  const [matchResponse, setMatchResponse] = useState({ showModal: false, response: { matches: {}, percent: '90.00' } })
  const [isMatching, setIsMatching] = useState(false)

  const handleModalDisplay = (isVisible: boolean) => {
    setMatchResponse((prev) => ({
      ...prev,
      showModal: isVisible,
    }))
  }

  const onSetFormMode = useCallback(
    (value) => {
      setFormMode(value)
      setCreationMode(CreationModeEnum.Single)
    },
    [formMode, creationMode]
  )

  const handleProceed = async () => {
    setIsMatching(true)
    try {
      const response = await API.post(`/verification/match/${identificationDetails.identificationType}`, {
        extractedData: localUpload.map((upload) => ({
          documentType: upload.verificationData.docType,
          data: upload.verificationData.extractedData,
        })),
        identityData: identificationDetails.identityData,
      })
      setIsMatching(false)
      setMatchResponse({
        showModal: true,
        response: response.data.data,
      })
      console.log('uploads', localUpload)
      console.log('identificationDetails', identificationDetails)
      console.log('response', response)
    } catch (err) {
      console.error(err)
      setIsMatching(false)
    }
  }

  useEffect(() => {
    if (formCreationStarted) {
      dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
    }
  }, [formCreationStarted])

  return (
    <>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={customerType === 'individual' ? individualCustomerCreationData : smeCustomerCreationData} />
      </nav>

      <main className='bg-background-dash relative flex flex-col h-full mx-auto p-[15px]   min-h-50 '>
        <div className={`${formCreationStarted ? '' : 'h-[845px]'} min-h-[845px] bg-white rounded-lg border border-[#E5E9EB] relative`}>
          <SwitchToFormType customerType={customerType} formCreationStarted={formCreationStarted} mode={formMode} onSetFormMode={onSetFormMode} />

          {!formCreationStarted ? (
            <>
              {isMatching && <ExtractInfoModal />}
              {matchResponse.showModal && <MatchModal setShowMatchModal={handleModalDisplay} data={matchResponse.response} />}
              <WizardChanger formMode={formMode} creationMode={creationMode} customerType={customerType} />
              {customerType === 'individual' && formMode === 'accelerated' ? (
                <CreationMode mode={creationMode} setCreationMode={setCreationMode} />
              ) : null}
              <section className='flex flex-col justify-between pb-20 h-3/4'>
                <CustomerCreationBox
                  creationMode={creationMode}
                  customerType={customerType}
                  setIdentificationDetails={setIdentificationDetails}
                  identificationDetails={identificationDetails}
                  setLocalUpload={setLocalUpload}
                />

                {creationMode === CreationModeEnum.Single ? (
                  <div className='flex  justify-center relative  gap-1'>
                    <div className=' absolute right-3 -top-16'>
                      <SkipToForm onClick={() => setFormCreationStarted(true)} />
                    </div>
                    <Button
                      text='Proceed'
                      disabled={localUpload.length < 1 || !identificationDetails.identificationNumber || !identificationDetails.identificationType}
                      onClick={() => handleProceed()}
                    />
                  </div>
                ) : null}
              </section>
            </>
          ) : (
            <Form kind='new' formFields={''} />
          )}
        </div>
      </main>
    </>
  )
})

export default CustomerCreation
