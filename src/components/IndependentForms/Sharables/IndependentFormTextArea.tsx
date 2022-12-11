import { Form, FormControlType, FormControlTypeWithSection, PageInstance, PageProperty } from 'Components/types/FormControl.types'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateID } from 'Utilities/generateId'

type Props = {
  property: PageProperty
  characterMaxLength: number

  setForm: (form: Form) => any
  activeControlId?: string
}

const FormTextArea = memo(({ property, characterMaxLength, setForm, activeControlId }: Props) => {
  // console.log('newid', activeControlId)
  const dispatch = useDispatch()
  const id = generateID()

  const [theValue, setTheValue] = useState<string>(property?.value !== '' ? property?.value : property?.defaultState)
  const [activeFormSectionState, setActiveFormSectionState] = useState<FormControlTypeWithSection | FormControlType>(null)
  const [activeFormControlState, setActiveFormControlState] = useState(null)
  const [activeFormPageState, setActiveFormPageState] = useState<PageInstance>(null)

  //   useEffect(() => {
  //     setTheValue(property?.value !== '' ? property?.value : property?.defaultState)
  //   }, [activeControlId])

  //   useEffect(() => {
  //     const activeFormSection = sessionStorage.getItem('activeFormSection') && JSON.parse(sessionStorage.getItem('activeFormSection'))
  //     if (!activeFormSectionState) {
  //       setActiveFormSectionState(activeFormSection)
  //     }
  //   }, [activeFormControl, activeFormPage])

  // This sets the user's selected page to the local state. This was done because of changing state.
  //   useEffect(() => {
  //     if (form && JSON.stringify(activeFormPage?.activeFormPage) !== '{}') {
  //       const findActivePage = form?.builtFormMetadata?.pages?.find(
  //         (page: PageInstance) => page?.pageProperties[0]?.id === activeFormPage?.activeFormPage?.pageProperties[0]?.id
  //       )
  //       setActiveFormPageState(findActivePage)
  //     } else {
  //       setActiveFormPageState(null)
  //     }
  //   }, [activeFormPage, form])

  return (
    <div className='flex flex-col gap-1 mt-3'>
      <label htmlFor={id}>{property?.name}</label>
      <div className='flex justify-between items-end  border rounded-md border-[#38373729] p-2'>
        <textarea
          value={theValue}
          placeholder={`Enter  ${property?.name}`}
          //   onChange={handleChange}
          className={`flex-grow pr-1 h-[8rem] `}
          maxLength={characterMaxLength}
          name={theValue}
        />
        {characterMaxLength && (
          <span className='text-[10px] text-gray-400 '>
            {`${theValue.length}`}/{`${characterMaxLength}`}
          </span>
        )}
      </div>
    </div>
  )
})

export default FormTextArea
