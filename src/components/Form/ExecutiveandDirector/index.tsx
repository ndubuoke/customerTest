import { add, Plus } from 'Assets/svgs'
import React, { memo, useState } from 'react'
import SignatoryModal from '../Signatory/SignatoryModal'
import AddExecutiveModal from './ExecutiveModal'
import ExecutivesTable from './ExecutiveTable'
// import ExecutivesTable from './ExecutivesTable'
// import SignatoryModal from './SignatoryModal'

type Props = {}

const Executives = memo((props: Props) => {
  const [showSignatoryForm, setShowSignatoryForm] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [Executives, setExecutives] = useState<Array<any>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  const closeModalFunction = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <section className='max-w-[1060px] mx-4 bg-slate-50'>
      <div
        className={`ControlUILayout  w-full  p-2 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[10px] border-[#FAFAFA]`}
        style={{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className='flex items-center'>
          <h6>Executive/Directors Information</h6>
        </div>
        <div className={`border-2 cursor-pointer border-[#C22626] p-2  `} onClick={handleCollapseSection}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`w-4 h-4  ${collapsed ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>

      <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-2 border-[#C22626]'} py-6`}>
        <div className='flex justify-end'>
          <button
            className='flex gap-2 font-medium
           leading-[20px] text-[#636363]'
            onClick={closeModalFunction}
            type='button'
          >
            <img src={add} />
            Add Executive/Directors
          </button>
        </div>
        <ExecutivesTable collapsed={collapsed} setExecutives={setExecutives} Executives={Executives} />
      </div>
      {openModal ? <AddExecutiveModal closeModalFunction={closeModalFunction} /> : null}
    </section>
  )
})

export default Executives
