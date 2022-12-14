import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'
import FormDropdown from 'Components/Form/Form-UIs/FormDropdown'
import DropDown from 'Components/Shareables/DropDown'
import { Form } from 'Components/types/FormControl.types'

// import Button from 'Components/Shareables/Button'
import React, { useState } from 'react'
import { generateID } from 'Utilities/generateId'
import TextInput from './ExecutiveandDirectors-UI/TextInput'
import TextArea from './ExecutiveandDirectors-UI/TextArea'
import ExecutiveDropDown from './ExecutiveandDirectors-UI/Dropdown'
import { ExecutiveDetailsType, ExecutiveDetailType, ExecutiveField } from 'Components/Form/Types/ExecutiveTypes'
import Button from 'Components/Shareables/Button'
import { ExecutiveDetailsInitial } from './initialData'

type Props = {
  closeModalFunction: () => void
  executives?: Array<any>
  setExecutives?: (value: any) => void
  executiveDetails: ExecutiveField[]
  setExecutiveDetails: (data: ExecutiveField[]) => void
  modification: boolean
  setModification: (prev: boolean) => void
}

const AddExecutiveModal = ({ closeModalFunction, executiveDetails, setExecutiveDetails, modification, executives, setExecutives }: Props) => {
  const handleUpdateFields = (id: string, value: string) => {
    const updatedFields = executiveDetails.map((field) => {
      if (field.id === id) {
        field = { ...field, value }
      }
      return field
    })
    setExecutiveDetails(updatedFields)
  }

  const handleAddExecutive = (id: string | number) => {
    setExecutives((prev: ExecutiveDetailsType[]) => [
      ...prev,
      executiveDetails.reduce(
        (acc, curr) => {
          acc[curr.fieldLabel] = curr.value
          return acc
        },
        { id }
      ),
    ])
    // setSignatories((prev: Array<any>) => [...prev, { ...signatoryDetails, id }])
    // setSignatoryDetails({ ...SignatoryDetailsInitial })
    setExecutiveDetails(ExecutiveDetailsInitial)
    closeModalFunction()
  }

  const handleModifyExecutive = (id: string | number) => {
    // const signatoryIndex = executives.findIndex((x) => x?.id === id)
    // setExecutives((prev) => {
    //   const copied = [...prev]

    //   copied.splice(signatoryIndex, 1, executiveDetails)
    //   return copied
    // })
    setExecutiveDetails({ ...ExecutiveDetailsInitial })
    closeModalFunction()
  }

  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[600px] min-w-[1000px] bg-white py-6 px-8 rounded-2xl `}>
        <div className=' w-full  min-h-[300px] flex flex-col  justify-between'>
          <div className='flex   justify-between  pb-4'>
            <h6 className='text-text-secondary text-3xl'>Executive/Directors Details</h6>
            <button onClick={closeModalFunction}>
              <img src={Close} />
            </button>
          </div>
          <hr />

          <div
            className=' flex'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <div className=' w-full flex flex-col gap-6 overflow-y-scroll max-h-[500px] ' style={{ paddingRight: '5rem' }}>
              {executiveDetails.map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <div key={field.id}>
                      {/* {field.fieldLabel} */}
                      <ExecutiveDropDown
                        optionsField={field.options}
                        required={field.required}
                        colspan={field.colSpan}
                        label={field.fieldLabel}
                        selectedDropdownItem={field.value || field.defaultValue}
                        setSelectedDropdownItem={(val: string) => handleUpdateFields(field.id, val)}
                      />
                    </div>
                  )
                }
                if (field.type === 'text' || field.type === 'date') {
                  return (
                    <div key={field.id} className='flex flex-col border-b '>
                      {/* {field.fieldLabel} */}
                      <TextInput
                        maximumNumbersOfCharacters={field.maxLength}
                        placeholder={field.placeholder}
                        required={field.required}
                        label={field.fieldLabel}
                        colspan={field.colSpan}
                        value={field.value}
                        type={field.type}
                        setValue={(val: string) => handleUpdateFields(field.id, val)}
                      />
                      {/* <input
                        value={field.value}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        onChange={(ev) => handleUpdateFields(field.id, ev.target.value)}
                      /> */}
                    </div>
                  )
                }

                if (field.type === 'textarea') {
                  return (
                    <div key={field.id}>
                      <TextArea
                        maximumNumbersOfCharacters={field.maxLength}
                        placeholder={field.placeholder}
                        required={field.required}
                        label={field.fieldLabel}
                        colspan={field.colSpan}
                        value={field.value}
                        setValue={(val: string) => handleUpdateFields(field.id, val)}
                      />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        <div className='flex justify-center my-6'>
          <Button
            disabled={false}
            onClick={() => {
              if (modification) {
                handleModifyExecutive(executiveDetails['id'])
              } else {
                handleAddExecutive(generateID())
              }
            }}
            text='Done'
          />
        </div>
      </div>
    </div>
  )
}

export default AddExecutiveModal
