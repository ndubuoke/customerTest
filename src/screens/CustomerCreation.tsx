import { useState, useCallback, useEffect, memo } from 'react'
import GoBack from 'Components/MainScreenLayout/GoBack'
import {
  individualCustomerCreationData,
  individualCustomerModificationData,
  smeCustomerCreationData,
  smeCustomerModificationData,
} from '../data/customerCreationBreadcrumbs'
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
import { useDispatch, useSelector } from 'react-redux'
import { getFormAction } from 'Redux/actions/FormManagement.actions'
import { validateCustomerAction, validateCustomerResultModalAction } from 'Redux/actions/ValidateCustomer.actions'
import { capitalizeFirstLetter } from 'Utilities/capitalizeFirstLetter'
import { API } from 'Utilities/api'
import ExtractInfoModal from 'Components/Shareables/ExtractInfoModal'
import { validateCustomerResponseType } from 'Redux/reducers/ValidateCustomer.reducer'
import { ReducersType } from 'Redux/store'
import { formStruture } from 'Components/Form/formStructure'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { useLocation, useNavigate } from 'react-router-dom'
import { info } from 'Assets/svgs'
import GraceFormModal from 'Components/Shareables/gracemodal'

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

export const isForm = '/?isForm=true'

const CustomerCreation = memo(({ customerType }: Props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const formModeStatusInStorage = sessionStorage.getItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_FORM_MODE_STATUS)
    ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.CUSTOMER_MANAGEMENT_FORM_MODE_STATUS))
    : null

  const headerText =
    customerType === 'individual'
      ? formModeStatusInStorage === 'creation'
        ? 'INDIVIDUAL CUSTOMER CREATION'
        : 'INDIVIDUAL CUSTOMER MODIFICATION'
      : formModeStatusInStorage === 'creation'
      ? 'SME CUSTOMER CREATION'
      : 'SME CUSTOMER MODIFICATION'
  const {
    loading,
    showResultModal,
    serverResponse: { data },
  } = useSelector<ReducersType>((state) => state.validateCustomer) as validateCustomerResponseType
  const [formMode, setFormMode] = useState<FormModeType>('accelerated')
  const [creationMode, setCreationMode] = useState<CreationModeType>(CreationModeEnum.Single)
  const [identificationDetails, setIdentificationDetails] = useState<IdentificationDetailsType>({
    identificationType: null,
    identificationNumber: null,
    identityData: null,
  })
  const [localUpload, setLocalUpload] = useState<Array<UploadFile>>([])
  // changing state to identification type and file upload(formCreationstarted)
  const [formCreationStarted, setFormCreationStarted] = useState<boolean>(false)

  const [fillingFormState, setFillingFormState] = useState<FormStructureType>(() => JSON.parse(JSON.stringify(formStruture)))
  const [newFillingFormState, setNewFillingFormState] = useState<any>(null)
  console.log('formStruture', formStruture)
  const [publishedFormState, setPublishedFormState] = useState<ResponseType>(null)
  const [backupForSwitchFormState, setBackupForSwitchFormState] = useState<{}>(null)
  const [showGraceModal, setShowGraceModal] = useState(false)
  const { serverResponse } = useSelector<ReducersType>((state) => state.validateCustomer) as validateCustomerResponseType
  const getColumnMap = useSelector<ReducersType>((state: ReducersType) => state?.getColumnMap) as ResponseType

  const handleModalDisplay = (isVisible: boolean) => {
    dispatch(validateCustomerResultModalAction(isVisible) as any)
  }

  const onSetFormMode = useCallback(
    (value) => {
      setFormMode(value)
      setCreationMode(CreationModeEnum.Single)
    },
    [formMode, creationMode]
  )

  const handleProceed = async () => {
    sessionStorage.removeItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    sessionStorage.removeItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
    if (localUpload.length) {
      const extractedData = localUpload.map((upload) => ({
        documentType: upload.verificationData.docType,
        data: upload.verificationData.extractedData,
      }))
      dispatch(validateCustomerAction(identificationDetails.identificationType, extractedData, identificationDetails.identityData) as any)
    } else {
      setFormCreationStarted(true)
    }
  }

  useEffect(() => {
    if (formCreationStarted) {
      console.log('identificationDetails', identificationDetails)
      if (identificationDetails.identityData) {
        setBackupForSwitchFormState({ ...identificationDetails.identityData, bVN: identificationDetails.identityData.idNumber || '' })
      }
      dispatch(getFormAction(customerType + capitalizeFirstLetter(formMode)) as any)
    }
  }, [formCreationStarted])

  // Handle automatic redirect when trying to view the form from process summary
  useEffect(() => {
    const search = location.search
    if (search === isForm.replace('/', '')) {
      setFormCreationStarted(true)
    }
  }, [location])

  // Cancel form creation because user requested for it

  useEffect(() => {
    const clearFormStatus = sessionStorage.getItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS)
      ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS))
      : null

    if (clearFormStatus) {
      setBackupForSwitchFormState(null)
      setFillingFormState(formStruture)

      setPublishedFormState(null)
      sessionStorage.removeItem(STORAGE_NAMES.STOP_FORM_FILLING_STATUS)
    }
  }, [])

  // Change the value of form form mode using the storage

  useEffect(() => {
    const formModeStatus = sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS)
      ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FORM_MODE_STATUS))
      : null

    if (formModeStatus === 'modification') {
      setFormMode('legacy')
      setFormCreationStarted(true)
    }
  }, [])

  useEffect(() => {
    API.get(`/interim-approval-config/type/${customerType}`).then((data) => {
      console.log('data-/interim-approval-config', data)
      if (!data.data?.data?.gracePeriod) {
        setShowGraceModal(true)
      }
    })
  }, [])

  return (
    <>
      <nav style={{ background: '#fff' }}>
        <GoBack
          headerText={headerText}
          breadCrumbsList={
            customerType === 'individual'
              ? formModeStatusInStorage === 'creation'
                ? individualCustomerCreationData
                : individualCustomerModificationData
              : formModeStatusInStorage === 'creation'
              ? smeCustomerCreationData
              : smeCustomerModificationData
          }
        />
      </nav>
      <main className='relative flex flex-col h-full mx-auto p-[15px] min-h-50 '>
        <div className={`${formCreationStarted ? '' : 'h-[825px]'} min-h-[800px] bg-white rounded-lg border border-[#E5E9EB] relative`}>
          {formModeStatusInStorage === 'creation' ? (
            <SwitchToFormType
              customerType={customerType}
              formCreationStarted={formCreationStarted}
              mode={formMode}
              onSetFormMode={onSetFormMode}
              fillingFormState={fillingFormState}
              setFillingFormState={setFillingFormState}
              setPublishedFormState={setPublishedFormState}
            />
          ) : null}
          {showGraceModal && (
            <GraceFormModal
              customerType={customerType}
              formCreationStarted={formCreationStarted}
              mode={formMode}
              onSetFormMode={onSetFormMode}
              fillingFormState={fillingFormState}
              setFillingFormState={setFillingFormState}
              setPublishedFormState={setPublishedFormState}
              closeModalFunction={() => setShowGraceModal(false)}
            />
          )}
          {!formCreationStarted ? (
            <>
              {loading && <ExtractInfoModal />}
              {showResultModal && <MatchModal setShowMatchModal={handleModalDisplay} setFormCreationStarted={setFormCreationStarted} data={data} />}
              <WizardChanger formMode={formMode} creationMode={creationMode} customerType={customerType} />
              {customerType === 'individual' && formMode === 'accelerated' ? (
                <CreationMode mode={creationMode} setCreationMode={setCreationMode} />
              ) : null}
              <section
                className='flex flex-col   h-[70%]'
                style={{
                  padding: '0 2rem 0',
                }}
              >
                <CustomerCreationBox
                  creationMode={creationMode}
                  customerType={customerType}
                  setIdentificationDetails={setIdentificationDetails}
                  identificationDetails={identificationDetails}
                  setLocalUpload={setLocalUpload}
                />

                {creationMode === CreationModeEnum.Single ? (
                  <div className='relative flex justify-center gap-1 mt-24'>
                    <div className='absolute right-3 top-1'>
                      <SkipToForm
                        onClick={() => {
                          setFormCreationStarted(true)
                          // navigate(location.pathname + isForm)
                          sessionStorage.setItem(STORAGE_NAMES.FORM_MODE_STATUS, JSON.stringify('creation'))
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                      <Button
                        text='Proceed'
                        disabled={!identificationDetails.identificationNumber || !identificationDetails.identificationType}
                        onClick={() => handleProceed()}
                      />
                    </div>
                  </div>
                ) : null}
              </section>
            </>
          ) : (
            <>
              <Form
                // SME SHOW ONLY EXECUTIVE CHECK
                customerType={customerType}
                kind='new'
                formFields={''}
                setFillingFormState={setFillingFormState}
                setPublishedFormState={setPublishedFormState}
                fillingFormState={fillingFormState}
                publishedFormState={publishedFormState}
                setBackupForSwitchFormState={setBackupForSwitchFormState}
                backupForSwitchFormState={backupForSwitchFormState}
              />
            </>
          )}
        </div>
      </main>
    </>
  )
})

export default CustomerCreation
