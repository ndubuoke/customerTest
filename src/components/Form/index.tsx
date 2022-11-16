import { AppAlert } from 'Components/Shareables'
import Spinner from 'Components/Shareables/Spinner'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { getProperty } from 'Utilities/getProperty'
import { FormLayout, Steps } from './Form-UIs'
import { PageInstance } from './Types'

type Props = {
  kind: 'new' | 'modification'
  formFields: any
}

const Form = ({ kind, formFields }: Props) => {
  const publishedForm = useSelector<ReducersType>((state: ReducersType) => state?.publishedForm) as ResponseType

  const [activePageState, setActivePageState] = useState<PageInstance>(null)

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
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Form
