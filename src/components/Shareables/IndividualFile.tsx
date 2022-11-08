import React, { useState, memo } from 'react'
import RemoveButton from './RemoveButton'

type Props = {
  file: File
  removeFile: (item: any) => void
}

const IndividualFile = memo(({ file, removeFile }: Props) => {
  const [showRemove, setShowRemove] = useState<boolean>(true)

  return (
    <div className='relative' onClick={(e) => e.stopPropagation()}>
      <RemoveButton onClick={removeFile} showRemoveButton={showRemove} />
      <div>
        {file.type.startsWith('image') ? (
          <img src={URL.createObjectURL(file)} className='object-contain' style={{ width: '174', height: '104px' }} />
        ) : null}
      </div>
    </div>
  )
})

export default IndividualFile
