import { useState } from 'react'
import { dots } from 'Assets/svgs'
import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FormInput from './FormInput'
import FormDropdown from './FormDropdown'
import FormDate from './FormDate'
import FormTextArea from './FormTextArea'
import FormSearchAndSelect from './FormSearchAndSelect'
import FormPhoneInput from './FormPhoneInput'
import FormFileUpload from './FormFileUpload'
import FormCheckbox from './FormActionToggle'
import FormActionToggle from './FormActionToggle'
import FormHeading from './FormHeading'
import FormButton from './FormButton'
import FormRadio from './FormRadio'
import FormRange from './FormRange'
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
  isSection: boolean
  activeSection?: boolean
  item?: FormControlType | FormControlTypeWithSection
  fields?: Array<FormControlType | FormControlTypeWithSection>
  setFillingFormState: (value: FormStructureType) => void
  publishedFormState: ResponseType
  fillingFormState: FormStructureType
  setBackupForSwitchFormState: (value: any) => void
  backupForSwitchFormState: any
}

const FormLayout = ({
  isSection,
  activeSection,
  item,
  fields,
  setFillingFormState,
  publishedFormState,
  fillingFormState,
  setBackupForSwitchFormState,
  backupForSwitchFormState,
}: Props) => {
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
              field.name === fieldsNames.NUMBERCOUNTER ||
              field.name === fieldsNames.PASSWORD ||
              field.name === fieldsNames.SHORTEXT ||
              field.name === fieldsNames.URL ||
              field.name === fieldsNames.EMAIL
            ) {
              return (
                <FormInput
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                  setBackupForSwitchFormState={setBackupForSwitchFormState}
                  backupForSwitchFormState={backupForSwitchFormState}
                />
              )
            }

            if (field.name === fieldsNames.DROPDOWN) {
              return (
                <FormDropdown
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                  setBackupForSwitchFormState={setBackupForSwitchFormState}
                  backupForSwitchFormState={backupForSwitchFormState}
                />
              )
            }

            if (
              field.name === fieldsNames.DATE ||
              field.name === fieldsNames.DATETIME ||
              field.name === fieldsNames.MONTH ||
              field.name === fieldsNames.TIME ||
              field.name === fieldsNames.WEEK
            ) {
              return (
                <FormDate
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                  setBackupForSwitchFormState={setBackupForSwitchFormState}
                  backupForSwitchFormState={backupForSwitchFormState}
                />
              )
            }

            if (field.name === fieldsNames.LONGTEXT) {
              return (
                <FormTextArea
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                  setBackupForSwitchFormState={setBackupForSwitchFormState}
                  backupForSwitchFormState={backupForSwitchFormState}
                />
              )
            }

            if (field.name === fieldsNames.SEARCHANDSELECT) {
              return (
                <FormSearchAndSelect
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }
            if (field.name === fieldsNames.PHONEINPUT) {
              return (
                <FormPhoneInput
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }

            if (field.name === fieldsNames.FILEUPLOAD) {
              return (
                <FormFileUpload
                  activePageState={item}
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }
            if (field.name === fieldsNames.ACTIONTOGGLE) {
              return (
                <FormActionToggle
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }

            if (field.name === fieldsNames.CHECKBOX) {
              return (
                <FormCheckbox
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }

            if (field.name === fieldsNames.HEADING) {
              return (
                <FormHeading
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }

            if (field.name === fieldsNames.BUTTON) {
              return <FormButton item={field} key={field.id} collapsed={collapsed} />
            }
            if (field.name === fieldsNames.RADIO) {
              return (
                <FormRadio
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  // activePageState={item}
                  // setFillingFormState={setFillingFormState}
                  // publishedFormState={publishedFormState}
                  // fillingFormState={fillingFormState}
                />
              )
            }
            if (field.name === fieldsNames.RANGE) {
              return (
                <FormRange
                  item={field}
                  key={field.id}
                  collapsed={collapsed}
                  activePageState={item}
                  setFillingFormState={setFillingFormState}
                  publishedFormState={publishedFormState}
                  fillingFormState={fillingFormState}
                />
              )
            }
          })}
      </div>
    </section>
  )
}

export default FormLayout
