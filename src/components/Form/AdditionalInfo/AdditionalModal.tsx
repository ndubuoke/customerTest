import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'

import { Form } from 'Components/types/FormControl.types'

import React, { useState } from 'react'
import { generateID } from 'Utilities/generateId'
import TextInput from './Additional-UIs/TextInput'
import DropDown from './Additional-UIs/Dropdown'
import { AdditionalDetailField, AdditionalDetailType, AdditionalDetailsType } from 'Components/Form/Types/AdditionalTypes'
import Button from 'Components/Shareables/Button'
import { additionalDetailsInitial } from './initialData'

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

const AdditionalModal = ({
  closeModalFunction,
  details,
  setDetails,
  modification,
  additionalDetails,
  setAdditionalDetails,
  detailToModifyId,
}: Props) => {
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
    // setSignatories((prev: Array<any>) => [...prev, { ...signatoryDetails, id }])
    // setSignatoryDetails({ ...SignatoryDetailsInitial })
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
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[300px] min-w-[1000px] bg-white py-6 px-8 rounded-2xl max-h-[600px]`}>
        <div className=' w-full  min-h-[300px] flex flex-col  justify-between'>
          <div className='flex justify-between pb-4'>
            <h6 className='text-3xl text-text-secondary'>Executive/Directors Details</h6>
            <button onClick={closeModalFunction}>
              <img src={Close} />
            </button>
          </div>
          <hr />

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
            {additionalDetails.map((field) => {
              if (field.type === 'dropdown') {
                return (
                  <DropDown
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
                  <TextInput
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
        </div>
        <div className='flex justify-center my-6'>
          <Button
            disabled={false}
            onClick={() => {
              if (modification) {
                handleModifyAdditionalDetails(detailToModifyId)
              } else {
                handleAddAdditionalDetail(generateID())
              }
            }}
            text='Add'
          />
        </div>
      </div>
    </div>
  )
}

export default AdditionalModal
