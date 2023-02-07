import { add, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'
import { SignatoryDetailsInitial } from '../Signatory/InitialData'
import SignatoriesTable from '../Signatory/SignatoriesTable'
import SignatoryModal from '../Signatory/SignatoryModal'

import { additionalDetailsInitial, affiliatedCompanyDetailsInitial } from '../AdditionalInfo/initialData'
import AdditionalDetailsTable from '../AdditionalInfo/AdditionalTable'
import RiskAssessmentLayout from './RiskAssessmentLayout'
import { FormStructureType } from 'Components/types/FormStructure.types'

type Props = {
  fillingFormState: FormStructureType
}

const RiskAssessment = memo(({ fillingFormState }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  console.log('fillingFormState-RiskAssessment', fillingFormState.data)

  const controller = {
    'bio-Data': {
      title: "Customer's Identity",
      fields: [
        {
          title: "Customer's Name",
          key: 'surname',
        },
        {
          title: 'Gender',
          key: 'gender',
        },
        {
          title: 'Date of Birth',
          key: 'dateOfBirth',
        },
        {
          title: 'Marital Status',
          key: 'maritalStatus',
        },
        {
          title: 'Origin',
          key: 'stateOfOrigin',
        },
        {
          title: 'ID Document [ID Number]',
          key: 'id',
        },
      ],
    },
    contactInformation: {
      title: "Customer's Address",
      fields: [
        {
          title: 'Residential Address',
          key: 'residentialAddress',
        },
        {
          title: 'Mobile Number',
          key: 'mobileNumber',
        },
      ],
    },
  }

  return (
    <>
      {fillingFormState.data.customerData.map((data) => {
        if (controller[data.sectionName]) {
          return (
            <RiskAssessmentLayout
              key={controller[data.sectionName].title}
              title={controller[data.sectionName].title}
              fields={controller[data.sectionName].fields}
              assessmentData={data.data}
            />
          )
        }
      })}
      {/* Customer Identity section */}
      {/* <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Identity </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `}>
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
          <div
            className=' gap-y-10 gap-x-16   text-[#636363] pl-12'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              // gridGap: '1.25rem',
              // padding: '.625rem',
              // paddingBottom: '0',
              // paddingTop: '0.2rem',
            }}
          >
            <div>
              <h5>Customer's Name</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Gender</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Date of Birth</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Marital Status</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Origin</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>ID Document [ID Number]</h5>
              <p>Employed</p>
            </div>
          </div>
          table here
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
      </section> */}

      {/* Customer Address section */}
      {/* <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Address </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `}>
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
          <div
            className=' gap-y-10 gap-x-16   text-[#636363] pl-12'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              // gridGap: '1.25rem',
              // padding: '.625rem',
              // paddingBottom: '0',
              // paddingTop: '0.2rem',
            }}
          >
            <div>
              <h5>Residential Address</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Mobile Number</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Nature of Business/Occupation</h5>
              <p>Employed</p>
            </div>
            <div>
              <h5>Email Address</h5>
              <p>Employed</p>
            </div>
          </div>
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
      </section> */}

      {/* customer livelihood section here */}
      {/* <section className='max-w-[1060px] mx-4 bg-slate-50 '>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>Customer's Livelihood </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1 `}>
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
      </section> */}

      {/* watchlist section */}
      {/* <section className='max-w-[1060px] mx-4 bg-slate-50'>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>WatchList</h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1  `}>
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

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}></div>
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
      </section> */}
      <div className='flex justify-center items-center gap-12 py-10'>
        <button className='border text-[#667085] px-5 py-1 rounded-md'>Compute Risk Score</button>
        <span>result here</span>
      </div>
    </>
  )
})

export default RiskAssessment
