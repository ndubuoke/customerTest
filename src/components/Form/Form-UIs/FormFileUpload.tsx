import React, { useEffect, useState, useCallback } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import { formGetProperty } from './formGetProperty'
import { fieldsNames } from './FormLayout'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDropzone, FileRejection } from 'react-dropzone'
import { compareTwoArrays } from 'Utilities/compareTwoArrays'
import IndividualFile from 'Components/Shareables/IndividualFile'
import { add } from 'Assets/svgs'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

export type UploadFile = {
  file: File
  key: string
}

const FormFileUpload = ({ item, collapsed }: Props) => {
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text

  const fieldLabel = formGetProperty(item.formControlProperties, 'Field label', 'Field label')
  const required = formGetProperty(item.formControlProperties, 'Set as Required', 'off')
  const placeholder = formGetProperty(item.formControlProperties, 'Placeholder', `Enter ${fieldLabel}`)
  const helpText = formGetProperty(item.formControlProperties, 'Help text', fieldLabel)
  const maximumNumbersOfCharacters = formGetProperty(item.formControlProperties, 'Maximum Number of characters', '160')
  const allowableFileTypes = 'pdf' // formGetProperty(item.formControlProperties, 'Allowable File Types', 'png, jpg, pdf')

  const [uploadedFiles, setuploadedFiles] = useState<Array<UploadFile>>([])
  const [fileUploadError, setFileUploadError] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: Array<File>, fileRejections) => {
    // console.log({ file: acceptedFiles[0], key: Date.now() })
    if (fileRejections.length) {
      setFileUploadError(true)
      return
    }

    setuploadedFiles([{ file: acceptedFiles[0], key: Date.now().toString() }])
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.log('fileRejections', fileRejections)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: compareTwoArrays(allowableFileTypes.split(','), ['png', 'jpg', 'pdf'])
      ? {
          'image/jpeg': [],
          'image/png': [],
          'application/pdf': ['.pdf'],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['png', 'jpg'])
      ? {
          'image/jpeg': [],
          'image/png': [],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['pdf'])
      ? {
          'application/pdf': ['.pdf'],
        }
      : compareTwoArrays(allowableFileTypes.split(','), ['pdf', 'jpg'])
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
  }

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
            {uploadedFiles?.length === 0 ? <input type={`file`} hidden {...getInputProps()} multiple={false} /> : null}

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
