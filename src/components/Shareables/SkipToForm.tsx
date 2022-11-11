import React from 'react'
import { skip, info } from 'Assets/svgs'

type Props = {
  onClick: () => void
}

const SkipToForm = ({ onClick }: Props) => {
  return (
    <div className='flex flex-col gap-3' onClick={onClick}>
      <p className='flex gap-2'>
        <img src={info} /> <span>To skip both options, click "Skip to form"</span>
      </p>
      <button className='flex justify-end items-center gap-2'>
        Skip to form
        <img src={skip} />
      </button>
    </div>
  )
}

export default SkipToForm
