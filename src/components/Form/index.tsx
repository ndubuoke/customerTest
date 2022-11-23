import { AppAlert } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishedFormSectionAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { getProperty } from 'Utilities/getProperty'
import { FormLayout, Steps } from './Form-UIs'
import { PageInstance } from './Types'

type Props = {
  kind: 'new' | 'modification'
  formFields: any
}

const Form = ({ kind, formFields }: Props) => {
  const dispatch = useDispatch()
  const [activeFormSections, setActiveFormSections] = useState<any>([])

  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const [activePageState, setActivePageState] = useState<PageInstance>(null)

  useEffect(() => {
    const activeFormSectionInStorage = sessionStorage.getItem(STORAGE_NAMES.ACTIVE_FORM_SECTION)
    if (activeFormSectionInStorage) {
      setActiveFormSections(activeFormSectionInStorage)
    } else {
      if (publishedForm?.success) {
        dispatch(getPublishedFormSectionAction(publishedForm?.serverResponse?.data?._id) as any)
      }
    }
  }, [publishedForm])

  return (
    <div className='flex flex-col justify-center max-w-[1060px] mx-auto pt-12'>
      {publishedForm?.serverError?.status ? <AppAlert alertType='error' message={publishedForm?.serverError?.error?.message} /> : null}
      {publishedForm?.loading ? (
        <div className='w-full min-h-[300px] flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      ) : null}

      {publishedForm?.serverResponse?.status ? (
        <div>
          <Steps setActivePageState={setActivePageState} />
          <div className='h-[605px]  overflow-y-auto  bg-[rgba(170, 170, 170, 0.07)] flex flex-col'>
            {activePageState?.sections?.length > 0
              ? activePageState?.sections?.map((sects) => {
                  return <FormLayout isSection={true} item={sects} fields={sects.fields} key={sects.id} />
                })
              : null}

            {activePageState?.fields?.length > 0 && (
              <FormLayout isSection={false} item={activePageState} fields={activePageState?.fields} key={activePageState?.id} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Form
