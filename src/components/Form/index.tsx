import Spinner from 'Components/Shareables/Spinner'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { getProperty } from 'Utilities/getProperty'
import { Section, Steps } from './Form-UIs'
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
      {publishedForm?.loading ? (
        <div className='w-full min-h-[300px] flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      ) : (
        <>
          <Steps setActivePageState={setActivePageState} />
          <div className='min-h-[605px] border border-green-500'>
            <h1>Current page is {getProperty(activePageState?.pageProperties, 'Page name', 'value').text}</h1>
          </div>
        </>
      )}
    </div>
  )
}

export default Form
