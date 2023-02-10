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
      standardRiskAssessmentData: [
        {
          parameter: 'Status of customer identity verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
        {
          parameter: 'Is customer a Politically Exposed Person?',
          impliedWeight: 8,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
          ],
          selectedParameterOption: {
            status: 'Yes',
            weight: 80,
          },
        },
      ],
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
      standardRiskAssessmentData: [
        {
          parameter: 'Is customer a Non-Resident?',
          impliedWeight: 7,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
          ],
          selectedParameterOption: {
            status: 'Yes',
            weight: 80,
          },
        },
        {
          parameter: 'Status of customer address verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [
        {
          title: 'Residential Address',
          key: 'residentialAddress',
        },
        {
          title: 'Mobile Number',
          key: 'mobileNumber',
        },
        {
          title: 'Email Address',
          key: 'emailAddress',
        },
      ],
    },
    employmentDetails: {
      title: "Customer's Livelihood",
      standardRiskAssessmentData: [
        {
          parameter: 'Status of customer livelihood verification',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Not verified',
              weight: 100,
            },
            {
              status: 'Failed',
              weight: 80,
            },
            {
              status: 'Passed',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Not verified',
            weight: 100,
          },
        },
      ],
      fields: [
        {
          title: 'Employment Status',
          key: 'employmentStatus',
        },
        {
          title: 'Date of Employment',
          key: 'mobileNumber',
        },
        {
          title: 'Nature of Business/Occupation',
          key: 'mobileNumber',
        },
        {
          title: 'Annual Salary/Expected Annual Income',
          key: 'annualSalaryExpectedAnnualIncome',
        },
        {
          title: 'Employer’s Name',
          key: 'employersName',
        },
        {
          title: 'Employer’s Address',
          key: 'employersAddress',
        },
        {
          title: 'Employer’s Mobile Number',
          key: 'employersMobileNumber',
        },
        {
          title: 'Employer’s Email Address',
          key: 'employersEmailAddress',
        },
      ],
    },
    watchlist: {
      title: 'Watchlist',
      standardRiskAssessmentData: [
        {
          parameter: 'Is originating Country a FATF listed country?',
          impliedWeight: 7,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
          ],
          selectedParameterOption: {
            status: 'Yes',
            weight: 80,
          },
        },
        {
          parameter: 'Is customer on any AML related sanction list?',
          impliedWeight: 10,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 100,
            },
            {
              status: 'No',
              weight: 0,
            },
          ],
          selectedParameterOption: {
            status: 'Yes',
            weight: 80,
          },
        },
      ],
      fields: [],
    },
  }
  const [collapsedWatchlist, setcollapsedWatchlist] = useState<boolean>(false)
  const handleCollapseSection = () => {
    setcollapsedWatchlist((prev) => !prev)
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
              standardRiskAssessmentData={controller[data.sectionName].standardRiskAssessmentData}
              assessmentData={data.data}
            />
          )
        }
      })}
      {/* watchlist section */}
      <RiskAssessmentLayout title={controller['watchlist'].title} standardRiskAssessmentData={controller['watchlist'].standardRiskAssessmentData} />
      {/* <section className='max-w-[66.25rem] mx-4 '>
        <div
          className={`ControlUILayout  w-full  p-1 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]
          {setRequiredFormFieldsRedux.} $
          `}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
            background: 'rgba(170, 170, 170, 0.07)',
          }}
        >
          <div className='flex items-center'>
            <h6
              style={{
                fontWeight: '500',
                fontSize: '16px',
              }}
            >
              WatchList
            </h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1  `} onClick={handleCollapseSection}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={`w-4 h-4  ${collapsedWatchlist ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        </div>

        <div
          className={` ${collapsedWatchlist ? 'max-h-0 overflow-hidden hidden' : 'min-h-[12.5rem] border-l-2 border-[#C22626]'}  `}
          style={{
            background: 'rgb(250, 250, 250)',
          }}
        ></div>
      </section> */}
      <div className='flex justify-center items-center gap-12 py-10'>
        <button className='border text-[#667085] px-5 py-1 rounded-md'>Compute Risk Score</button>
        <span>result here</span>
      </div>
    </>
  )
})

export default RiskAssessment
