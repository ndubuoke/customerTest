import React, { useState } from 'react'

type CheckboxType = {
  disabled?: boolean
  externalFunctionToDoSomething: () => void
  checked: boolean
  setChecked: (e) => void
}

const Checkbox = ({ disabled, externalFunctionToDoSomething, checked, setChecked }: CheckboxType) => {
  const checkTheBox = () => {
    setChecked(!checked)
    externalFunctionToDoSomething()
  }

  return (
    <div className='flex items-center '>
      <input
        type='checkbox'
        className={`w-4 rounded-sm h-4 cursor-pointer appearance-none border border-primay-main p-0.5 ${
          checked ? 'bg-primay-main' : 'bg-transparent'
        }  
      `}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        onClick={checkTheBox}
        strokeWidth='4'
        stroke='currentColor'
        className={`w-4 h-4 text-white  text-base absolute p-0.5  transition
        duration-500 ease-in-out transform cursor-pointer  ${checked ? 'opacity-100' : 'opacity-0'}  `}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
      </svg>
    </div>
  )
}

export default Checkbox
