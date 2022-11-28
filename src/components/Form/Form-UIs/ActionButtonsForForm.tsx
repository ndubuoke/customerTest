import Button from 'Components/Shareables/Button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { Form, PageInstance } from '../Types'
import { findIndexOfObject } from 'Utilities/findIndexOfObject'
import { getProperty } from 'Utilities/getProperty'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { FormStructureType } from 'Components/types/FormStructure.types'

type Props = {
  setActivePageState: (val: PageInstance) => void
  activePageState: PageInstance
  fillingFormState: any
}

const ActionButtonsForForm = ({ setActivePageState, activePageState, fillingFormState }: Props) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState<Form>(null)
  const [index, setIndex] = useState<number>(0)

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
    let _requiredFields = []
    form?.builtFormMetadata?.pages?.forEach((x) => {
      if (x?.sections?.length > 0) {
        x?.sections?.forEach((section) => {
          _requiredFields.push(section?.fields)
        })

        if (x?.fields?.length > 0) {
          _requiredFields.push(x?.fields)
        }
      }
    })

    const requiredFields = _requiredFields.flat(Infinity)

    if (requiredFields?.length > 0) {
      const _fieldLabelsOfRequiredFields = requiredFields
        ?.map((x) => {
          return getProperty(x?.formControlProperties, 'Set as Required', 'value').text.toLowerCase() === 'on'
            ? { fieldLabel: camelize(getProperty(x?.formControlProperties, 'Field label', 'value').text), sectionId: x?.sectionId, pageId: x?.pageId }
            : null
        })
        .filter(Boolean)

      // const _fillingFormState

      const fieldLabelsOfRequiredFields = _fieldLabelsOfRequiredFields?.filter((x) => {
        const _fillingFormState = fillingFormState as FormStructureType

        // console.log(_fillingFormState?.data?.customerData?.find((customer) => customer?.sectionId === x?.sectionId))

        //  _fillingFormState?.data?.customerData?.find((customer) => {
        //       if (x?.sectionId === customer?.sectionId && !customer?.data.hasOwnProperty(x.fieldLabel)) {
        //         return x
        //       }
        //     })
      })

      //   console.log(first)

      //   dispatch(setRequiredFormFieldsAction(fieldLabelsOfRequiredFields) as any)
    }
  }

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
    </div>
  )
}

export default ActionButtonsForForm
