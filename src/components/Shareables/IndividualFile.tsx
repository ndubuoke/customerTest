import React, { useState, memo, useRef } from 'react'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
// import { UploadFile } from '.'
import RemoveButton from './RemoveButton'
import PdfImage from '../../assets/images/pdf.png'
type Props = {
  file: {
    file: File
    key?: string
    signedUrl?: string
    verificationData?: {
      docType: string
      extractedData: string[]
    }
  }
  removeFile: (item: any) => void
  height?: number
  waiverRequest?: boolean
}

const IndividualFile = memo(({ file, removeFile, height = 110, waiverRequest = false }: Props) => {
  const [showRemove, setShowRemove] = useState<boolean>(true)

  // console.log('file', file.file)
  // console.log('signUrl', file.signedUrl)
  // console.log('only file', file)
  if (waiverRequest) {
    return (
      <div className={`relative border rounded-sm`}>
        <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
        {file.file.type.startsWith('image') && (
          <img
            src={file.signedUrl || URL.createObjectURL(file.file)}
            className='object-contain'
            width={194}
            height={height}
            style={{ width: '194', height }}
          />
        )}
      </div>
    )
  }
  return (
    <div className={`relative h-[${height}px] w-[12.125rem]`} onClick={(e) => e.stopPropagation()}>
      <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
      <div className={`h-[${height}px] w-[12.125rem]`}>
        {file.file.type.startsWith('image') && (
          <img
            src={file.signedUrl || URL.createObjectURL(file.file)}
            className='object-contain'
            width={194}
            height={height}
            style={{ width: '194', height }}
          />
        )}
        {/* {file.includes('.pdf') && } */}
        {file.file.type.endsWith('pdf') && (
          <img src={PdfImage} className='object-contain' width={194} height={height} style={{ width: '194px', height }} />
        )}
      </div>
      {/* <p>Upload Key: {file.key}</p> */}
    </div>
  )
})

export default IndividualFile
