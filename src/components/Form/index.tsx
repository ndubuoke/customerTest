import { AppAlert } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import { FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createColumnMapAction, getColumnMapAction, getPublishedFormSectionAction, activePageAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { getProperty, getVisibleProperty } from 'Utilities/getProperty'
import AdditionalDetails from './AdditionalInfo'
import Executives from './ExecutiveandDirector'
import { FormLayout, Steps } from './Form-UIs'
import ActionButtonsForForm from './Form-UIs/ActionButtonsForForm'
import { formStruture } from './formStructure'
import Signatories from './Signatory'
import { PageInstance } from './Types'
import RiskAssessment from './RiskAssesment'
import { info } from 'Assets/svgs'

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
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [notifyUserOfRequiredFields, setNotifyUserOfRequiredFields] = useState<boolean>(false)
    const [collapsedSection, setCollapsedSection] = useState<{ id: string; isCollapsed: boolean }[]>([])

    const getColumnMap = useSelector<ReducersType>((state: ReducersType) => state?.getColumnMap) as ResponseType

    console.log('pageIndex', pageIndex)

    useEffect(() => {
      console.log('publishedForm', publishedForm)
      if (publishedForm?.success && publishedForm?.serverResponse?.data) {
        const page = publishedForm?.serverResponse?.data.builtFormMetadata.pages[pageIndex]
        if (!page) {
          const index = publishedForm?.serverResponse?.data.builtFormMetadata.pages.length - 1
          const newPage: PageInstance = publishedForm?.serverResponse?.data.builtFormMetadata.pages[index]
          dispatch(activePageAction(newPage, index) as any)
          setActivePageState(newPage)
          setPageIndex(index)
        }
        // else {
        //          setCollapsedSection(() => {
        //     console.log('page.sections',page.sections)
        //     return page.sections.reduce((acc, curr, idx) => {
        //       acc[curr.id] = idx !== 0
        //       return acc
        //     }, {} as Record<string, boolean>)
        //   })
        // }
      }
    }, [publishedForm])

    useEffect(() => {
      if (activePageState) {
        setCollapsedSection(() => {
          console.log('activePageState.sections', activePageState.sections)
          return activePageState.sections.map((sect, idx) => {
            return {
              id: sect.id,
              isCollapsed: idx !== 0,
            }
          })
        })
      }
    }, [activePageState])

    console.log('collapsedSection', collapsedSection)
    // console.log('activePage', activePage)
    // console.log('activePageState', getProperty(activePageState?.pageProperties, 'Page name', 'value').text.toLowerCase())
    // console.log(
    //   'activePageState-bool',
    //   getProperty(activePageState?.pageProperties, 'Page name', 'value').text.toLowerCase().trim() === 'documentation'
    // )
    useEffect(() => {
      if (publishedForm?.success) {
        // publishedForm?.serverResponse?.data[0]
        setPublishedFormState(publishedForm)
        sessionStorage.setItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE, JSON.stringify(publishedForm))
        dispatch(getColumnMapAction(publishedForm?.serverResponse?.data?._id) as any)
      }
      // }
    }, [publishedForm])

    useEffect(() => {
      // console.log({ fillingFormState })
      // if (!fillingFormState.data?.formInfomation?.formId) {
      const fillingFormInStorage = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
        ? (JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)) as FormStructureType)
        : null

      if (fillingFormInStorage) {
        // console.log({ fillingFormInStorage })
        setFillingFormState(fillingFormInStorage)
      }
      // }
    }, [])

    // New implementation
    useEffect(() => {
      const newFillingFormInStorage = sessionStorage.getItem(STORAGE_NAMES.NEW_FILLING_FORM_IN_STORAGE)
        ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.NEW_FILLING_FORM_IN_STORAGE))
        : null

      if (newFillingFormInStorage) {
        setFillingFormState(newFillingFormInStorage)
      }
    }, [getColumnMap])

    useEffect(() => {
      console.log({ fillingFormState })

      if (fillingFormState?.data?.customerData?.length > 0) {
        sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormState))
      }
    }, [fillingFormState])

    // Populate backup state using what is in backup storage
    useEffect(() => {
      if (fillingFormState?.data?.customerData?.length === 0) {
        const backupInStorage = sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
          ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE))
          : null

        if (backupInStorage) {
          // console.log(backupInStorage)
          setBackupForSwitchFormState(backupInStorage)
        }
      }
    }, [fillingFormState, publishedFormState])

    useEffect(() => {
      // const backupInStorage = sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE)
      //   ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE))
      //   : null
      if (backupForSwitchFormState) {
        sessionStorage.setItem(STORAGE_NAMES.BACKUP_FOR_SWITCH_FORM_IN_STORAGE, JSON.stringify(backupForSwitchFormState))
      }
    }, [backupForSwitchFormState])

    return (
      <div className='flex flex-col justify-center max-w-[990px]  mx-auto pt-12'>
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
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
            {getProperty(activePageState?.pageProperties, 'Page name', 'value').text.toLowerCase().trim() === 'documentation' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  margin: '0.5rem 0',
                  color: '#636363',
                  alignItems: 'center',
                }}
              >
                <img src={info} alt='' height='16px' width='16px' />
                <span> Drag and Drop documents across the placeholders to rearrange documents</span>{' '}
              </div>
            )}
            <div
              className='h-[605px]  overflow-y-auto  bg-[rgba(170, 170, 170, 0.07)] flex flex-col'
              style={{
                maxWidth: '990px',
                margin: 'auto',
              }}
            >
              {activePageState?.sections?.length > 0
                ? activePageState?.sections?.map((sects, index) => {
                    return (
                      <div key={index}>
                        {getVisibleProperty(sects.formControlProperties) && (
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
                              // shouldCollapseByDefault={index !== 0}
                              isCollapsed={collapsedSection.find((collapsedSection) => collapsedSection.id === sects.id)?.isCollapsed}
                              setCollapsedSection={setCollapsedSection}
                            />
                            {customerType === 'sme' && activePage && activePage?.theIndex === 0 && index === activePageState?.sections?.length - 1 ? (
                              <Signatories key={'Signatories' + index} />
                            ) : null}
                            {customerType === 'sme' &&
                              activePage &&
                              index === activePageState?.sections?.length - 1 &&
                              getProperty(activePageState?.pageProperties, 'Page name', 'value').text.toLowerCase().trim() ===
                                'additional details' && <AdditionalDetails key='aditional' />}
                          </>
                        )}
                      </div>
                    )
                  })
                : null}
              {customerType === 'individual' && activePage && activePage?.page?.id === '1662112333552788291' ? (
                <RiskAssessment key='risk' fillingFormState={fillingFormState} />
              ) : null}
              {customerType === 'sme' && activePage && activePage?.page?.id === '16686080340726503201' ? <Executives key='executives' /> : null}

              {/* {customerType === 'sme' && activePage && activePage?.page?.id === '16691120330052585191' ? <AdditionalDetails key='aditional' /> : null} */}
              {/* {getProperty(activePageState?.pageProperties, 'Page name', 'value').text.toLowerCase().trim() === 'documentation' && <h1>HELLO DOCS</h1>} */}

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
          <ActionButtonsForForm
            setActivePageState={setActivePageState}
            activePageState={activePageState}
            fillingFormState={fillingFormState}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            customerType={customerType}
          />
        ) : null}
      </div>
    )
  }
)

export default Form
