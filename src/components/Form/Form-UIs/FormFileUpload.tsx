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
import IndividualFile from 'Components/Shareables/IndividualFile'
import { add } from 'Assets/svgs'
import { FormStructureType, FormSectionType } from 'Components/types/FormStructure.types'
import { API } from 'Utilities/api'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
  setFillingFormState: any
  publishedFormState: ResponseType
  activePageState?: PageInstance

  fillingFormState: FormStructureType
}

export type UploadFile = {
  file: File
  signedUrl: string
}

const FormFileUpload = ({ item, collapsed, setFillingFormState, publishedFormState, fillingFormState }: Props) => {
  const theForm = publishedFormState?.serverResponse?.data as Form
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const allowableFileTypes = formGetProperty(item.formControlProperties, 'Allowable File Types', 'png, jpg, pdf')

  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [fileUploadError, setFileUploadError] = useState(false)

  const theItemFieldNameCamelCase = camelize(fieldLabel)

  const onDrop = useCallback(
    async (acceptedFiles: Array<File>, fileRejections) => {
      // console.log({ file: acceptedFiles[0], key: Date.now() })
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
            return null
          }
        } catch (err) {
          console.error(err.message, `failed to upload file - ${file.name}`)
          return null
        }
      })
      if (fileRejections.length) {
        setFileUploadError(true)
        return
      }
      const awaitUploadedFiles = await Promise.all(uploadedFiles)
      const filterSuccessUploadedFiles = awaitUploadedFiles.filter((file) => file !== null)
      setuploadedFiles(filterSuccessUploadedFiles)
      // setuploadedFiles([{ file: acceptedFiles[0], key: Date.now().toString() }])
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

            theSection.data[theItemFieldNameCamelCase] = {
              file: {
                type: filterSuccessUploadedFiles[0].file.type,
              },
              signedUrl: filterSuccessUploadedFiles[0].signedUrl,
            }
            copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
          } else {
            copiedPrev.data.customerData.push({
              sectionName: theItemSectionNameCamelCase,
              data: {
                [theItemFieldNameCamelCase]: {
                  file: {
                    type: filterSuccessUploadedFiles[0].file.type,
                  },
                  signedUrl: filterSuccessUploadedFiles[0].signedUrl,
                },
              },
              pageId,
              sectionId,
            })
          }
        }
        return copiedPrev
      })
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
          delete theSection.data[theItemFieldNameCamelCase]
          copiedPrev.data.customerData.splice(sectionIndex, 1, theSection)
        }
      }
      return copiedPrev
    })
    setuploadedFiles((prev) => newFiles)
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
    if (theData) {
      setuploadedFiles([theData])
    }
  }, [])

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} `}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `2px dotted green` : '',
      }}
      title={helpText}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel fieldItem={item} />
      </div>
      <div className='relative w-full border border-[#AAAAAA]rounded-[12px] pl-2'>
        {uploadedFiles?.length === 0 && (
          <div {...getRootProps()} className='cursor-pointer relative  h-[150px]'>
            <input type={`file`} hidden {...getInputProps()} multiple={false} />

            <button className='absolute bottom-0 right-0' style={{ marginTop: 'auto' }}>
              <img src={add} className='inline mr-1' />
            </button>
          </div>
        )}

        {uploadedFiles?.length > 0 && (
          <div className='cursor-pointer relative flex items-center h-[150px] '>
            <div className='max-w-[194px] border border-[#aaaaaa] h-[90%] rounded-[12px] p-2'>
              {uploadedFiles.map((file: UploadFile, index) => {
                return <IndividualFile file={file} key={index} removeFile={(e) => handleRemoveFile(e, index)} />
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormFileUpload
