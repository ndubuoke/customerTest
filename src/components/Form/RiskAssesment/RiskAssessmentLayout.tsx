import { useState, memo, useEffect, useMemo } from 'react'
import { dots, ExclaimateIcon } from 'Assets/svgs'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { getProperty } from 'Utilities/getProperty'

import { FormStructureType as FormStructureType } from 'Components/types/FormStructure.types'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'

export const fieldsNames = {
  DROPDOWN: 'Dropdown', //done-
  LONGTEXT: 'Long text', //done-
  SHORTEXT: 'Short text', //done-
  ACTIONTOGGLE: 'Action Toggle', //done-
  CHECKBOX: 'Multiple Choice (checkbox)', //done-
  RADIO: 'Single Choice (radio)', // done-
  BUTTON: 'Button', //done-
  FILEUPLOAD: 'File Upload', //done-
  PASSWORD: 'Password', //done-
  PHONEINPUT: 'Phone Input', //done-
  HEADING: 'Heading', //done-
  INFOTEXT: 'Info text', //done -
  DATE: 'Date', //done-
  NUMBERCOUNTER: 'Number counter', //done-
  EMAIL: 'Email', //done-
  RANGE: 'Range', //done-
  TIME: 'Time', //done-
  URL: 'URL', // done-
  SEARCHANDSELECT: 'Search and Select', //done-
  MONTH: 'Month', //done----
  WEEK: 'Week', //done-
  DATETIME: 'Date-Time', //done-
}

type Props = {
  title: string
  fields: { title: string; key: string }[]
  assessmentData: Record<string, string>
}

const RiskAssessmentLayout = memo(({ title, fields, assessmentData }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  console.log('collapsed', collapsed)

  return (
    <>
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
            <h6
              style={{
                fontWeight: '500',
                fontSize: '16px',
              }}
            >
              {title}
            </h6>
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
            gridGap: '1.25rem',
            color: '#636363',
            padding: `${collapsed ? '0' : '1.3rem 9rem 1rem 2.5rem'}`,
          }}
        >
          {fields.map((field) => {
            if (assessmentData.hasOwnProperty(field.key)) {
              return (
                <div key={field.title}>
                  <h5
                    style={{
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '16px',
                      fontFamily: 'Inter',
                    }}
                  >
                    {field.title}
                  </h5>

                  <p
                    style={{
                      fontWeight: '400',
                      fontSize: '16px',
                      lineHeight: '18px',
                      marginTop: '0.3rem',
                    }}
                  >
                    {assessmentData[field.key] || '-'}
                  </p>
                </div>
              )
            }
          })}
        </div>
      </section>
      {/* watchlist section */}
      {/* <section className='max-w-[1060px] mx-4 bg-slate-50'>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>WatchList</h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1  `}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}></div>
      </section> */}
    </>
  )
})

export default RiskAssessmentLayout
