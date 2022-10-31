import React from 'react'
import { CreationModeType } from 'Screens/CustomerCreation'
import RadioButton from './RadioButton'

type Props = {
  mode: CreationModeType
  setCreationMode: (mode: CreationModeType) => void
}

const CreationMode = ({ mode, setCreationMode }: Props) => {
  return (
    <div className='flex justify-center gap-16 text-[#636363] border mt-12'>
      <div className='text-[#636363]'>Creation Mode</div>

      <RadioButton text='single' setValue={setCreationMode} checked={mode === 'single'} trackingName='creation mode' />
      <RadioButton text='bulk' setValue={setCreationMode} checked={mode === 'bulk'} trackingName='creation mode' />
    </div>
  )
}

export default CreationMode
