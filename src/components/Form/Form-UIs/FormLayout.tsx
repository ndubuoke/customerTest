import { useState, memo, useEffect, useMemo } from 'react'
import { dots, ExclaimateIcon } from 'Assets/svgs'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { getProperty, getVisibleProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection, PageInstance, PageProperties } from '../Types'
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
  isCollapsed?: boolean
  setCollapsedSection?: any
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
    isCollapsed = false,
    setCollapsedSection,
  }: Props) => {
    // const [isCollapsed, setCollapsed] = useState<boolean>(isCollapsed)
    const [detailsOfSpouseIsDisabled, setDetailsOfSpouseIsDisabled] = useState<boolean>(true)
    console.log('isCollapsed', isCollapsed)
    console.log('item.id', item.id)

    const handleSetCollapsedSection = (value?: boolean) => {
      setCollapsedSection((prev) => {
        return prev.map((section) => {
          if (section.id === item.id) {
            return {
              ...section,
              isCollapsed: typeof value === 'boolean' ? value : !section.isCollapsed,
            }
          } else {
            return {
              ...section,
              isCollapsed: true,
            }
          }
        })
      })
    }
    const handleCollapseSection = () => {
      if (isSpouseDetailsSection) {
        if (!detailsOfSpouseIsDisabled) {
          // setCollapsed((prev) => !prev)
          // setCollapsedSection((prev) => {
          //   return {
          //     ...prev,
          //     [item.id]: !prev[item.id],
          //   }
          // })
          handleSetCollapsedSection()
        }
      } else {
        // setCollapsed((prev) => !prev)
        // setCollapsedSection((prev) => {
        //   return {
        //     ...prev,
        //     [item.id]: !prev[item.id],
        //   }
        // })
        handleSetCollapsedSection()
      }
    }

    // console.log({ item })

    const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any
    // console.log('setRequiredFormFieldsRedux', setRequiredFormFieldsRedux)
    useEffect(() => {
      if (isSpouseDetailsSection) {
        const customerDataBioDataSection = fillingFormState?.data?.customerData.find((section) => section.sectionName.toLowerCase() === 'bio-data')
        // console.log('customerDataBioDataSection', customerDataBioDataSection)
        if (customerDataBioDataSection) {
          setDetailsOfSpouseIsDisabled(!(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married'))

          // setCollapsedSection((prev) => {
          //   return {
          //     ...prev,
          //     [item.id]: !(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married'),
          //   }
          // })
          // handleSetCollapsedSection(!(customerDataBioDataSection.data?.maritalStatus?.toLowerCase() === 'married'))
        } else {
          setDetailsOfSpouseIsDisabled(true)
          // handleSetCollapsedSection(true)
          // setCollapsedSection((prev) => {
          //   return {
          //     ...prev,
          //     [item.id]: true,
          //   }
          // })
        }
      }
    }, [fillingFormState])
    // console.log('isCollapsed', isCollapsed)
    // console.log('isCollapsed', isCollapsed)
    // console.log('detailsOfSpouseIsDisabled', detailsOfSpouseIsDisabled)
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
              cursor: 'pointer',
            }}
            onClick={handleCollapseSection}
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
                  <ExclaimateIcon /> Some Information missing
                </span>
              )}
            </div>
            <div className={`border-2 cursor-pointer border-[#C22626] p-1  `}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`w-4 h-4  ${!isCollapsed ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </div>
        )}

        <div
          className={` ${isCollapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[12.5rem] border-l-2 border-[#C22626]'}  `}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '1.25rem',
            padding: '.625rem',
            paddingBottom: '0',
            paddingTop: '0.2rem',
            background: '#fff',
            fontFamily: 'Inter',
          }}
        >
          {fields?.length > 0 &&
            fields?.map((field, index) => {
              if (
                (field.name === fieldsNames.INFOTEXT ||
                  field.name === fieldsNames.NUMBERCOUNTER ||
                  field.name === fieldsNames.PASSWORD ||
                  field.name === fieldsNames.SHORTEXT ||
                  field.name === fieldsNames.URL ||
                  field.name === fieldsNames.EMAIL) &&
                getVisibleProperty(field?.formControlProperties)
              ) {
                return (
                  <FormInput
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.DROPDOWN && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormDropdown
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
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
                (field.name === fieldsNames.DATE ||
                  field.name === fieldsNames.DATETIME ||
                  field.name === fieldsNames.MONTH ||
                  field.name === fieldsNames.TIME ||
                  field.name === fieldsNames.WEEK) &&
                getVisibleProperty(field?.formControlProperties)
              ) {
                return (
                  <FormDate
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.LONGTEXT && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormTextArea
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.SEARCHANDSELECT && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormSearchAndSelect
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }
              if (field.name === fieldsNames.PHONEINPUT && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormPhoneInput
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.FILEUPLOAD && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormFileUpload
                    activePageState={item}
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }
              if (field.name === fieldsNames.ACTIONTOGGLE && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormActionToggle
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.CHECKBOX && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormCheckbox
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.HEADING && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormHeading
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    activePageState={item}
                    setFillingFormState={setFillingFormState}
                    publishedFormState={publishedFormState}
                    fillingFormState={fillingFormState}
                    setBackupForSwitchFormState={setBackupForSwitchFormState}
                    backupForSwitchFormState={backupForSwitchFormState}
                  />
                )
              }

              if (field.name === fieldsNames.BUTTON && getVisibleProperty(field?.formControlProperties)) {
                return <FormButton item={field} key={field.id} collapsed={isCollapsed} />
              }
              if (field.name === fieldsNames.RADIO && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormRadio
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
                    // activePageState={item}
                    // setFillingFormState={setFillingFormState}
                    // publishedFormState={publishedFormState}
                    // fillingFormState={fillingFormState}
                  />
                )
              }
              if (field.name === fieldsNames.RANGE && getVisibleProperty(field?.formControlProperties)) {
                return (
                  <FormRange
                    item={field}
                    key={field.id}
                    collapsed={isCollapsed}
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
