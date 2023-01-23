import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'

import React, { useState, useMemo } from 'react'
import { generateID } from 'Utilities/generateId'
import { AffiliatedCompanyDetailField, AffiliatedCompanyDetailsType } from 'Components/Form/Types/AdditionalTypes'
import Button from 'Components/Shareables/Button'
import { affiliatedCompanyDetailsInitial } from '../initialData'
import AdditionalTextInput from '../Additional-UIs/TextInput'
import AdditionalDropDown from '../Additional-UIs/Dropdown'

type Props = {
  affiliatedCompanyDetails: AffiliatedCompanyDetailField[]
  setAffiliatedCompanyDetails: (data: AffiliatedCompanyDetailField[]) => void
}

const AffiliatedCompanyModal = ({ affiliatedCompanyDetails, setAffiliatedCompanyDetails }: Props) => {
  const handleUpdateFields = (id: string, value: string) => {
    const updatedFields = affiliatedCompanyDetails.map((field) => {
      if (field.id === id) {
        field = { ...field, value }
      }
      return field
    })
    setAffiliatedCompanyDetails(updatedFields)
  }

  return (
    <div
      className='flex '
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        padding: '10px',
        paddingBottom: '3rem',
        paddingTop: '1rem',
      }}
    >
      {affiliatedCompanyDetails.map((field) => {
        if (field.type === 'dropdown') {
          return (
            <AdditionalDropDown
              key={field.id}
              optionsField={field.options}
              required={field.required}
              colspan={field.colSpan}
              label={field.fieldLabel}
              selectedDropdownItem={field.value || field.defaultValue}
              setSelectedDropdownItem={(val: string) => handleUpdateFields(field.id, val)}
            />
          )
        }
        if (field.type === 'text' || field.type === 'date') {
          return (
            <AdditionalTextInput
              key={field.id}
              maximumNumbersOfCharacters={field.maxLength}
              placeholder={field.placeholder}
              required={field.required}
              label={field.fieldLabel}
              colspan={field.colSpan}
              value={field.value}
              type={field.type}
              setValue={(val: string) => handleUpdateFields(field.id, val)}
            />
          )
        }
      })}
    </div>
  )
}

export default AffiliatedCompanyModal
