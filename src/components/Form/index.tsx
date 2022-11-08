import React from 'react'
import { Section, Steps } from './Form-UIs'

type Props = {
  kind: 'new' | 'modification'
  formFields: any
}

const Form = ({ kind, formFields }: Props) => {
  return (
    <div className='flex flex-col justify-center max-w-[1060px] mx-auto pt-12'>
      <Steps />
      <div className='min-h-[605px] border border-green-500'>
        <Section />
      </div>
    </div>
  )
}

export default Form
