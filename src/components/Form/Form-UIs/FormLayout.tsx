import { useState, memo, useEffect, useMemo } from 'react'
import { dots, ExclaimateIcon } from 'Assets/svgs'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
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

const FormLayout = memo(
  ({
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
    const [detailsOfSpouseIsDisabled, setDetailsOfSpouseIsDisabled] = useState<boolean>(true)

    const handleCollapseSection = () => {
      if (isSpouseDetailsSection) {
        if (!detailsOfSpouseIsDisabled) {
          setCollapsed((prev) => !prev)
        }
      } else {
        setCollapsed((prev) => !prev)
      }
    }

    console.log({ item })

    const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any
    // console.log('setRequiredFormFieldsRedux', setRequiredFormFieldsRedux)
    useEffect(() => {
      if (isSpouseDetailsSection) {
        const customerDataBioDataSection = fillingFormState?.data?.customerData.find((section) => section.sectionName.toLowerCase() === 'bio-data')
        console.log('customerDataBioDataSection', customerDataBioDataSection)
        if (customerDataBioDataSection) {
          console.log(
            '!(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() ==',
            !(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married')
          )
          setDetailsOfSpouseIsDisabled(!(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married'))

          setCollapsed(!(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married'))
        } else {
          setDetailsOfSpouseIsDisabled(true)
          setCollapsed(true)
        }
      }
    }, [fillingFormState])
    console.log('collapsed', collapsed)
    console.log('detailsOfSpouseIsDisabled', detailsOfSpouseIsDisabled)
    const isSpouseDetailsSection = useMemo(() => {
      return getProperty(item?.formControlProperties, 'Section name', 'value').text.toLowerCase() === 'details of spouse'
    }, [item])
    return (
      <section className='max-w-[66.25rem] mx-4'>
        {isSection && (
          <div
            className={`ControlUILayout  w-full   pr-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]
            {setRequiredFormFieldsRedux.} $
            `}
            style={{
              boxShadow: setRequiredFormFieldsRedux?.list?.some((requiredField) => requiredField.sectionId === item.id)
                ? '0px 0px 10px rgba(207, 42, 42, 0.7)'
                : '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
              background: '#FAFAFA',
              fontFamily: 'Inter',
              opacity: isSpouseDetailsSection && detailsOfSpouseIsDisabled && '0.5',
            }}
          >
            <div className='flex items-center'>
              <h6
                style={{
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                {getProperty(item?.formControlProperties, 'Section name', 'value').text
                  ? getProperty(item?.formControlProperties, 'Section name', 'value').text
                  : getProperty(item?.formControlProperties, 'Section name', 'defaultState').text
                  ? getProperty(item?.formControlProperties, 'Section name', 'defaultState').text
                  : 'Section label'}
              </h6>
              {setRequiredFormFieldsRedux.list.some((requiredField) => requiredField.sectionId === item.id) && (
                <span className='flex items-center gap-2 ml-6'>
                  {' '}
                  <ExclaimateIcon /> Some Information missing
                </span>
              )}
            </div>
            <div className={`border-2 cursor-pointer border-[#C22626] p-1  `} onClick={handleCollapseSection}>
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
          className={` ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[12.5rem] border-l-2 border-[#C22626]'}  `}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '1.25rem',
            padding: '.625rem',
            paddingBottom: '0',
            paddingTop: '0.2rem',
            background: '#FAFAFA',
            fontFamily: 'Inter',
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
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
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }
            })}
        </div>
      </section>
    )
  }
)

export default FormLayout
