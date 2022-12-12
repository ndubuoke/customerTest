import React from 'react'

type Props = {}

const FormDate = (props: Props) => {
  return (
    <div className='border-b'>
      <input type='date' className=' cursor-pointer bg-transparent border-none outline-none py-1 ' disabled />
    </div>
  )
}

export default FormDate
