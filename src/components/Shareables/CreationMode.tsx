import { CreationModeType } from 'Screens/CustomerCreation'
import RadioButton from './RadioButton'

type Props = {
  mode: CreationModeType
  setCreationMode: (mode: CreationModeType) => void
}

const CreationMode = ({ mode, setCreationMode }: Props) => {
  return (
    <div className='flex justify-center gap-16 text-[#636363] mt-12'>
      <div className='flex justify-center items-center gap-x-[.625rem] text-[#636363] '>
        Creation Mode
        <svg className='w-4 h-4 ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
      </div>

      <RadioButton text='single' setValue={setCreationMode} checked={mode === 'single'} trackingName='creation mode' />
      <RadioButton text='bulk' setValue={setCreationMode} checked={mode === 'bulk'} trackingName='creation mode' />
    </div>
  )
}

export default CreationMode
