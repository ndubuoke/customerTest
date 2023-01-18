import { add, Avatar, Close, customer360, Disable, Edit } from 'Assets/svgs'
import FormDropdown from 'Components/Form/Form-UIs/FormDropdown'
import DropDown from 'Components/Shareables/DropDown'
import { Form } from 'Components/types/FormControl.types'

// import Button from 'Components/Shareables/Button'
import React, { useState, useMemo, useEffect } from 'react'
import { generateID } from 'Utilities/generateId'
import { API } from 'Utilities/api'
import TextInput from './ExecutiveandDirectors-UI/TextInput'
import TextArea from './ExecutiveandDirectors-UI/TextArea'
import ExecutiveDropDown from './ExecutiveandDirectors-UI/Dropdown'
import { ExecutiveDetailsType, ExecutiveDetailType, ExecutiveField } from 'Components/Form/Types/ExecutiveTypes'
import Button from 'Components/Shareables/Button'
import { executiveDetailsInitial } from './initialData'

type Props = {
  detailToModifyId: string
  closeModalFunction: () => void
  executives?: Array<any>
  setExecutives?: (value: any) => void
  executiveDetails: ExecutiveField[]
  setExecutiveDetails: (data: ExecutiveField[]) => void
  modification: boolean
  setModification: (prev: boolean) => void
}

const meansOfIdentificationLength = {
  bvn: 11,
  pvc: 11,
  'Drivers license': 11,
  nin: 11,
}

