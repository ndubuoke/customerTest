import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'
import { AdditionalDetailField, AdditionalDetailsType } from 'Components/Form/Types/AdditionalTypes'

import { Form } from 'Components/types/FormControl.types'

import React, { useState, useMemo } from 'react'
import { generateID } from 'Utilities/generateId'
import { additionalDetailsInitial } from '../initialData'
import Button from 'Components/Shareables/Button'
import AdditionalTextInput from '../Additional-UIs/TextInput'
import AdditionalDropDown from '../Additional-UIs/Dropdown'
// import TextInput from './Additional-UIs/TextInput'
// import DropDown from './Additional-UIs/Dropdown'
// import { AdditionalDetailField, AdditionalDetailType, AdditionalDetailsType } from 'Components/Form/Types/AdditionalTypes'
// import Button from 'Components/Shareables/Button'
// import { additionalDetailsInitial } from './initialData'

type Props = {
  detailToModifyId: string
  closeModalFunction: () => void
  details?: Array<any>
  setDetails?: (value: any) => void
  additionalDetails: AdditionalDetailField[]
  setAdditionalDetails: (data: AdditionalDetailField[]) => void
  modification: boolean
  setModification: (prev: boolean) => void
}

const AffiliatedSection = ({
  closeModalFunction,
  details,
  setDetails,
  modification,
  additionalDetails,
  setAdditionalDetails,
  detailToModifyId,
}: Props) => {
  const submitBtnIsDisabled = useMemo(() => {
    return additionalDetails.some((detail) => detail.required === 'on' && !detail.value)
  }, [additionalDetails])
  const handleUpdateFields = (id: string, value: string) => {
    const updatedFields = additionalDetails.map((field) => {
      if (field.id === id) {
        field = { ...field, value }
      }
      return field
    })
    setAdditionalDetails(updatedFields)
  }

  const handleAddAdditionalDetail = (id: string | number) => {
    setDetails((prev: AdditionalDetailsType[]) => [
      ...prev,
      additionalDetails.reduce(
        (acc, curr) => {
          acc[curr.fieldLabel] = curr.value
          return acc
        },
        { id }
      ),
    ])

    setAdditionalDetails(additionalDetailsInitial())
    closeModalFunction()
  }

  const handleModifyAdditionalDetails = (id: string | number) => {
    console.log('id', id)
    setDetails((prev: AdditionalDetailsType[]) =>
      prev.map((executive) => {
        if (executive.id === id) {
          executive = additionalDetails.reduce(
            (acc, curr) => {
              acc[curr.fieldLabel as any] = curr.value
              return acc
            },
            { id } as AdditionalDetailsType
          )
        }
        return executive
      })
    )
    setAdditionalDetails([...additionalDetailsInitial()])
    closeModalFunction()
  }

  return (
    <div>
      {additionalDetails.map((field) => {
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

export default AffiliatedSection
