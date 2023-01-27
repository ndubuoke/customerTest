import { greaterThanRed, returnIcon, Success } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'

type Props = {}

const FormSubmissionLoader = ({}: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[7.5rem] max-w-[7.5rem] min-h-[7.5rem] h-[7.5rem] rounded-[.5rem] flex flex-col gap-2 justify-center items-center text-[#636363]'>
        <Spinner size='large' />
        <p>Submitting...</p>
      </section>
    </aside>
  )
}

export default FormSubmissionLoader
