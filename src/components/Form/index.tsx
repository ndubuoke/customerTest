import { AppAlert } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import { FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishedFormSectionAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { getProperty } from 'Utilities/getProperty'
import { FormLayout, Steps } from './Form-UIs'
import { formStruture } from './formStructure'
import { PageInstance } from './Types'

type Props = {
  kind: 'new' | 'modification'
  formFields: any
}

const Form = ({ kind, formFields }: Props) => {
  const dispatch = useDispatch()

  const [fillingFormState, setFillingFormState] = useState<FormStructureType>(formStruture)

  const [activeFormSections, setActiveFormSections] = useState<any>([])
  const [publishedFormState, setPublishedFormState] = useState<ResponseType>(null)

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const [activePageState, setActivePageState] = useState<PageInstance>(null)

  useEffect(() => {
    // const publishedFormInStorage = sessionStorage.getItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)
    //   ? (JSON.parse(sessionStorage.getItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE)) as ResponseType)
    //   : null
    // if (publishedFormInStorage) {
    //   setPublishedFormState(publishedFormInStorage)
    // } else {
    if (publishedForm?.success) {
      dispatch(getPublishedFormSectionAction(publishedForm?.serverResponse?.data?._id) as any)
      setPublishedFormState(publishedForm)
      sessionStorage.setItem(STORAGE_NAMES.PUBLISHED_FORM_IN_STORAGE, JSON.stringify(publishedForm))
    }
    // }
  }, [publishedForm])

  useEffect(() => {
    if (!fillingFormState.data?.formInfomation?.formId) {
      const fillingFormInStorage = sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)
        ? (JSON.parse(sessionStorage.getItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE)) as FormStructureType)
        : null

      if (fillingFormInStorage) {
        setFillingFormState(fillingFormInStorage)
      }
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(STORAGE_NAMES.FILLING_FORM_IN_STORAGE, JSON.stringify(fillingFormState))
  }, [fillingFormState])

  return (
    <div className='flex flex-col justify-center max-w-[1060px] mx-auto pt-12'>
      {publishedFormState?.serverError?.status ? <AppAlert alertType='error' message={publishedFormState?.serverError?.error?.message} /> : null}
      {publishedForm?.loading ? (
        <div className='w-full min-h-[300px] flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      ) : null}

      {publishedFormState?.serverResponse?.status ? (
        <form>
          <Steps setActivePageState={setActivePageState} />
          <div className='h-[605px]  overflow-y-auto  bg-[rgba(170, 170, 170, 0.07)] flex flex-col'>
            {activePageState?.sections?.length > 0
              ? activePageState?.sections?.map((sects) => {
                  return (
                    <FormLayout
                      isSection={true}
                      item={sects}
                      fields={sects.fields}
                      key={sects.id}
                      setFillingFormState={setFillingFormState}
                      publishedFormState={publishedFormState}
                      fillingFormState={fillingFormState}
                    />
                  )
                })
              : null}

            {activePageState?.fields?.length > 0 && (
              <FormLayout
                isSection={false}
                item={activePageState}
                fields={activePageState?.fields}
                key={activePageState?.id}
                setFillingFormState={setFillingFormState}
                publishedFormState={publishedFormState}
                fillingFormState={fillingFormState}
              />
            )}
          </div>
        </form>
      ) : null}
    </div>
  )
}

export default Form
