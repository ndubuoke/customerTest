import { add, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { SignatoryDetailsInitial } from '../Signatory/InitialData'
import SignatoriesTable from '../Signatory/SignatoriesTable'
import SignatoryModal from '../Signatory/SignatoryModal'
import { AdditionalDetailsType, AdditionalDetailField, AffiliatedCompanyDetailsType, AffiliatedCompanyDetailField } from '../Types/AdditionalTypes'
import { additionalDetailsInitial, affiliatedCompanyDetailsInitial } from '../AdditionalInfo/initialData'
import AdditionalDetailsTable from '../AdditionalInfo/AdditionalTable'

const RiskAssessment = memo(() => {
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
      {/* Customer Identity section */}
      <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Identity </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `} onClick={handleCollapseSection}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}>
          <div className='flex gap-y-10 gap-x-16  flex-wrap text-[#636363] pl-12'>
            <div>
              <h5>Employment Status</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Date of Employment</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Nature of Business/Occupation</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Annual Salary/Expected Annual Income</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Name</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Address</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Mobile Number</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Email Number</h5>
              <p>Employed</p>
            </div>
          </div>
          <AdditionalDetailsTable
            collapsed={collapsed}
            handleRemoveDetail={handleRemoveDetail}
            handleModify={handleModify}
            details={details}
            setDetails={setDetails}
          />
        </div>
        {/* {openModal ? (
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
        ) : null} */}
      </section>

      {/* Customer Address section */}
      <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Address </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `} onClick={handleCollapseSection}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}>
          <div className='flex gap-y-10 gap-x-16  flex-wrap text-[#636363] pl-12'>
            <div>
              <h5>Employment Status</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Date of Employment</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Nature of Business/Occupation</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Annual Salary/Expected Annual Income</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Name</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Address</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Mobile Number</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Email Number</h5>
              <p>Employed</p>
            </div>
          </div>
          <AdditionalDetailsTable
            collapsed={collapsed}
            handleRemoveDetail={handleRemoveDetail}
            handleModify={handleModify}
            details={details}
            setDetails={setDetails}
          />
        </div>
        {/* {openModal ? (
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
        ) : null} */}
      </section>

      {/* customer livelihood section here */}
      <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Livelihood </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `} onClick={handleCollapseSection}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}>
          <div className='flex gap-y-10 gap-x-16  flex-wrap text-[#636363] pl-12'>
            <div>
              <h5>Employment Status</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Date of Employment</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Nature of Business/Occupation</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Annual Salary/Expected Annual Income</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Name</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Address</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Mobile Number</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Employer's Email Number</h5>
              <p>Employed</p>
            </div>
          </div>
          <AdditionalDetailsTable
            collapsed={collapsed}
            handleRemoveDetail={handleRemoveDetail}
            handleModify={handleModify}
            details={details}
            setDetails={setDetails}
          />
        </div>
        {/* {openModal ? (
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
        ) : null} */}
      </section>

      {/* watchlist section */}
      <section className='max-w-[1060px] mx-4 bg-slate-50'>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>WatchList</h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1  `} onClick={handleCollapseSection}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}>
          <AdditionalDetailsTable
            collapsed={collapsed}
            handleRemoveDetail={handleRemoveDetail}
            handleModify={handleModify}
            details={details}
            setDetails={setDetails}
          />
        </div>
        {/* {openModal ? (
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
        ) : null} */}
      </section>
      <div className='flex justify-center items-center gap-12 py-10'>
        <button className='border text-[#667085] px-5 py-1 rounded-md'>Compute Risk Score</button>
        <span>result here</span>
      </div>
    </>
  )
})

export default RiskAssessment
