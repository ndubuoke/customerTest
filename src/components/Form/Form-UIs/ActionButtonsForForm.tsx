import Button from 'Components/Shareables/Button'
import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { Form, PageInstance } from '../Types'
import { findIndexOfObject } from 'Utilities/findIndexOfObject'
import { getProperty } from 'Utilities/getProperty'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { setRequiredFormFieldsAction, showWaiverModalInFormAction, statusForCanProceedAction } from 'Redux/actions/FormManagement.actions'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { AnyAction } from 'redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'Routes/AppRoutes'
import WaiverAlert from 'Components/ProcessSummary/WaiverAlert'

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
}

const ActionButtonsForForm = ({ setActivePageState, activePageState, fillingFormState }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState<Form>(null)
  const [index, setIndex] = useState<number>(0)
  const [submit, setSubmit] = useState<number>(1)
  const [showWaiverAlert, setShowWaiverAlert] = useState<boolean>(false)

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const handleActivePage = (action: 'next' | 'prev') => {
    if (action === 'prev') {
      if (findIndexOfObject(form, activePageState?.id) === 0) {
        return
      } else {
        setIndex((prev) => prev - 1)
      }
    }

    if (action === 'next') {
      if (findIndexOfObject(form, activePageState?.id) === form?.builtFormMetadata?.pages?.length - 1) {
        return
      } else {
        setIndex((prev) => prev + 1)
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
                fieldLabel: camelize(getProperty(x?.formControlProperties, 'Field label', 'value').text),
                sectionId: x?.sectionId,
                pageId: x?.pageId,
                formType: x?.name,
              }
            : null
        })
        .filter(Boolean)

      // console.log({ _fieldLabelsOfRequiredFields })

      const _fillingFormState = fillingFormState as FormStructureType

      const fieldLabelsOfNotFilledRequiredFields = [] as Array<RequiredFieldsType>

      _fieldLabelsOfRequiredFields.forEach((x) => {
        if (x.sectionId) {
          const sectionThatMatched = _fillingFormState.data.customerData.find((y) => y.sectionId === x.sectionId)

          console.log({ sectionThatMatched })

          if (!sectionThatMatched?.data[x.fieldLabel] || !sectionThatMatched?.data.hasOwnProperty(x.fieldLabel)) {
            fieldLabelsOfNotFilledRequiredFields.push(x)
          }
        }

        if (!x.sectionId && x.pageId) {
          const sectionThatMatched = _fillingFormState.data.customerData.find((y) => y.pageId === x.pageId)

          if (!sectionThatMatched?.data[x.fieldLabel] || !sectionThatMatched?.data.hasOwnProperty(x.fieldLabel)) {
            fieldLabelsOfNotFilledRequiredFields.push(x)
          }
        }
      })

      dispatch(setRequiredFormFieldsAction(fieldLabelsOfNotFilledRequiredFields) as any)

      console.log({ fieldLabelsOfNotFilledRequiredFields })

      const checkIfUnfilledRequiredFieldsAreNotDocsOnly = fieldLabelsOfNotFilledRequiredFields.find(
        (x) => camelize(x.formType) !== camelize('File Upload')
      )

      // console.log({ checkIfUnfilledRequiredFieldsAreNotDocsOnly })

      if (checkIfUnfilledRequiredFieldsAreNotDocsOnly) {
        // dispatch to prevent proceeding
        dispatch(statusForCanProceedAction(false) as any)
      } else {
        // console.log({ fieldLabelsOfNotFilledRequiredFields })
        if (fieldLabelsOfNotFilledRequiredFields.length === 0) {
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
    dispatch(showWaiverModalInFormAction('show') as any)

    setShowWaiverAlert((prev) => !prev)
  }

  const handleProceedToProcessSummary = () => {
    // Proceed to process summary
    dispatch(statusForCanProceedAction(true) as any)
    if (location.pathname === AppRoutes.individualCustomerCreationScreen) {
      navigate(AppRoutes.individualProcessSummary)
      return
    }
    if (location.pathname === AppRoutes.SMECustomerCreationScreen) {
      navigate(AppRoutes.SMEProcessSummary)
      return
    }
  }

  // const fieldLabelsOfRequiredFields = _fieldLabelsOfRequiredFields.filter(x => !_fillingFormState.data.customerData.some(y => y.data. === x.));
  useEffect(() => {
    if (publishedForm?.success) {
      setForm(publishedForm?.serverResponse?.data)
    }
  }, [publishedForm])

  useEffect(() => {
    if (publishedForm) {
      setActivePageState(publishedForm?.serverResponse?.data?.builtFormMetadata?.pages[index])
    }
  }, [publishedForm, index])

  // Handle RequiredFields

  return (
    <div className='flex justify-center gap-6 py-4'>
      <Button disabled={findIndexOfObject(form, activePageState?.id) === 0} onClick={() => handleActivePage('prev')} text='Previous' />
      <Button disabled={false} onClick={() => console.log('Clicked 2')} text='Save to draft' />
      <Button
        disabled={false}
        onClick={() =>
          findIndexOfObject(form, activePageState?.id) === form?.builtFormMetadata?.pages?.length - 1 ? handleSubmit() : handleActivePage('next')
        }
        text={findIndexOfObject(form, activePageState?.id) === form?.builtFormMetadata?.pages?.length - 1 ? 'Proceed' : 'Next'}
      />
      {showWaiverAlert ? <WaiverAlert closeModalFunction={handleShowModal} proceedToProcessSummary={handleProceedToProcessSummary} /> : null}
    </div>
  )
}

export default ActionButtonsForForm
