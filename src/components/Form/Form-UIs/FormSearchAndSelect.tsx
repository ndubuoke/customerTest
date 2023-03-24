import { caret, search } from 'Assets/svgs'
import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { getProperty } from 'Utilities/getProperty'
import { Form, FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import DataListInput from 'react-datalist-input'
import { ReducersType } from 'Redux/store'
import { setRequiredFormFieldsAction, getRelationshipOfficersAction } from 'Redux/actions/FormManagement.actions'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
// https://api.staging.sterlingv2.prunedge.org/api/v1/users?page_size=100000
type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
  setFillingFormState: any
  publishedFormState: ResponseType
  activePageState?: PageInstance

  fillingFormState: FormStructureType
  setBackupForSwitchFormState: (value: any) => void
  backupForSwitchFormState: any
}

const FormSearchAndSelect = memo(
  ({
    item,
    collapsed,
    setFillingFormState,
    publishedFormState,
    activePageState,
    fillingFormState,
    setBackupForSwitchFormState,
    backupForSwitchFormState,
  }: Props) => {
    const dispatch = useDispatch()
    const theForm = publishedFormState?.serverResponse?.data as Form
    const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

    const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
    const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
    const enableMultipleSelection = formGetProperty(item.formControlProperties, 'Enable multiple selection of options', 'off')
    const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
    const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)

    const dropdownOptionsListValue = formGetProperty(item.formControlProperties, 'Dropdown Options List', '')
    const specifyOptionsListValue = formGetProperty(item.formControlProperties, 'Specify Options List', '')
    const importFromFileListValue = formGetProperty(item.formControlProperties, 'Upload List', '')
    const importFromAPIListValue = formGetProperty(item.formControlProperties, 'Specify API', '')
    const importFromURLListValue = formGetProperty(item.formControlProperties, 'Specify URL', '')

    const optionsField =
      dropdownOptionsListValue.toLowerCase() === 'manual input'
        ? specifyOptionsListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from file'
        ? importFromFileListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from api'
        ? importFromAPIListValue
        : dropdownOptionsListValue.toLowerCase() === 'import from url'
        ? importFromURLListValue
        : null

    console.log('fieldLabel-FormSearchAndSelect', fieldLabel)
    console.log('optionsField-FormSearchAndSelect', optionsField)

    const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
    const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

    const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

    const [items, setItems] = useState<{ label: string; key: string }[]>([])

    const [selectedDropdownItem, setSelectedDropdownItem] = useState<any>(null)

    const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any
    const getRelationshipOfficersRedux = useSelector<ReducersType>((state: ReducersType) => state?.getRelationshipOfficers) as ResponseType

    //   console.log(optionsField.split(",").map(function (value) {
    //     return value.trim();
    //  }))

    const handleRemoveFromRequired = () => {
      const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

      if (requiredFieldsFromRedux) {
        const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

        // console.log({ filterOutCosFillingStarted })

        dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
      }
    }

    useEffect(() => {
      if (fieldLabel.toLowerCase().includes('relationship officer')) {
        dispatch(getRelationshipOfficersAction() as any)
      }
      if (fieldLabel.toLowerCase().includes('relationship officer')) {
        console.log('relationshipOfficer-phew')
      }
    }, [])

    //  const items = useMemo(
    //    () =>
    //      optionsField?.split(',')?.map((oneItem) => ({
    //        label: oneItem?.trim(),
    //        key: oneItem?.trim(),
    //      })),
    //    [optionsField]
    //  )

    useEffect(() => {
      setItems(() => {
        return optionsField?.split(',')?.map((oneItem) => ({
          label: oneItem?.trim(),
          value: oneItem?.trim(),
          key: oneItem?.trim(),
        }))
      })
    }, [optionsField])

    useEffect(() => {
      if (fieldLabel.toLowerCase().includes('relationship officer')) {
        if (getRelationshipOfficersRedux?.success) {
          setItems(
            getRelationshipOfficersRedux?.serverResponse?.results?.map((x) => ({
              label: `${x.firstname} ${x.lastname}`,
              key: x.id,
              value: x.id,
            }))
          )
          // setOptionsField(getRelationshipOfficersRedux?.serverResponse?.data?.map((x) => x?.countryName))
          // setCountries(
          //   getRelationshipOfficersRedux?.serverResponse?.data?.map((x) => {
          //     return { countryId: x?.countryId, countryName: x?.countryName }
          //   })
          // )
          console.log({ getRelationshipOfficersRedux: getRelationshipOfficersRedux?.serverResponse })
        }
      }
    }, [getRelationshipOfficersRedux])

    const onSelect = useCallback((theSelectedItem, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
      setSelectedDropdownItem(theSelectedItem.label)

      setFillingFormState((prev: FormStructureType) => {
        const copiedPrev = { ...prev }
        const pageId = theItemFromChange?.pageId

        if (!copiedPrev?.data?.formInfomation?.formId) {
          copiedPrev.data.formInfomation.formId = theForm?._id
          copiedPrev.data.formInfomation.formType = theForm?.formType
        }

        // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

        const sectionId = theItemFromChange?.sectionId
        let sectionIndex

        if (sectionId) {
          const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
          const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
          const theItemSectionNameCamelCase = camelize(theItemSectionName)

          const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

          if (theSection) {
            sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

            theSection.data[theItemFieldNameCamelCase] = theSelectedItem?.value
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: theItemSectionNameCamelCase,
              data: {
                [theItemFieldNameCamelCase]: theSelectedItem?.value,
              },
              pageId,
              sectionId,
            })
          }
        }

        if (!sectionId) {
          const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
          const pageNameCamelCase = camelize(pageName)
          const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

          const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

          if (theSectionlessPage) {
            sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

            theSectionlessPage.data[theItemFieldNameCamelCase] = theSelectedItem?.value
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: pageNameToBeUsed,
              data: {
                [theItemFieldNameCamelCase]: theSelectedItem?.value,
              },
              pageId,
              sectionId: null,
            })
          }
        }

        return copiedPrev
      })
    }, [])

    useEffect(() => {
      const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
        if (x.sectionId) {
          return x?.sectionId === item?.sectionId
        } else {
          return x?.pageId === item?.pageId
        }
      })

      const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]

      if (theData) {
        setSelectedDropdownItem(theData)
      }
    }, [])

    useEffect(() => {
      if (selectedDropdownItem) {
        setBackupForSwitchFormState((prev) => {
          const copiedPrev = { ...prev }
          copiedPrev[theItemFieldNameCamelCase] = selectedDropdownItem

          return copiedPrev
        })
      }
    }, [selectedDropdownItem])

    useEffect(() => {
      const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null

      if (!selectedDropdownItem) {
        if (backup) {
          setSelectedDropdownItem(backup)
        } else {
          setSelectedDropdownItem('')
          setFillingFormState((prev: FormStructureType) => {
            // console.log('prev', prev)
            const copiedPrev = { ...prev }
            const pageId = item?.pageId

            if (!copiedPrev?.data?.formInfomation?.formId) {
              copiedPrev.data.formInfomation.formId = theForm?._id
              copiedPrev.data.formInfomation.formType = theForm?.formType
            }

            // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

            const sectionId = item?.sectionId
            let sectionIndex

            if (sectionId) {
              const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
              const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
              const theItemSectionNameCamelCase = camelize(theItemSectionName)

              const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

              if (theSection) {
                sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

                theSection.data[theItemFieldNameCamelCase] = ''
                copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
              } else {
                copiedPrev.data.customerData.push({
                  sectionName: theItemSectionNameCamelCase,
                  data: {
                    [theItemFieldNameCamelCase]: '',
                  },
                  pageId,
                  sectionId,
                })
              }
            }

            if (!sectionId) {
              const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
              const pageNameCamelCase = camelize(pageName)
              const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

              const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

              if (theSectionlessPage) {
                sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

                theSectionlessPage.data[theItemFieldNameCamelCase] = ''
                copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
              } else {
                copiedPrev.data.customerData.push({
                  sectionName: pageNameToBeUsed,
                  data: {
                    [theItemFieldNameCamelCase]: '',
                  },
                  pageId,
                  sectionId: null,
                })
              }
            }

            return copiedPrev
          })
        }
      }
    }, [publishedFormState])

    return (
      <div
        className={`${collapsed ? 'hidden' : ''} `}
        style={{
          gridColumn: ` span ${span}`,
          // border: clickedFormControl?.control?.name === item.name ? `.125rem dotted green` : '',
        }}
        title={helpText}
      >
        <div className='relative w-fit'>
          {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
          <FieldLabel fieldItem={item} />
        </div>
        <div className='w-full border-b border-b-[#AAAAAA] relative mt-2 pl-2 '>
          <div className=' w-full   py-1 pl-2 ml-1`'>
            <DataListInput
              placeholder={selectedDropdownItem || placeholder}
              items={items}
              onSelect={(theSelectedItem) => {
                onSelect(theSelectedItem, item)
                handleRemoveFromRequired()
              }}
              value={selectedDropdownItem ? selectedDropdownItem : ''}
            />
          </div>
          <span
            className='absolute z-50 h-full pt-4 -left-1'
            style={{
              top: '-0.375rem',
              right: '.2938rem',
              pointerEvents: 'none',
            }}
          >
            <img src={search} width={15} height={10} />
          </span>
          <span
            className='absolute z-50 h-full pt-4 -right-1'
            style={{
              top: '-0.375rem',
              right: '.2938rem',
              pointerEvents: 'none',
            }}
          >
            <img src={caret} width={15} height={10} />
          </span>
        </div>

        {required.toLowerCase() === 'on' ? (
          <p className='text-red-500'>
            {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase) ? `${fieldLabel} is required!` : null}
          </p>
        ) : null}
      </div>
    )
  }
)

export default FormSearchAndSelect
