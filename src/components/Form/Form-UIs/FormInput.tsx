import React, { useEffect } from 'react'
import { getProperty } from 'Utilities/getProperty'
import { FormControlType, FormControlTypeWithSection } from '../Types'
import FieldLabel from './FieldLabel'
import { fieldsNames } from './FormLayout'

type Props = {
  item: FormControlType | FormControlTypeWithSection
  collapsed: boolean
}

const FormInput = ({ item, collapsed }: Props) => {
  const span = getProperty(item.formControlProperties, 'Col Span', 'value').text
  const fieldLabel = getProperty(item.formControlProperties, 'Field label', 'value').text
    ? getProperty(item.formControlProperties, 'Field label', 'value').text
    : getProperty(item.formControlProperties, 'Field label', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Field label', 'defaultState').text
    : ''
  const required = getProperty(item.formControlProperties, 'Set as Required', 'value').text
    ? getProperty(item.formControlProperties, 'Set as Required', 'value').text
    : getProperty(item.formControlProperties, 'Set as Required', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Set as Required', 'defaultState').text
    : 'off'
  const placeholder = getProperty(item.formControlProperties, 'Placeholder', 'value').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'value').text
    : getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Placeholder', 'defaultState').text
    : `Enter ${fieldLabel}`
  const helpText = getProperty(item.formControlProperties, 'Help text', 'value').text
    ? getProperty(item.formControlProperties, 'Help text', 'value').text
    : getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    ? getProperty(item.formControlProperties, 'Help text', 'defaultState').text
    : fieldLabel

  return (
    <div
      className={`${collapsed ? 'hidden' : ''} `}
      style={{
        gridColumn: ` span ${span}`,
        // border: clickedFormControl?.control?.name === item.name ? `2px dotted green` : '',
      }}
      title={helpText}
    >
      <FieldLabel fieldItem={item} />
      <div>
        <input
          className={`flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-text-secondary`}
          type={
            item.name === fieldsNames.INFOTEXT || item.name === fieldsNames.LONGTEXT || item.name === fieldsNames.SHORTEXT
              ? 'text'
              : item.name === fieldsNames.PHONEINPUT
              ? 'tel'
              : item.name === fieldsNames.PASSWORD
              ? 'password'
              : item.name === fieldsNames.URL
              ? 'url'
              : item.name === fieldsNames.NUMBERCOUNTER
              ? 'number'
              : ''
          }
          required={required.toLowerCase() === 'on'}
          placeholder={placeholder}
          title={helpText}
        />
      </div>
    </div>
  )
}

export default FormInput
