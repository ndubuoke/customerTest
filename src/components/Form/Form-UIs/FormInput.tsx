import { FormSectionType, FormStructureType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import { ReducersType } from 'Redux/store'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { generateID } from 'Utilities/generateId'
import { getColumnName } from 'Utilities/getColumnName'
import { getProperty } from 'Utilities/getProperty'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import { Form, FormControlType, FormControlTypeWithSection, PageInstance } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'

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

const FormInput = ({
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
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const getColumnMap = useSelector<ReducersType>((state: ReducersType) => state?.getColumnMap) as ResponseType

  // const pageName = theForm?.builtFormMetadata?.pages?.find((x) => formGetProperty(x.pageProperties, "Page name", "Page Name") )

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any

  const [text, setText] = useState<string>('')
  const [columnName, setColumnName] = useState<string>('')

  // const [columnName, setColumnName] =

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, theItemFromChange: FormControlType | FormControlTypeWithSection) => {
    if (isFieldBvn(theItemFromChange) && e.target.value.length > Number(maximumNumbersOfCharacters)) {
      return
    }
    setText(e.target.value)

    const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === columnName)

    if (requiredFieldsFromRedux) {
      const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== columnName)

      dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
    }

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

          theSection.data[columnName] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: theItemSectionNameCamelCase,
            data: {
              [columnName]: e.target.value.trim(),
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

          theSectionlessPage.data[columnName] = e.target.value.trim()
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
        } else {
          copiedPrev.data.customerData.push({
            sectionName: pageNameToBeUsed,
            data: {
              [columnName]: e.target.value.trim(),
            },
            pageId,
            sectionId: null,
          })
        }
      }

      return copiedPrev
    })

    // [theItemFieldNameCamelCase]: e.target.value.trim()
  }

  useEffect(() => {
    if (getColumnMap?.serverResponse?.status) {
      const _columnName = getColumnName({
        columns: getColumnMap?.serverResponse?.data,
        sectionId: item?.sectionId,
        pageId: item?.pageId,
        fieldId: item?.id,
        fieldName: theItemFieldNameCamelCase,
      })

      if (_columnName) {
        setColumnName(_columnName)
      }
    }
  }, [getColumnMap?.serverResponse?.status])

  // Populate the value local state with filling form state
  // Also add the new field to the filling Form State
  useEffect(() => {
    if (!columnName) {
      return
    }
    const theItemSectionOrPage = fillingFormState?.data?.customerData?.find((x) => {
      if (x.sectionId) {
        return x?.sectionId === item?.sectionId
      } else {
        return x?.pageId === item?.pageId
      }
    })
    const theData = theItemSectionOrPage?.data[columnName]

    if (theData?.length > 0) {
      setText(theData)
    } else {
      setFillingFormState((prev: FormStructureType) => {
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

            theSection.data[columnName] = ''
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: theItemSectionNameCamelCase,
              data: {
                [columnName]: '',
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

            theSectionlessPage.data[columnName] = ''
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: pageNameToBeUsed,
              data: {
                [columnName]: '',
              },
              pageId,
              sectionId: null,
            })
          }
        }

        return copiedPrev
      })
    }
    // if (fillingFormState?.data?.customerData?.length === 0) {
    //   const exists = fillingFormState[columnName]

    //   if (exists) {
    //     setText(exists)
    //   }
    //   return
    // } else {
    //   const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
    //     if (x.sectionId) {
    //       return x.sectionId === item.sectionId
    //     } else {
    //       return x.pageId === item.pageId
    //     }
    //   })

    //   const theData = theItemSectionOrPage?.data[columnName]

    //   if (theData && theData?.length > 0) {
    //     setText(theData)
    //   }
    // }
  }, [columnName])

  // Change the value of backup state with any new thing from filling for state
  useEffect(() => {
    if (text) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[columnName] = text

        return copiedPrev
      })
    }
  }, [text])

  // Incase there is no filling form state, use backup state to populate filling form state and local state
  // This is mostly for prefilling the form
  useEffect(() => {
    if (!text) {
      const backup = backupForSwitchFormState?.hasOwnProperty(columnName) ? backupForSwitchFormState[columnName] : null

      if (backup && backup?.length > 1) {
        setText(backup)
        setFillingFormState((prev: FormStructureType) => {
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

              theSection.data[columnName] = backup
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [columnName]: backup,
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

              theSectionlessPage.data[columnName] = backup
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [columnName]: backup,
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

    //   const backup = backupForSwitchFormState?.hasOwnProperty(columnName) ? backupForSwitchFormState[columnName] : null

    //   if (!text) {
    //     if (backup && backup?.length > 1) {
    //       setText(backup)
    //     } else {
    //       // setText('')
    //       setFillingFormState((prev: FormStructureType) => {
    //         const copiedPrev = { ...prev }
    //         const pageId = item?.pageId

    //         if (!copiedPrev?.data?.formInfomation?.formId) {
    //           copiedPrev.data.formInfomation.formId = theForm?._id
    //           copiedPrev.data.formInfomation.formType = theForm?.formType
    //         }

    //         // const theItemSectionName = formGetProperty(theForm?.builtFormMetadata?., 'Section name', 'Section')

    //         const sectionId = item?.sectionId
    //         let sectionIndex

    //         if (sectionId) {
    //           const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
    //           const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
    //           const theItemSectionNameCamelCase = camelize(theItemSectionName)

    //           const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType

    //           if (theSection) {
    //             sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

    //             theSection.data[columnName] = text
    //             copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
    //           } else {
    //             copiedPrev.data.customerData.push({
    //               sectionName: theItemSectionNameCamelCase,
    //               data: {
    //                 [columnName]: text,
    //               },
    //               pageId,
    //               sectionId,
    //             })
    //           }
    //         }

    //         if (!sectionId) {
    //           const pageName = formGetProperty(activePageState?.pageProperties, 'Page name', 'Page Name')
    //           const pageNameCamelCase = camelize(pageName)
    //           const pageNameToBeUsed = pageNameCamelCase + '-SECTIONLESS'

    //           const theSectionlessPage = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === pageNameToBeUsed) as FormSectionType

    //           if (theSectionlessPage) {
    //             sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === pageNameToBeUsed)

    //             theSectionlessPage.data[columnName] = text
    //             copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
    //           } else {
    //             copiedPrev.data.customerData.push({
    //               sectionName: pageNameToBeUsed,
    //               data: {
    //                 [columnName]: text,
    //               },
    //               pageId,
    //               sectionId: null,
    //             })
    //           }
    //         }

    //         return copiedPrev
    //       })
    //     }
    //   }
  }, [publishedFormState, columnName])

  //

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} `}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `.125rem dotted green` : '',
        background: 'transparent',
      }}
      title={helpText}
    >
      {/* {helpText === 'BVN' && console.log(fieldsNames.NUMBERCOUNTER, 'hey', item.name)} */}
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>
      <div className='relative w-full border-b border-b-[#AAAAAA]'>
        {item.name === fieldsNames.NUMBERCOUNTER ? (
          <>
            <input
              className={`flex w-full  py-1 leading-6 bg-transparent`}
              type='number'
              required={required.toLowerCase() === 'on'}
              placeholder={placeholder}
              title={helpText}
              onChange={(e) => handleChange(e, item)}
              maxLength={Number(maximumNumbersOfCharacters)}
              value={text}
              min='0'
            />
          </>
        ) : null}
        {item.name !== fieldsNames.NUMBERCOUNTER ? (
          <>
            <input
              className={`flex w-full  py-1 leading-6 bg-transparent`}
              type={
                isFieldBvn(item)
                  ? 'number'
                  : item.name === fieldsNames.INFOTEXT || item.name === fieldsNames.SHORTEXT
                  ? 'text'
                  : item.name === fieldsNames.PHONEINPUT
                  ? 'tel'
                  : item.name === fieldsNames.PASSWORD
                  ? 'password'
                  : item.name === fieldsNames.URL
                  ? 'url'
                  : item.name === fieldsNames.EMAIL
                  ? 'email'
                  : 'text'
              }
              required={required.toLowerCase() === 'on'}
              placeholder={placeholder}
              title={helpText}
              onChange={(e) => handleChange(e, item)}
              maxLength={Number(maximumNumbersOfCharacters)}
              value={text}
            />
          </>
        ) : null}

        {item.name !== fieldsNames.NUMBERCOUNTER && maximumNumbersOfCharacters ? (
          <div className='absolute bottom-0 right-0 text-sm text-[#9ca3af] z-10 bg-transparent'>
            {text.length}/{maximumNumbersOfCharacters}
          </div>
        ) : null}
      </div>
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>
          {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === columnName) ? `${fieldLabel} is required!` : null}
        </p>
      ) : null}
    </div>
  )
}

export default FormInput

const isFieldBvn = (item: FormControlType | FormControlTypeWithSection) => {
  return (
    (getProperty(item.formControlProperties, 'Field label', 'value').text
      ? getProperty(item.formControlProperties, 'Field label', 'value').text
      : getProperty(item.formControlProperties, 'Field label', 'defaultState').text
      ? getProperty(item.formControlProperties, 'Field label', 'defaultState').text
      : 'Field Label'
    )?.toUpperCase() === 'BVN'
  )
}

const isFieldExpiry = (item: FormControlType | FormControlTypeWithSection) => {
  return (
    (getProperty(item.formControlProperties, 'Field label', 'value').text
      ? getProperty(item.formControlProperties, 'Field label', 'value').text
      : getProperty(item.formControlProperties, 'Field label', 'defaultState').text
      ? getProperty(item.formControlProperties, 'Field label', 'defaultState').text
      : 'Field Label'
    )?.toUpperCase() === 'EXPIRY DATE'
  )
}
