import React, { useState, memo } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { UploadFile } from './FileUploader'
import RemoveButton from './RemoveButton'

type Props = {
  file: UploadFile
  removeFile: (item: any) => void
}

const IndividualFile = memo(({ file, removeFile }: Props) => {
  const [showRemove, setShowRemove] = useState<boolean>(true)
  // console.log('file', file)
  return (
    <div className='relative' onClick={(e) => e.stopPropagation()}>
      <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
      <div>
        {file.file.type.startsWith('image') && (
          <img src={URL.createObjectURL(file.file)} className='object-contain' style={{ width: '194', height: '104px' }} />
        )}
        {file.file.type.endsWith('pdf') && (
          <Document file={file.file}>
            <Page pageNumber={1} width={94} height={104} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        )}
      </div>
      {/* <p>Upload Key: {file.key}</p> */}
    </div>
  )
})

export default IndividualFile
