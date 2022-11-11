import { useState } from 'react'
import { dots } from 'Assets/svgs'
import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'

type Props = {
  isSection: boolean
  activeSection?: boolean
  item?: FormControlType | FormControlTypeWithSection
}

const FormLayout = ({ isSection, activeSection, item }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <section className='max-w-[1060px] mx-4'>
      {isSection && (
        <div
          className={`ControlUILayout  w-full  p-2 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[10px] border-[#FAFAFA]`}
          style={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>
              {getProperty(item?.formControlProperties, 'Section name', 'value').text
                ? getProperty(item?.formControlProperties, 'Section name', 'value').text
                : getProperty(item?.formControlProperties, 'Section name', 'defaultState').text
                ? getProperty(item?.formControlProperties, 'Section name', 'defaultState').text
                : 'Section label'}
            </h6>
          </div>
          <div className='border-2 border-[#C22626] p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={`w-4 h-4 cursor-pointer ${collapsed ? 'rotate-180' : ''}`}
              onClick={handleCollapseSection}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}

export default FormLayout
