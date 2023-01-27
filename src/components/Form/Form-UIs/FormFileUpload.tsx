import React, { useEffect, useState, useCallback } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection, PageInstance, Form } from '../Types'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import { camelize } from 'Utilities/convertStringToCamelCase'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDropzone, FileRejection } from 'react-dropzone'
import { compareTwoArrays } from 'Utilities/compareTwoArrays'

import { add } from 'Assets/svgs'
import { FormStructureType, FormSectionType } from 'Components/types/FormStructure.types'
import { API } from 'Utilities/api'
import Spinner from 'Components/Shareables/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { setRequiredFormFieldsAction } from 'Redux/actions/FormManagement.actions'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import IndividualFileForm from './IndividualFileForm'

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

export type UploadFile = {
  file: File
  signedUrl: string
}

const FormFileUpload = ({
  item,
  collapsed,
  setFillingFormState,
  publishedFormState,
  fillingFormState,
  setBackupForSwitchFormState,
  backupForSwitchFormState,
  activePageState,
}) => {
  const dispatch = useDispatch()
  const theForm = publishedFormState?.serverResponse?.data as Form
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const allowableFileTypes = formGetProperty(item.formControlProperties, 'Allowable File Types', 'png, jpg, pdf')

  const [isUploading, setIsUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [fileUploadError, setFileUploadError] = useState({
    isError: false,
    message: '',
  })

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any

  const onDrop = useCallback(async (acceptedFiles: Array<File>, fileRejections) => {
    setIsUploading(true)

    const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

    if (requiredFieldsFromRedux) {
      const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

      dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
    }

    const uploadedFiles = acceptedFiles.map(async (file): Promise<any> => {
      try {
        const formdata = new FormData()
        formdata.append('fileName', file)
        const response = await API.post('/file/upload', formdata)

        try {
          const signedUrlResponse = await API.get('/file/signedurl/' + response.data.data.fileKey)
          return {
            file,
            signedUrl: signedUrlResponse.data.data,
          }
        } catch (err) {
          setFileUploadError({
            isError: true,
            message: `failed to get signed url - ${file.name}`,
          })
          return null
        }
      } catch (error) {
        setIsUploading(false)
        setFileUploadError({
          isError: true,
          message: `failed to upload file - ${file.name}`,
        })
        return null
      }
    }, [])

    if (fileRejections.length) {
      setFileUploadError({
        isError: true,
        message: 'File not accepted',
      })
      return
    }

    const awaitUploadedFiles = await Promise.all(uploadedFiles)

    const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
    setFileUrl(awaitUploadedFiles?.map((x) => x?.signedUrl)[0])

    setIsUploading(false)

    // if (filterSuccessUploadedFiles.length) {
    //   setFillingFormState((prev: FormStructureType) => {
    //     const copiedPrev = { ...prev }
    //     const pageId = item?.pageId
    //     if (!copiedPrev?.data?.formInfomation?.formId) {
    //       copiedPrev.data.formInfomation.formId = theForm?._id
    //       copiedPrev.data.formInfomation.formType = theForm?.formType
    //     }

    //     const sectionId = item?.sectionId
    //     let sectionIndex
    //     if (sectionId) {
    //       const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
    //       const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
    //       const theItemSectionNameCamelCase = camelize(theItemSectionName)

    //       const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType
    //       console.log('customerData-sectionId', copiedPrev?.data?.customerData)
    //       if (theSection) {
    //         sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

    //         theSection.data[theItemFieldNameCamelCase] = filterSuccessUploadedFiles[0].signedUrl
    //         copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
    //       } else {
    //         copiedPrev.data.customerData.push({
    //           sectionName: theItemSectionNameCamelCase,
    //           data: {
    //             [theItemFieldNameCamelCase]: filterSuccessUploadedFiles[0].signedUrl,
    //           },
    //           pageId,
    //           sectionId,
    //         })
    //       }
    //     }
    //     return copiedPrev
    //   })
    // }
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.log('fileRejections', fileRejections)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: compareTwoArrays(allowableFileTypes.split(','), ['png', 'jpeg', 'pdf'])
      ? {
          'image/jpeg': [],
          'image/png': [],
          'application/pdf': ['.pdf'],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['png', 'jpeg'])
      ? {
          'image/jpeg': [],
          'image/png': [],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['pdf'])
      ? {
          'application/pdf': ['.pdf'],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['pdf', 'jpeg'])
      ? {
          'image/jpeg': [],
          'application/pdf': ['.pdf'],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['pdf', 'png'])
      ? {
          'image/png': [],
          'application/pdf': ['.pdf'],
        }
      : null,
  })

  const handleRemoveFile = (e: any) => {
    e.stopPropagation()
    setFileUrl('')

    setFillingFormState((prev: FormStructureType) => {
      const copiedPrev = { ...prev }
      const pageId = item?.pageId
      const sectionId = item?.sectionId
      let sectionIndex
      if (sectionId) {
        const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
        const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
        const theItemSectionNameCamelCase = camelize(theItemSectionName)

        const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType
        if (theSection) {
          sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)
          // console.log('theSect', theSection)
          delete theSection.data[theItemFieldNameCamelCase]
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        }
      }
      return copiedPrev
    })
    setBackupForSwitchFormState((prev) => {
      const copiedPrev = { ...prev }
      delete copiedPrev[theItemFieldNameCamelCase]

      return copiedPrev
    })
  }

  // Handle backup
  useEffect(() => {
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x.sectionId === item.sectionId
      } else {
        return x.pageId === item.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]
    if (theData) {
      setFileUrl(theData)
    }
  }, [])

  useEffect(() => {
    // console.log('uploadedFiles', uploadedFiles)
    if (fileUrl) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = fileUrl

        return copiedPrev
      })
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

            theSection.data[theItemFieldNameCamelCase] = fileUrl
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: theItemSectionNameCamelCase,
              data: {
                [theItemFieldNameCamelCase]: fileUrl,
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

            theSectionlessPage.data[theItemFieldNameCamelCase] = fileUrl
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: pageNameToBeUsed,
              data: {
                [theItemFieldNameCamelCase]: fileUrl,
              },
              pageId,
              sectionId,
            })
          }
        }

        return copiedPrev
      })
    } else {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        delete copiedPrev[theItemFieldNameCamelCase]

        return copiedPrev
      })
    }
  }, [fileUrl])

  useEffect(() => {
    const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null
    // console.log('backup', backup)
    if (!fileUrl) {
      if (backup) {
        setFileUrl(backup)
      } else {
        setFileUrl('')
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
                sectionId,
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
      className={`${collapsed ? 'hidden' : ''}`}
      style={{
        gridColumn: ` span ${span}`,
      }}
      title={helpText}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>

      <div
        className=' w-full border  rounded-[.75rem]  h-[9.375rem] p-2'
        style={{
          border: setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)
            ? '.0625rem solid red'
            : '.0625rem solid #AAAAAA',
        }}
      >
        {fileUploadError.isError && <p className='py-0'>{fileUploadError.message}</p>}

        {fileUrl ? (
          <div className='relative flex items-center cursor-pointer '>
            <div className='max-w-[12.125rem] border border-[#aaaaaa] h-[90%] rounded-[.75rem] p-2'>
              <IndividualFileForm file={fileUrl} removeFile={(e) => handleRemoveFile(e)} />
            </div>
          </div>
        ) : isUploading ? (
          <div className='flex items-center  h-[9.375rem]'>
            <span className='mr-4 text-3xl'>Loading</span>
            <Spinner size={'small'} />
          </div>
        ) : (
          <div {...getRootProps()} className='relative h-full cursor-pointer '>
            <input type={`file`} hidden {...getInputProps()} multiple={false} className='' />

            <div className='absolute bottom-0 right-0 cursor-pointer' style={{ marginTop: 'auto' }}>
              <img src={add} className='inline mr-1' />
            </div>
          </div>
        )}
      </div>

      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>
          {setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase) ? `${fieldLabel} is required!` : null}
        </p>
      ) : null}
    </div>
  )
}

export default FormFileUpload
