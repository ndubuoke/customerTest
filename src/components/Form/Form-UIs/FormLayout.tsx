import { useState } from 'react'
import { dots } from 'Assets/svgs'
import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FormInput from './FormInput'
import FormDropdown from './FormDropdown'
import FormDate from './FormDate'

export const fieldsNames = {
  DROPDOWN: 'Dropdown',
  LONGTEXT: 'Long text',
  SHORTEXT: 'Short text',
  ACTIONTOGGLE: 'Action Toggle',
  CHECKBOX: 'Multiple Choice (checkbox)',
  RADIO: 'Single Choice (radio)',
  BUTTON: 'Button',
  FILEUPLOAD: 'File Upload',
  PASSWORD: 'Password',
  PHONEINPUT: 'Phone Input',
  HEADING: 'Heading',
  INFOTEXT: 'Info text',
  DATE: 'Date',
  NUMBERCOUNTER: 'Number counter',
  EMAIL: 'Email',
  RANGE: 'Range',
  TIME: 'Time',
  URL: 'URL',
  SEARCHANDSELECT: 'Search and Select',
  MONTH: 'Month',
  WEEK: 'Week',
  DATETIME: 'Date-Time',
}

type Props = {
  isSection: boolean
  activeSection?: boolean
  item?: FormControlType | FormControlTypeWithSection
  fields?: Array<FormControlType | FormControlTypeWithSection>
}

const FormLayout = ({ isSection, activeSection, item, fields }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  // console.log({ fields })

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
      )}

      <div
        className={` ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-2 border-[#C22626]'}  `}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '20px',
          padding: '10px',
          paddingBottom: '3rem',
          paddingTop: '1rem',
        }}
      >
        {fields?.length > 0 &&
          fields?.map((field, index) => {
            if (
              field.name === fieldsNames.INFOTEXT ||
              field.name === fieldsNames.LONGTEXT ||
              field.name === fieldsNames.NUMBERCOUNTER ||
              field.name === fieldsNames.PASSWORD ||
              field.name === fieldsNames.PHONEINPUT ||
              field.name === fieldsNames.SHORTEXT ||
              field.name === fieldsNames.URL
            ) {
              return <FormInput item={field} key={field.id} collapsed={collapsed} />
            }

            if (field.name === fieldsNames.DROPDOWN) {
              return <FormDropdown item={field} key={field.id} collapsed={collapsed} />
            }

            if (
              field.name === fieldsNames.DATE ||
              field.name === fieldsNames.DATETIME ||
              field.name === fieldsNames.MONTH ||
              field.name === fieldsNames.TIME ||
              field.name === fieldsNames.WEEK
            ) {
              return <FormDate item={field} key={field.id} collapsed={collapsed} />
            }
          })}
      </div>
    </section>
  )
}

export default FormLayout
