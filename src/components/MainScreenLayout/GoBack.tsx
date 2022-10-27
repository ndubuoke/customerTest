import React, { memo } from 'react'
import { arrow, greaterThan } from '../../assets/svgs'

const GoBack = memo(() => {
  return (
    <div className='flex items-center gap-4'>
      <a href='#' className='h-3 w-4'>
        <img src={arrow} alt='Go back' width={16} height={12} />
      </a>
      <a href='#' className='text-base font-medium leading-4.5 text-text-nav-link whitespace-nowrap'>
        CONFIGURATION ENGINE
      </a>
      <div className='w-2 h-4'>
        <img src={greaterThan} width={7} height={14} />
      </div>
      <a href='#' className='text-base font-medium leading-4.5 text-text-nav-link  whitespace-nowrap'>
        FORMS CONFIGURATIONS
      </a>
      <div>
        <img src={greaterThan} />
      </div>
      <a href='#' className='text-base font-medium leading-4.5 text-text-nav-link  whitespace-nowrap'>
        CUSTOMER MANAGEMENT FORM SETUP
      </a>
    </div>
  )
})

export default GoBack
