import { add, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { SignatoryDetailsInitial } from '../Signatory/InitialData'
import SignatoriesTable from '../Signatory/SignatoriesTable'
import SignatoryModal from '../Signatory/SignatoryModal'
import { ExecutiveDetailsType, ExecutiveField } from '../Types/ExecutiveTypes'
import { SignatoryDetailsType } from '../Types/SignatoryTypes'
import AdditionalModal from './AdditionalModal'
import AdditionalDetailsTable from './AdditionalTable'
import { additionalDetailsInitial } from './initialData'
// import SignatoriesTable from './SignatoriesTable'
// import SignatoryModal from './SignatoryModal'

type Props = {}

const AdditionalDetails = memo((props: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [executives, setExecutives] = useState<Array<ExecutiveDetailsType>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [executiveDetails, setExecutiveDetails] = useState<ExecutiveField[]>(additionalDetailsInitial())
  const [detailToModifyId, setDetailToModifyId] = useState('')
  const [modification, setModification] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }

  const closeModalFunction = () => {
    setExecutiveDetails([...additionalDetailsInitial()])
    setModification(false)
    setOpenModal((prev) => !prev)
  }

  const handleRemoveExecutive = (id: string | number) => {
    const filtered = executives.filter((x) => x?.id !== id)
    setExecutives(filtered)
  }

  const handleModify = (id: string) => {
    const item = executives.find((x) => x?.id === id)
    setExecutiveDetails(
      additionalDetailsInitial().map((field) => {
        if (item[field.fieldLabel]) {
          field.value = item[field.fieldLabel]
        }
        return field
      })
    )
    setDetailToModifyId(id)
    setModification(true)
    setOpenModal((prev) => !prev)
  }

  useEffect(() => {
    if (executives.length === 0) {
      const executiveInStorage = sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
        ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE))
        : null

      if (executiveInStorage) {
        setExecutives(executiveInStorage)
      }
    }
  }, [])

  useEffect(() => {
    if (executives.length > 0) {
      sessionStorage.setItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE, JSON.stringify(executives))
    } else {
      sessionStorage.removeItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
    }
  }, [executives])

  return (
    <section className='max-w-[1060px] mx-4 bg-slate-50'>
      <div
        className={`ControlUILayout  w-full  p-2 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[10px] border-[#FAFAFA]`}
        style={{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className='flex items-center'>
          <h6>Accounts Held with Other Banks </h6>
        </div>
        <div className={`border-2 cursor-pointer border-[#C22626] p-2  `} onClick={handleCollapseSection}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`w-4 h-4  ${collapsed ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>

      <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-2 border-[#C22626]'} py-6`}>
        <div className='flex justify-end'>
          <button
            className='flex gap-2 font-medium
           leading-[20px] text-[#636363]'
            onClick={closeModalFunction}
            type='button'
          >
            <img src={add} />
            Add Details
          </button>
        </div>
        <AdditionalDetailsTable collapsed={collapsed} handleRemoveAdditional={handleRemoveExecutive} handleModify={handleModify} />
      </div>
      {openModal ? (
        <AdditionalModal
          detailToModifyId={detailToModifyId}
          closeModalFunction={closeModalFunction}
          setExecutives={setExecutives}
          executives={executives}
          executiveDetails={executiveDetails}
          setExecutiveDetails={setExecutiveDetails}
          modification={modification}
          setModification={setModification}
        />
      ) : null}
    </section>
  )
})

export default AdditionalDetails
