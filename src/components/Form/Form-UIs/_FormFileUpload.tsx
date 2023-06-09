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
}: Props) => {
  const dispatch = useDispatch()
  const theForm = publishedFormState?.serverResponse?.data as Form
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const allowableFileTypes = formGetProperty(item.formControlProperties, 'Allowable File Types', 'png, jpg, pdf')

  const [uploadedFiles, setuploadedFiles] = useState<Array<any>>(null)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState({
    isError: false,
    message: '',
  })

  const theFieldLabelWithoutSpecialCase = replaceSpecialCharacters(fieldLabel)
  const theItemFieldNameCamelCase = camelize(theFieldLabelWithoutSpecialCase)

  const theVisualItemFieldNameCamelCase = camelize(fieldLabel)

  const setRequiredFormFieldsRedux = useSelector<ReducersType>((state: ReducersType) => state?.setRequiredFormFields) as any

  const onDrop = useCallback(
    async (acceptedFiles: Array<File>, fileRejections) => {
      // console.log({ file: acceptedFiles[0], key: Date.now() })
      setIsUploading(true)

      const requiredFieldsFromRedux = setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase)

      if (requiredFieldsFromRedux) {
        const filterOutCosFillingStarted = setRequiredFormFieldsRedux?.list?.filter((x) => x.fieldLabel !== theItemFieldNameCamelCase)

        dispatch(setRequiredFormFieldsAction(filterOutCosFillingStarted) as any)
      }
      const uploadedFiles = acceptedFiles.map(async (file): Promise<UploadFile> => {
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
            console.error(err.message, `failed to get signed url - ${file.name}`)
            setFileUploadError({
              isError: true,
              message: `failed to get signed url - ${file.name}`,
            })
            return null
          }
        } catch (err) {
          console.error(err.message, `failed to upload file - ${file.name}`)
          setFileUploadError({
            isError: true,
            message: `failed to upload file - ${file.name}`,
          })
          return null
        }
      })
      if (fileRejections.length) {
        setFileUploadError({
          isError: true,
          message: 'File not accepted',
        })
        return
      }
      const awaitUploadedFiles = await Promise.all(uploadedFiles)
      const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
      setuploadedFiles(filterSuccessUploadedFiles)
      //
      setFileUrl(awaitUploadedFiles.map((x) => x.signedUrl)[0])

      setIsUploading(false)
      // setuploadedFiles([{ file: acceptedFiles[0], key: Date.now().toString() }])
      if (filterSuccessUploadedFiles.length) {
        setFillingFormState((prev: FormStructureType) => {
          const copiedPrev = { ...prev }
          const pageId = item?.pageId
          if (!copiedPrev?.data?.formInfomation?.formId) {
            copiedPrev.data.formInfomation.formId = theForm?._id
            copiedPrev.data.formInfomation.formType = theForm?.formType
          }

          const sectionId = item?.sectionId
          let sectionIndex
          if (sectionId) {
            const theItemSection = theForm?.builtFormMetadata?.pages.find((x) => x?.id === pageId)?.sections?.find((x) => x.id === sectionId)
            const theItemSectionName = formGetProperty(theItemSection?.formControlProperties, 'Section name', 'Section')
            const theItemSectionNameCamelCase = camelize(theItemSectionName)

            const theSection = copiedPrev?.data?.customerData?.find((x) => x?.sectionName === theItemSectionNameCamelCase) as FormSectionType
            console.log('customerData-sectionId', copiedPrev?.data?.customerData)
            if (theSection) {
              sectionIndex = copiedPrev?.data?.customerData?.findIndex((x) => x?.sectionName === theItemSectionNameCamelCase)

              theSection.data[theItemFieldNameCamelCase] = filterSuccessUploadedFiles[0].signedUrl
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: filterSuccessUploadedFiles[0].signedUrl,
                },
                pageId,
                sectionId,
              })
            }
          }
          return copiedPrev
        })
      }
    },
    [item, theForm]
  )

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

  const handleRemoveFile = (e: any, index: number) => {
    e.stopPropagation()
    const newFiles = uploadedFiles.filter((item, i) => i !== index)
    setuploadedFiles((prev) => newFiles)
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
          console.log('theSect', theSection)
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

  useEffect(() => {
    const theItemSectionOrPage = fillingFormState.data.customerData.find((x) => {
      if (x.sectionId) {
        return x.sectionId === item.sectionId
      } else {
        return x.pageId === item.pageId
      }
    })

    const theData = theItemSectionOrPage?.data[theItemFieldNameCamelCase]
    console.log('theData', theData)
    if (theData) {
      setFileUrl(theData)
      setuploadedFiles([theData])
    }
  }, [])

  useEffect(() => {
    // console.log('uploadedFiles', uploadedFiles)
    if (uploadedFiles?.length > 0) {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        copiedPrev[theItemFieldNameCamelCase] = uploadedFiles[0].signedUrl

        return copiedPrev
      })
    } else {
      setBackupForSwitchFormState((prev) => {
        const copiedPrev = { ...prev }
        delete copiedPrev[theItemFieldNameCamelCase]

        return copiedPrev
      })
    }
  }, [uploadedFiles])

  useEffect(() => {
    const backup = backupForSwitchFormState?.hasOwnProperty(theItemFieldNameCamelCase) ? backupForSwitchFormState[theItemFieldNameCamelCase] : null
    // console.log('backup', backup)
    if (!uploadedFiles?.length) {
      if (backup) {
        setuploadedFiles(backup)
        setFileUrl(backup)
      } else {
        setuploadedFiles(null)
        setFileUrl(null)
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

              theSection.data[theItemFieldNameCamelCase] = null
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: theItemSectionNameCamelCase,
                data: {
                  [theItemFieldNameCamelCase]: null,
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

              theSectionlessPage.data[theItemFieldNameCamelCase] = null
              copiedPrev.data.customerData.splice(sectionIndex, 1, theSectionlessPage)
            } else {
              copiedPrev.data.customerData.push({
                sectionName: pageNameToBeUsed,
                data: {
                  [theItemFieldNameCamelCase]: null,
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
      className={`${collapsed ? 'hidden' : ''}`}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `2px dotted green` : '',
      }}
      title={helpText}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>
      <div
        className=' w-full border  rounded-[12px]  h-[150px] p-2'
        style={{
          border: setRequiredFormFieldsRedux?.list?.find((x) => x.fieldLabel === theItemFieldNameCamelCase) ? '1px solid red' : '1px solid #AAAAAA',
        }}
      >
        {fileUploadError.isError && <p>{fileUploadError.message}</p>}
        {uploadedFiles?.length > 0 ? (
          <div className='relative flex items-center cursor-pointer '>
            <div className='max-w-[194px] border border-[#aaaaaa] h-[90%] rounded-[12px] p-2'>
              {Array.isArray(uploadedFiles) &&
                uploadedFiles.map((file, index) => {
                  return <IndividualFileForm file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
                })}
            </div>
          </div>
        ) : isUploading ? (
          <div className='flex items-center  h-[150px]'>
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
