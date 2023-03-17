import { RemoveButton } from 'Components/Shareables'
import React, { useState, memo, useRef } from 'react'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
// import { UploadFile } from '.'
import PdfImage from '../../../assets/images/pdf.png'

type Props = {
  file: string
  removeFile: (item: any) => void
  height?: number
  waiverRequest?: boolean
}

const IndividualFileForm = memo(({ file, removeFile, height = 110, waiverRequest = false }: Props) => {
  const [showRemove, setShowRemove] = useState<boolean>(true)
  const isImage = file.includes('.png') || file.includes('.jpg') || file.includes('.jpeg')
  // console.log('file', file.file)
  if (waiverRequest) {
    return (
      <div className={`relative border rounded-sm`}>
        <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
        {isImage && <img src={file} className='object-contain' width={194} height={height} style={{ width: '194', height }} />}
      </div>
    )
  }
  return (
    <div className={`relative h-[${height}px] w-[12.125rem]`} onClick={(e) => e.stopPropagation()}>
      <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
      <div className={`h-[${height}px] w-[12.125rem]`}>
        {isImage && <img src={file} className='object-contain' width={194} height={height} style={{ width: '194px', height }} />}
        {file.includes('.pdf') && <img src={PdfImage} className='object-contain' width={194} height={height} style={{ width: '194px', height }} />}
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

export default IndividualFileForm
