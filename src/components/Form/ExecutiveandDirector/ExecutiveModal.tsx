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
import { ExecutiveDetailType } from 'Components/Form/Types/ExecutiveTypes'
// import FormDate from '../Sharables/IndependentFormDate'
// import IndependentFormDropdown from '../Sharables/IndependentFormDropdown'
// import FormTextArea from '../Sharables/IndependentFormTextArea'

type Props = {
  closeModalFunction: () => void
}

type Field = {
  id: string
  type: 'dropdown' | 'text' | 'date' | 'textarea'
  defaultValue: string
  value: string
  error: string
  required: 'on' | 'off'
  colSpan: number
  fieldLabel: ExecutiveDetailType
  placeholder: string
  options?: string[]
  maxLength?: number
}

const AddExecutiveModal = ({ closeModalFunction }: Props) => {
  const [fields, setFields] = useState<Field[]>([
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Title',
      defaultValue: '',
      value: '',
      error: '',
      required: 'on',
      colSpan: 1,
      placeholder: 'select',
      options: ['mr', 'mrs', 'pastor', 'herbalist'],
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Enter Surname',
      defaultValue: '',
      value: '',
      error: '',
      required: 'on',
      colSpan: 2,
      placeholder: 'enter surname',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Enter FirstName',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter First name',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Enter Other Names',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Other Names',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'date',
      fieldLabel: 'Date of Birth',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: '',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: "Mother's Maiden Name",
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Name',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Gender',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Select ',
      options: ['male', 'female', 'others'],
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Residential Address',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Address',
      maxLength: 160,
    },
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Marital Status',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Select ',
      options: ['single', 'married', 'complicated', 'divorced'],
    },
    {
      id: generateID(),
      type: 'textarea',
      fieldLabel: 'Detailed Description of Address',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Description ',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Mobile Number',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Mobile Number',
    },
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Means of Identification',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Select ',
      options: ['bvn', 'pvc', 'drivers license', 'nin'],
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Enter ID Number',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'ID Number',
    },
    {
      id: generateID(),
      type: 'date',
      fieldLabel: 'ID Issue Date',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: '',
    },
    {
      id: generateID(),
      type: 'date',
      fieldLabel: 'ID Expiry Date',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: '',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Biometric ID Number',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Biometric ID Number',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Nationality',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Nationality',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'State of Origin',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter State of Origin',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'LGA',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter LGA',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'City/Town',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter City/Town',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Occupation',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Occupation',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Status/Job Title',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Status/Job Title',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Position/office of the officer',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Position',
    },
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Do you have Dual Citizenship',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Select ',
      options: ['yes', 'no'],
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'If yes, specify',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: '',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Social Secret Number',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter SSN',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Employee Identification Number',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter EIN',
    },
    {
      id: generateID(),
      type: 'text',
      fieldLabel: 'Percentage Holding',
      defaultValue: '',
      value: '',
      error: '',
      required: 'off',
      colSpan: 2,
      placeholder: 'Enter Percentage Holding',
    },
  ])
  const handleUpdateFields = (id: string, value: string) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        field = { ...field, value }
      }
      return field
    })
    setFields(updatedFields)
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
              //   display: 'grid',
              //   gridTemplateColumns: '1fr 1fr 1fr',
              //   gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <div className=' w-full flex flex-col gap-6 overflow-y-scroll max-h-[500px] ' style={{ paddingRight: '5rem' }}>
              {fields.map((field) => {
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
                // if (field.type === 'date') {
                //   return (
                //     <div className='flex flex-col border-b '>
                //       {field.fieldLabel}
                //       <input
                //         type='date'
                //         value={field.value}
                //         placeholder={field.placeholder}
                //         defaultValue={field.defaultValue}
                //         onChange={(ev) => handleUpdateFields(field.id, ev.target.value)}
                //       />
                //     </div>
                //   )
                // }
                if (field.type === 'textarea') {
                  return (
                    <div key={field.id} className='flex flex-col'>
                      {/* {field.fieldLabel} */}
                      <TextArea
                        maximumNumbersOfCharacters={field.maxLength}
                        placeholder={field.placeholder}
                        required={field.required}
                        label={field.fieldLabel}
                        colspan={field.colSpan}
                        value={field.value}
                        setValue={(val: string) => handleUpdateFields(field.id, val)}
                      />
                      {/* <textarea
                        className='border rounded-lg min-h-[190px] pl-2 pt-2'
                        value={field.value}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        onChange={(ev) => handleUpdateFields(field.id, ev.target.value)}
                      /> */}
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddExecutiveModal
