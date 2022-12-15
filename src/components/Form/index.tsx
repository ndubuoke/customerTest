import { AppAlert } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import { FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishedFormSectionAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { getProperty } from 'Utilities/getProperty'
import AdditionalDetails from './AdditionalInfo'
import Executives from './ExecutiveandDirector'
import { FormLayout, Steps } from './Form-UIs'
import ActionButtonsForForm from './Form-UIs/ActionButtonsForForm'
import { formStruture } from './formStructure'
import Signatories from './Signatory'
import { PageInstance } from './Types'

type Props = {
  kind: 'new' | 'modification'
  customerType: 'sme' | 'individual'
  formFields: any
  fillingFormState: FormStructureType
  setFillingFormState: any
  publishedFormState: any // ResponseType;
  setPublishedFormState: any
  backupForSwitchFormState: {}
  setBackupForSwitchFormState: (value: any) => any
}

const Form = memo(
  ({
    kind,
    customerType,
    formFields,
    fillingFormState,
    publishedFormState,
    setFillingFormState,
    setPublishedFormState,
    backupForSwitchFormState,
    setBackupForSwitchFormState,
  }: Props) => {
    const dispatch = useDispatch()

    const [activeFormSections, setActiveFormSections] = useState<any>([])

    const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType
    const activePage = useSelector<ReducersType>((state: ReducersType) => state?.activePage) as { page: any; theIndex: number }

    const [activePageState, setActivePageState] = useState<PageInstance>(null)
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [canNext, setCanNext] = useState<boolean>(false)
    const [notifyUserOfRequiredFields, setNotifyUserOfRequiredFields] = useState<boolean>(false)

    useEffect(() => {
      if (publishedForm?.success) {
        // publishedForm?.serverResponse?.data[0]
        setPublishedFormState(publishedForm)
        sessionStorage.setItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE, JSON.stringify(publishedForm))
      }
      // }
    }, [publishedForm])

    useEffect(() => {
      // console.log({ fillingFormState })
      if (!fillingFormState.data?.formInfomation?.formId) {
        const fillingFormInStorage = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
          ? (JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)) as FormStructureType)
          : null

        if (fillingFormInStorage) {
          // console.log({ fillingFormInStorage })
          setFillingFormState(fillingFormInStorage)
        }
      }
    }, [])

    useEffect(() => {
      // console.log({ fillingFormState })

      if (fillingFormState?.data?.customerData?.length > 0) {
        sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormState))
      }
    }, [fillingFormState])

    useEffect(() => {
      // const backupInStorage = sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
      //   ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE))
      //   : null
      if (backupForSwitchFormState) {
        sessionStorage.setItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE, JSON.stringify(backupForSwitchFormState))
      }
    }, [backupForSwitchFormState])

    useEffect(() => {
      if (fillingFormState?.data?.customerData?.length === 0) {
        const backupInStorage = sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
          ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE))
          : null

        if (backupInStorage) {
          setBackupForSwitchFormState(backupInStorage)
        }
      }
    }, [fillingFormState, publishedFormState])

    return (
      <div className='flex flex-col justify-center max-w-[1060px] mx-auto pt-12'>
        {publishedFormState?.serverError?.status ? <AppAlert alertType='error' message={publishedFormState?.serverError?.error?.message} /> : null}
        {publishedForm?.loading ? (
          <div className='w-full min-h-[300px] flex items-center justify-center'>
            <Spinner size='large' />
          </div>
        ) : null}

        {publishedFormState?.serverResponse?.status ? (
          <div>
            <Steps
              customerType={customerType}
              setActivePageState={setActivePageState}
              activePageState={activePageState}
              canSubmit={canSubmit}
              setCanSubmit={setCanSubmit}
              canNext={canNext}
              setCanNext={setCanNext}
            />
            <div className='h-[605px]  overflow-y-auto  bg-[rgba(170, 170, 170, 0.07)] flex flex-col'>
              {activePageState?.sections?.length > 0
                ? activePageState?.sections?.map((sects, index) => {
                    return (
                      <>
                        <FormLayout
                          isSection={true}
                          item={sects}
                          fields={sects.fields}
                          key={sects.id}
                          setFillingFormState={setFillingFormState}
                          publishedFormState={publishedFormState}
                          fillingFormState={fillingFormState}
                          setBackupForSwitchFormState={setBackupForSwitchFormState}
                          backupForSwitchFormState={backupForSwitchFormState}
                        />
                        {activePage && activePage?.theIndex === 0 && index === activePageState?.sections?.length - 1 ? <Signatories /> : null}
                      </>
                    )
                  })
                : null}
              {activePage && activePage?.theIndex === 2 ? <Executives /> : null}
              {activePage && activePage?.theIndex === 3 ? <AdditionalDetails /> : null}
              {activePageState?.fields?.length > 0 && (
                <FormLayout
                  isSection={false}
                  item={activePageState}
                  fields={activePageState?.fields}
                  key={activePageState?.id}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                  setBackupForSwitchFormState={setBackupForSwitchFormState}
                  backupForSwitchFormState={backupForSwitchFormState}
                />
              )}
            </div>
          </div>
        ) : null}

        {publishedFormState?.serverResponse?.status ? (
          <ActionButtonsForForm setActivePageState={setActivePageState} activePageState={activePageState} fillingFormState={fillingFormState} />
        ) : null}
      </div>
    )
  }
)

export default Form
