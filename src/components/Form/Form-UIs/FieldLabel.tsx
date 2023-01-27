import React from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'

type Props = {
  fieldItem: FormControlType | FormControlTypeWithSection
}

const FieldLabel = ({ fieldItem }: Props) => {
  let colspan = getProperty(fieldItem.formControlProperties, 'Col Span', 'value').text
  return (
    <div
      style={{
        maxWidth: ` ${Number(colspan) === 2 || Number(colspan) === 3 ? '100%' : '21.875rem'} `,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <label>
        {getProperty(fieldItem.formControlProperties, 'Field label', 'value').text
          ? getProperty(fieldItem.formControlProperties, 'Field label', 'value').text
          : getProperty(fieldItem.formControlProperties, 'Field label', 'defaultState').text
          ? getProperty(fieldItem.formControlProperties, 'Field label', 'defaultState').text
          : 'Field Label'}
      </label>
    </div>
  )
}

export default FieldLabel
