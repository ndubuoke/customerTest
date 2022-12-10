import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'
import FormDropdown from 'Components/Form/Form-UIs/FormDropdown'
import DropDown from 'Components/Shareables/DropDown'
import { Form } from 'Components/types/FormControl.types'

// import Button from 'Components/Shareables/Button'
import React, { useState } from 'react'
import { generateID } from 'Utilities/generateId'
import IndependentFormDropdown from '../Sharables/IndependentFormDropdown'
import FormTextArea from '../Sharables/IndependentFormTextArea'

type props = {
  setShowCustomerModal: (e) => void
  //   customer: {}
}

type Field = {
  id: string
  type: 'dropdown' | 'textfield' | 'date' | 'textarea'
  defaultValue: string
  value: string
  error: string
  required: boolean
  colSpan: number
  label: string
  placeholder: string
  options?: string[]
  maxLength?: number
  fieldLabel?: string
}

const AddExecutiveModal = ({ setShowCustomerModal }: props) => {
  const [fields, setFields] = useState<Field[]>([
    {
      id: generateID(),
      type: 'dropdown',
      fieldLabel: 'Title',
      defaultValue: '',
      value: '',
      error: '',
      required: false,
      colSpan: 1,
      label: 'title',
      placeholder: 'select',
      options: ['mr', 'mrs', 'pastor', 'herbalist'],
    },
    {
      id: generateID(),
      type: 'textfield',
      fieldLabel: 'Enter Surname',
      defaultValue: '',
      value: '',
      error: '',
      required: false,
      colSpan: 2,
      label: 'surname',
      placeholder: 'enter surname',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'textfield',
      fieldLabel: 'Enter FirstName',
      defaultValue: '',
      value: '',
      error: '',
      required: false,
      colSpan: 2,
      label: 'surname',
      placeholder: 'Enter First name',
      maxLength: 30,
    },
    {
      id: generateID(),
      type: 'textfield',
      fieldLabel: 'Enter Other Names',
      defaultValue: '',
      value: '',
      error: '',
      required: false,
      colSpan: 2,
      label: 'surname',
      placeholder: 'Enter Other Names',
      maxLength: 30,
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
  const closeModal = () => {
    setShowCustomerModal(false)
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
            <button onClick={closeModal}>
              <img src={Close} />
            </button>
          </div>
          <hr />

          <div
            className=' flex'
            style={{
              display: 'grid',
              //   gridTemplateColumns: '1fr 1fr 1fr',
              //   gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          >
            <div className=' w-full flex flex-col gap-6'>
              {fields.map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <div>
                      {field.fieldLabel}
                      <IndependentFormDropdown
                        options={field.options}
                        defaultOption={field.defaultValue}
                        selectedOption={field.value}
                        handleChange={(val: string) => handleUpdateFields(field.id, val)}
                      />
                    </div>
                  )
                }
                if (field.type === 'textfield') {
                  return (
                    <div className='flex flex-col border-b '>
                      {field.fieldLabel}
                      <input
                        value={field.value}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        onChange={(ev) => handleUpdateFields(field.id, ev.target.value)}
                      />
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
