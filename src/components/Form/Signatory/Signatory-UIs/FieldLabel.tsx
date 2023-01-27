import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React from 'react'

type Props = {
  id: SignatoryDetailType
  text: string
  colspan: number
}

const FieldLabel = ({ id, text = 'Label text', colspan = 1 }: Props) => {
  return (
    <div
      style={{
        maxWidth: ` ${Number(colspan) === 2 || Number(colspan) === 3 ? '100%' : '21.875rem'} `,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <label htmlFor={id.toString()}>{text}</label>
    </div>
  )
}

export default FieldLabel