const AddExecutiveModal = ({
  closeModalFunction,
  executiveDetails,
  setExecutiveDetails,
  modification,
  executives,
  setExecutives,
  detailToModifyId,
}: Props) => {
  const [identification, setIdentification] = useState({ meansOfIdentification: '', idNumber: '' })
  const submitBtnIsDisabled = useMemo(() => {
    console.log('executiveDetails', executiveDetails)
    return executiveDetails.some((detail) => detail.required === 'on' && !detail.value)
  }, [executiveDetails])

  useEffect(() => {
    console.log('identification', identification)
    if (
      identification.meansOfIdentification &&
      identification.idNumber.length === meansOfIdentificationLength[identification.meansOfIdentification]
    ) {
      //call the required API
      API.get(`/verification/${identification.meansOfIdentification}/${identification.idNumber.trim()}`)
        .then((response) => {
          //handle response
          console.log('response', response)
          if (response.status == 200 && response.data?.data) {
            const updatedFields = executiveDetails.map((field) => {
              if (field.apiProperty) {
                field['value'] = response.data.data[field.apiProperty]
              }
              return field
            })
            setExecutiveDetails(updatedFields)
          }
        })
        .catch((err) => {
          //handle error
          console.log('err', err)
        })
    }
  }, [identification.meansOfIdentification, identification.idNumber])

  const handleUpdateFields = (id: string, value: string) => {
    const updatedFields = executiveDetails.map((field) => {
      if (field.id === id) {
        console.log('field', field)
        field = { ...field, value }
        if (field.fieldLabel === 'Means of Identification') {
          setIdentification((prev) => ({ ...prev, meansOfIdentification: value.toLowerCase() }))
        } else if (field.fieldLabel === 'Enter ID Number') {
          setIdentification((prev) => ({ ...prev, idNumber: value }))
        }
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
    setExecutiveDetails(executiveDetailsInitial())
    closeModalFunction()
  }

  const handleModifyExecutive = (id: string) => {
    console.log('executives-id', id)
    console.log('executives', executives)
    // const signatoryIndex = executives.findIndex((x) => x?.id === id)
    // setExecutives((prev) => {
    //   const copied = [...prev]

    //   copied.splice(signatoryIndex, 1, executiveDetails)
    //   return copied
    // })
    setExecutives((prev: ExecutiveDetailsType[]) =>
      prev.map((executive) => {
        if (executive.id === id) {
          executive = executiveDetails.reduce(
            (acc, curr) => {
              acc[curr.fieldLabel] = curr.value
              return acc
            },
            { id } as ExecutiveDetailsType
          )
        }
        return executive
      })
    )
    setExecutiveDetails([...executiveDetailsInitial()])
    closeModalFunction()
  }

  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[500px] min-w-[1000px] bg-white py-6 px-8 rounded-2xl max-h-[650px] `}>
        <div className=' w-full  min-h-[300px] flex flex-col  justify-between'>
          <div className='flex justify-between pb-4'>
            <h6 className='text-3xl text-text-secondary'>Executive/Directors Details</h6>
            <button onClick={closeModalFunction}>
              <img src={Close} />
            </button>
          </div>
          <hr />

          {/* <div
            className='flex '
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '20px',
              padding: '10px',
              paddingBottom: '3rem',
              paddingTop: '1rem',
            }}
          > */}
          <div className=' w-full flex flex-col gap-6 overflow-y-scroll max-h-[500px] ' style={{ paddingRight: '5rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '20px',
                padding: '10px',
                paddingBottom: '3rem',
                paddingTop: '1rem',
              }}
            >
              {executiveDetails.slice(0, 6).map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <ExecutiveDropDown
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

                if (field.type === 'textarea') {
                  return (
                    <TextArea
                      key={field.id}
                      maximumNumbersOfCharacters={field.maxLength}
                      placeholder={field.placeholder}
                      required={field.required}
                      label={field.fieldLabel}
                      colspan={field.colSpan}
                      value={field.value}
                      setValue={(val: string) => handleUpdateFields(field.id, val)}
                    />
                  )
                }
              })}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '20px',
                padding: '10px',
                paddingBottom: '3rem',
                paddingTop: '1rem',
              }}
            >
              {executiveDetails.slice(6, 32).map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <ExecutiveDropDown
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

                if (field.type === 'textarea') {
                  return (
                    <TextArea
                      key={field.id}
                      maximumNumbersOfCharacters={field.maxLength}
                      placeholder={field.placeholder}
                      required={field.required}
                      label={field.fieldLabel}
                      colspan={field.colSpan}
                      value={field.value}
                      setValue={(val: string) => handleUpdateFields(field.id, val)}
                    />
                  )
                }
              })}
            </div>
            {/* <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '20px',
                padding: '10px',
                paddingBottom: '3rem',
                paddingTop: '1rem',
              }}
            >
              {executiveDetails.slice(12, 18).map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <ExecutiveDropDown
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

                if (field.type === 'textarea') {
                  return (
                    <TextArea
                      key={field.id}
                      maximumNumbersOfCharacters={field.maxLength}
                      placeholder={field.placeholder}
                      required={field.required}
                      label={field.fieldLabel}
                      colspan={field.colSpan}
                      value={field.value}
                      setValue={(val: string) => handleUpdateFields(field.id, val)}
                    />
                  )
                }
              })}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '20px',
                padding: '10px',
                paddingBottom: '3rem',
                paddingTop: '1rem',
              }}
            >
              {executiveDetails.slice(18, 24).map((field) => {
                if (field.type === 'dropdown') {
                  return (
                    <ExecutiveDropDown
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

                if (field.type === 'textarea') {
                  return (
                    <TextArea
                      key={field.id}
                      maximumNumbersOfCharacters={field.maxLength}
                      placeholder={field.placeholder}
                      required={field.required}
                      label={field.fieldLabel}
                      colspan={field.colSpan}
                      value={field.value}
                      setValue={(val: string) => handleUpdateFields(field.id, val)}
                    />
                  )
                }
              })}
            </div> */}
          </div>
          {/* </div> */}
        </div>
        <div className='flex justify-center my-6'>
          <Button
            disabled={submitBtnIsDisabled}
            onClick={() => {
              if (modification) {
                handleModifyExecutive(detailToModifyId)
              } else {
                handleAddExecutive(generateID())
              }
            }}
            text='Add'
          />
        </div>
      </div>
    </div>
  )
}

export default AddExecutiveModal
