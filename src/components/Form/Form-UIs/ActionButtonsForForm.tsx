import Button from 'Components/Shareables/Button'
import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { riskAssessmentType } from 'Redux/reducers/RiskAssessment.reducer'
import { Form, PageInstance } from '../Types'
import { findIndexOfObject } from 'Utilities/findIndexOfObject'
import { getProperty } from 'Utilities/getProperty'
import { camelize } from 'Utilities/convertStringToCamelCase'
import {
  activePageAction,
  setRequiredFormFieldsAction,
  showWaiverModalInFormAction,
  statusForCanProceedAction,
} from 'Redux/actions/FormManagement.actions'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { AnyAction } from 'redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import WaiverAlert from 'Components/ProcessSummary/WaiverAlert'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { isForm } from 'Screens/CustomerCreation'
import EDDAlert from 'Components/ProcessSummary/EddAlert'
import { CustomerTypeType } from 'Screens/ProcessSummary'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import { getColumnName } from 'Utilities/getColumnName'

export type RequiredFieldsType = {
  fieldLabel: string
  sectionId: string
  pageId: string
  formType: string
}

type Props = {
  setActivePageState: (val: PageInstance) => void
  activePageState: PageInstance
  fillingFormState: any
  pageIndex: number
  setPageIndex: (prev: React.SetStateAction<number>) => void
  customerType: CustomerTypeType
}

const highRiskScore = 90

