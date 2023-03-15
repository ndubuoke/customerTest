import { useState, memo, useEffect, useMemo } from 'react'
import { dots, ExclaimateIcon } from 'Assets/svgs'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { getProperty } from 'Utilities/getProperty'

import { FormStructureType as FormStructureType } from 'Components/types/FormStructure.types'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'

// export const fieldsNames = {
//   DROPDOWN: 'Dropdown', //done-
//   LONGTEXT: 'Long text', //done-
//   SHORTEXT: 'Short text', //done-
//   ACTIONTOGGLE: 'Action Toggle', //done-
//   CHECKBOX: 'Multiple Choice (checkbox)', //done-
//   RADIO: 'Single Choice (radio)', // done-
//   BUTTON: 'Button', //done-
//   FILEUPLOAD: 'File Upload', //done-
//   PASSWORD: 'Password', //done-
//   PHONEINPUT: 'Phone Input', //done-
//   HEADING: 'Heading', //done-
//   INFOTEXT: 'Info text', //done -
//   DATE: 'Date', //done-
//   NUMBERCOUNTER: 'Number counter', //done-
//   EMAIL: 'Email', //done-
//   RANGE: 'Range', //done-
//   TIME: 'Time', //done-
//   URL: 'URL', // done-
//   SEARCHANDSELECT: 'Search and Select', //done-
//   MONTH: 'Month', //done----
//   WEEK: 'Week', //done-
//   DATETIME: 'Date-Time', //done-
// }

type Props = {
  title: string
  fields: { key: string; value: string }[]
}

const RiskAssessmentLayout = memo(({ title, fields }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  console.log('collapsed', collapsed)

  return (
    <section className='max-w-[66.25rem] mx-4'>
      <div
        className={`ControlUILayout  w-full  p-1 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]
            {setRequiredFormFieldsRedux.} $
            `}
        style={{
          boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          background: 'rgba(170, 170, 170, 0.07)',
        }}
      >
        <div className='flex items-center'>
          <h6>bleh</h6>
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

      <div
        className={` ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[12.5rem] border-l-2 border-[#C22626]'}  `}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '2.25rem',
          padding: '2rem 10rem 2rem 3rem',
        }}
      >
        {fields.map((field) => (
          <div key={field.key}>
            <h5>{field.key}</h5>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
})

export default RiskAssessmentLayout
