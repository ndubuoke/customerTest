import { add, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { SignatoryDetailsInitial } from '../Signatory/InitialData'
import SignatoriesTable from '../Signatory/SignatoriesTable'
import SignatoryModal from '../Signatory/SignatoryModal'
import { AdditionalDetailsType, AdditionalDetailField, AffiliatedCompanyDetailsType, AffiliatedCompanyDetailField } from '../Types/AdditionalTypes'
import { SignatoryDetailsType } from '../Types/SignatoryTypes'
import AdditionalModal from './AdditionalModal'
import AffiliatedCompanyModal from './AffiliatedCompanyModal'
import AdditionalDetailsTable from './AdditionalTable'
import AffiliatedCompanyTable from './AffiliatedCompanyTable'
import { additionalDetailsInitial, affiliatedCompanyDetailsInitial } from './initialData'
import AffiliatedSection from './AffiliatedSection'

const AdditionalDetails = memo(() => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [collapsedAffiliatedCompany, setCollapsedAffiliatedCompany] = useState<boolean>(false)
  const [details, setDetails] = useState<Array<AdditionalDetailsType>>([])
  const [affiliatedCompanyDetails, setAffiliatedCompanyDetails] = useState<Array<AffiliatedCompanyDetailsType>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAffiliatedCompanyModal, setOpenAffiliatedCompanyModal] = useState<boolean>(false)
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetailField[]>(additionalDetailsInitial())
  const [companyDetails, setCompanyDetails] = useState<AffiliatedCompanyDetailField[]>(affiliatedCompanyDetailsInitial())
  const [detailToModifyId, setDetailToModifyId] = useState('')
  const [affiliatedCompanyDetailToModifyId, setAffiliatedCompanyDetailToModifyId] = useState('')
  const [modification, setModification] = useState<boolean>(false)

  const handleCollapseSection = () => {
    setCollapsed((prev) => !prev)
  }
  const handleCollapseAffiliatedCompanySection = () => {
    setCollapsedAffiliatedCompany((prev) => !prev)
  }

  const closeModalFunction = () => {
    setAdditionalDetails([...additionalDetailsInitial()])
    setModification(false)
    setOpenModal((prev) => !prev)
  }
  const closeAffiliatedCompanyModalFunction = () => {
    setCompanyDetails([...affiliatedCompanyDetailsInitial()])
    setModification(false)
    setOpenAffiliatedCompanyModal((prev) => !prev)
  }

  const handleRemoveDetail = (id: string | number) => {
    const filtered = details.filter((x) => x?.id !== id)
    setDetails(filtered)
  }
  const handleRemoveAffiliatedCompanyDetail = (id: string | number) => {
    const filtered = affiliatedCompanyDetails.filter((x) => x?.id !== id)
    setAffiliatedCompanyDetails(filtered)
  }

  const handleModify = (id: string) => {
    const item = details.find((x) => x?.id === id)
    setAdditionalDetails(
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
  const handleModifyAffiliatedCompany = (id: string) => {
    const item = affiliatedCompanyDetails.find((x) => x?.id === id)
    setCompanyDetails(
      affiliatedCompanyDetailsInitial().map((field) => {
        if (item[field.fieldLabel]) {
          field.value = item[field.fieldLabel]
        }
        return field
      })
    )
    setAffiliatedCompanyDetailToModifyId(id)
    setModification(true)
    setOpenAffiliatedCompanyModal((prev) => !prev)
  }

  useEffect(() => {
    if (details.length === 0) {
      const executiveInStorage = sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
        ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE))
        : null

      if (executiveInStorage) {
        setDetails(executiveInStorage)
      }
    }
    if (affiliatedCompanyDetails.length === 0) {
      const affiliatedCompanyDetailsInStorage = sessionStorage.getItem(STORAGE_NAMES.AFFILIATED_COMPANY_DETAILS_IN_STORAGE)
        ? JSON.parse(sessionStorage.getItem(STORAGE_NAMES.AFFILIATED_COMPANY_DETAILS_IN_STORAGE))
        : null

      if (affiliatedCompanyDetailsInStorage) {
        setAffiliatedCompanyDetails(affiliatedCompanyDetailsInStorage)
      }
    }
  }, [])

  useEffect(() => {
    if (details.length > 0) {
      sessionStorage.setItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE, JSON.stringify(details))
    } else {
      sessionStorage.removeItem(STORAGE_NAMES.ADDITIONAL_DETAILS_IN_STORAGE)
    }
    if (affiliatedCompanyDetails.length > 0) {
      sessionStorage.setItem(STORAGE_NAMES.AFFILIATED_COMPANY_DETAILS_IN_STORAGE, JSON.stringify(affiliatedCompanyDetails))
    } else {
      sessionStorage.removeItem(STORAGE_NAMES.AFFILIATED_COMPANY_DETAILS_IN_STORAGE)
    }
  }, [details, affiliatedCompanyDetails])

  return (
    <>
      {/* affiliated company details section */}
      <section className='max-w-[1060px] mx-4 bg-slate-50 m-8'>
        <div
          className={`ControlUILayout  w-full  p-2 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[10px] border-[#FAFAFA]`}
          style={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Affiliated Company Details </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-2  `} onClick={handleCollapseAffiliatedCompanySection}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={`w-4 h-4  ${collapsedAffiliatedCompany ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        </div>

        <div className={`${collapsedAffiliatedCompany ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-2 border-[#C22626]'} py-6`}>
          <AffiliatedSection affiliatedCompanyDetails={companyDetails} setAffiliatedCompanyDetails={setCompanyDetails} />
        </div>
      </section>

      {/* accounts held with other banks section */}
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
          <AdditionalDetailsTable
            collapsed={collapsed}
            handleRemoveDetail={handleRemoveDetail}
            handleModify={handleModify}
            details={details}
            setDetails={setDetails}
          />
        </div>
        {openModal ? (
          <AdditionalModal
            detailToModifyId={detailToModifyId}
            closeModalFunction={closeModalFunction}
            setDetails={setDetails}
            details={details}
            additionalDetails={additionalDetails}
            setAdditionalDetails={setAdditionalDetails}
            modification={modification}
            setModification={setModification}
          />
        ) : null}
      </section>
    </>
  )
})

export default AdditionalDetails
