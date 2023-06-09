import { AdditionalDetailType, AffiliatedCompanyDetailType } from 'Components/Form/Types/AdditionalTypes'
import React from 'react'

type Props = {
  id: AdditionalDetailType | AffiliatedCompanyDetailType
  text: string
  colspan: number
}

const FieldLabel = ({ id, text = 'Label text', colspan = 1 }: Props) => {
  return (
    <div
      style={{
        maxWidth: ` ${Number(colspan) === 2 || Number(colspan) === 3 ? '100%' : '350px'} `,
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
