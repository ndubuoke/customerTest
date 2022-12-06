import React, { useState, memo, useRef } from 'react'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
// import { UploadFile } from '.'
import RemoveButton from './RemoveButton'

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
}

const IndividualFile = memo(({ file, removeFile }: Props) => {
  const [showRemove, setShowRemove] = useState<boolean>(true)
  // console.log('file', file.file)
  return (
    <div className='relative' onClick={(e) => e.stopPropagation()}>
      <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
      <div>
        {file.file.type.startsWith('image') && (
          <img
            src={file.signedUrl || URL.createObjectURL(file.file)}
            className='object-contain'
            width={194}
            height={104}
            style={{ width: '194', height: '104px' }}
          />
        )}
        {/* {file.file.type.endsWith('pdf') && (

          <Document file={file.signedUrl || file.file}>
            <Page pageNumber={1} width={94} height={104} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        )} */}
      </div>
      {/* <p>Upload Key: {file.key}</p> */}
    </div>
  )
})

export default IndividualFile