const ActionButtonsForForm = ({ setActivePageState, activePageState, fillingFormState, pageIndex, setPageIndex, customerType }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState<Form>(null)
  const [submit, setSubmit] = useState<number>(1)
  const [showWaiverAlert, setShowWaiverAlert] = useState<boolean>(false)
  const [showEDDAlert, setShowEDDAlert] = useState<boolean>(false)
  // const [riskScore, setRiskScore] = useState<number>(90)
  const [flagCustomerStatus, setFlagCustomerStatus] = useState<boolean>(true)

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const getColumnMap = useSelector<ReducersType>((state: ReducersType) => state?.getColumnMap) as ResponseType

  const riskAssessment = useSelector<ReducersType>((state: ReducersType) => state?.riskAssessment) as riskAssessmentType

  console.log('riskAssessment', riskAssessment)

  const handleActivePage = (action: 'next' | 'prev') => {
    if (action === 'prev') {
      if (findIndexOfObject(form, activePageState?.id) === 0) {
        return
      } else {
        setPageIndex((prev) => prev - 1)
      }
    }

    if (action === 'next') {
      // console.log({ theObject: form?.builtFormMetadata?.pages[findIndexOfObject(form, activePageState?.id)] })
      if (findIndexOfObject(form, activePageState?.id) >= form?.builtFormMetadata?.pages?.length - 1) {
        return
      } else {
        setPageIndex((prev) => prev + 1)
      }
    }
  }

  const handleSubmit = () => {
    setSubmit((prev) => prev + 1)
    let _allFields = []
    form?.builtFormMetadata?.pages?.forEach((x) => {
      if (x?.sections?.length > 0) {
        x?.sections?.forEach((section) => {
          _allFields.push(section?.fields)
        })
      }
      if (x?.fields?.length > 0) {
        _allFields.push(x?.fields)
      }
    })

    const allFields = _allFields.flat(Infinity)

    if (allFields?.length > 0) {
      const _fieldLabelsOfRequiredFields = allFields
        ?.map((x) => {
          return getProperty(x?.formControlProperties, 'Set as Required', 'value').text.toLowerCase() === 'on'
            ? {
                // fieldLabel: camelize(replaceSpecialCharacters(getProperty(x?.formControlProperties, 'Field label', 'value').text)),
                fieldLabel: getColumnName({
                  columns: getColumnMap?.serverResponse?.data,
                  sectionId: x?.sectionId,
                  pageId: x?.pageId,
                  fieldId: x?.fieldId,
                  fieldName: camelize(replaceSpecialCharacters(getProperty(x?.formControlProperties, 'Field label', 'value').text)),
                }),
                sectionId: x?.sectionId,
                pageId: x?.pageId,
                formType: x?.name,
              }
            : null
        })
        .filter(Boolean)

      console.log('_fieldLabelsOfRequiredFields', { _fieldLabelsOfRequiredFields })

      const _fillingFormState = fillingFormState as FormStructureType
      console.log('_fillingFormState.data.customerData', _fillingFormState.data.customerData)
      const fieldLabelsOfNotFilledRequiredFields = [] as Array<RequiredFieldsType>

      _fieldLabelsOfRequiredFields.forEach((x) => {
        if (x.sectionId) {
          const sectionThatMatched = _fillingFormState.data.customerData.find((y) => y.sectionId === x.sectionId)

          // console.log('x.sectionId', { sectionThatMatched })

          if (!sectionThatMatched?.data[x.fieldLabel] || !sectionThatMatched?.data.hasOwnProperty(x.fieldLabel)) {
            fieldLabelsOfNotFilledRequiredFields.push(x)
          }
        }

        if (!x.sectionId && x.pageId) {
          const sectionThatMatched = _fillingFormState.data.customerData.find((y) => y.pageId === x.pageId)
          // console.log('!x.sectionId && x.pageId', { sectionThatMatched })
          if (!sectionThatMatched?.data[x.fieldLabel] || !sectionThatMatched?.data.hasOwnProperty(x.fieldLabel)) {
            fieldLabelsOfNotFilledRequiredFields.push(x)
          }
        }
      })

      dispatch(setRequiredFormFieldsAction(fieldLabelsOfNotFilledRequiredFields) as any)

      const checkIfUnfilledRequiredFieldsAreNotDocsOnly = fieldLabelsOfNotFilledRequiredFields.find(
        (x) => camelize(x.formType) !== camelize('File Upload')
      )
      // console.log({ fieldLabelsOfNotFilledRequiredFields })
      // console.log({ checkIfUnfilledRequiredFieldsAreNotDocsOnly })

      if (checkIfUnfilledRequiredFieldsAreNotDocsOnly) {
        // dispatch to prevent proceeding
        dispatch(statusForCanProceedAction(false) as any)
      } else {
        // console.log({ fieldLabelsOfNotFilledRequiredFields })
        if (fieldLabelsOfNotFilledRequiredFields.length === 0) {
          dispatch(showWaiverModalInFormAction('hide') as any)
          sessionStorage.setItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM, JSON.stringify('hide'))
          handleProceedToProcessSummary()
        } else {
          handleShowModal()
        }
      }
    }
  }

  // Handle show modal function
  const handleShowModal = () => {
    // dispatch show waiver
    sessionStorage.setItem(STORAGE_NAMES.SHOW_WAIVER_MODAL_IN_FORM, JSON.stringify('show'))
    // dispatch(showWaiverModalInFormAction('show') as any)
    setShowWaiverAlert((prev) => !prev)
  }

  // Handle show EDD modal function
  const handleShowEDDModal = () => {
    // dispatch show waiver
    sessionStorage.setItem(STORAGE_NAMES.SHOW_EDD_MODAL_IN_FORM, JSON.stringify('show'))
    // dispatch(showWaiverModalInFormAction('show') as any)
    setShowEDDAlert((prev) => !prev)
  }

  const handleDiscardEDDWaiver = () => {
    sessionStorage.setItem(STORAGE_NAMES.SHOW_EDD_MODAL_IN_FORM, JSON.stringify('hide'))
    setShowEDDAlert(false)
    handleActivePage('next')
  }

  const handleProceedToProcessSummary = () => {
    // Proceed to process summary
    dispatch(statusForCanProceedAction(true) as any)

    // console.log({ pathnmae: location.pathname, individi: AppRoutes.individualCustomerCreationScreen + '/' })

    // console.log({ pathName: location.pathname.replace(/[^a-zA-Z0-9 ]/g, '') })
    if (location.pathname.replace(/[^a-zA-Z0-9 ]/g, '') === AppRoutes.individualCustomerCreationScreen.replace(/[^a-zA-Z0-9 ]/g, '')) {
      navigate(AppRoutes.individualProcessSummary)
      return
    }
    if (location.pathname.replace(/[^a-zA-Z0-9 ]/g, '') === AppRoutes.SMECustomerCreationScreen.replace(/[^a-zA-Z0-9 ]/g, '')) {
      navigate(AppRoutes.SMEProcessSummary)
      return
    }
  }

  const handleProceedEDD = () => {
    handleActivePage('next')
    setShowEDDAlert(false)
  }

  const handleNextAndOtherAddOns = () => {
    if (findIndexOfObject(form, activePageState?.id) === form?.builtFormMetadata?.pages?.length - 1) {
      handleSubmit()
    } else {
      if (customerType === 'sme' && flagCustomerStatus) {
        if (
          getProperty(form?.builtFormMetadata?.pages[findIndexOfObject(form, activePageState?.id)].pageProperties, 'Page name').text.toLowerCase() ===
          'account services'
        ) {
          if (riskAssessment.score >= highRiskScore) {
            handleShowEDDModal()
          }
        } else {
          handleActivePage('next')
        }
      } else {
        handleActivePage('next')
      }
    }
  }

  useEffect(() => {
    if (publishedForm?.success) {
      setForm(publishedForm?.serverResponse?.data)
    }
  }, [publishedForm])

  useEffect(() => {
    if (publishedForm) {
      const page = publishedForm?.serverResponse?.data?.builtFormMetadata?.pages[pageIndex]
      dispatch(activePageAction(page, pageIndex) as any)
      setActivePageState(page)
    }
  }, [publishedForm, pageIndex])

  // Handle RequiredFields

  return (
    <div className='flex justify-between gap-6 p-4'>
      <div>
        <Button disabled={findIndexOfObject(form, activePageState?.id) === 0} onClick={() => handleActivePage('prev')} text='Previous' />
      </div>
      <div className='flex gap-3'>
        <Button disabled={true} onClick={() => console.log('test saved to draft')} text='Save to draft' />
        <Button
          disabled={false}
          onClick={handleNextAndOtherAddOns}
          text={findIndexOfObject(form, activePageState?.id) === form?.builtFormMetadata?.pages?.length - 1 ? 'Proceed' : 'Next'}
        />
      </div>

      {showWaiverAlert ? <WaiverAlert closeModalFunction={handleShowModal} proceedToProcessSummary={handleProceedToProcessSummary} /> : null}
      {showEDDAlert ? <EDDAlert closeModalFunction={handleDiscardEDDWaiver} proceedToProcessSummary={handleProceedEDD} /> : null}
    </div>
  )
}

export default ActionButtonsForForm
