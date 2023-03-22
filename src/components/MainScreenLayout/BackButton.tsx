import { arrow } from 'Assets/svgs'
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes/AppRoutes'

export type BackButtonType = {
  text: string
  link: string
}


const BackButton = memo(({ text, link }: BackButtonType) => {
  return (
    <Link to={link} className='inline-block justify-center gap-4'>
      <div className='flex gap-3'>
          <img src={arrow} title='Go back' />
          {text && <span className='text-base leading-8 text-[#636363]'>{text}</span>}
      </div>
    </Link>
  )
})

export default BackButton
