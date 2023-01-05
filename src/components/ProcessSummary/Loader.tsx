import { greaterThanRed, returnIcon, Success } from 'Assets/svgs'
import Spinner from 'Components/Shareables/Spinner'
import React from 'react'

type Props = {}

const FormSubmissionLoader = ({}: Props) => {
  return (
    <aside
      className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center '
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
      }}
    >
      <section className='bg-white min-w-[120px] max-w-[120px] min-h-[120px] h-[120px] rounded-[8px] flex flex-col gap-2 justify-center items-center text-[#636363]'>
        <Spinner size='large' />
        <p>Submitting...</p>
      </section>
    </aside>
  )
}

export default FormSubmissionLoader
