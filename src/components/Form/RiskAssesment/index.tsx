import { add, ExclaimateIcon, exclamationYellow, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'

import RiskAssessmentLayout from './RiskAssessmentLayout'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { riskAssessmentResultAction } from 'Redux/actions/RiskAssessment.actions'
import { useDispatch } from 'react-redux'
import { calcScore } from './calculate'

type Props = {
  fillingFormState: FormStructureType
}

const RiskAssessment = memo(({ fillingFormState }: Props) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [riskScoreGuide, setRiskScoreGuide] = useState<{ score: number; rating: string; resolution: string }>(null)
  const [riskAssessmentData, setRiskAssessmentData] = useState({
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
          parameter: 'Is Customer a Politically Exposed Person?',
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
          parameter: 'Is Customer a Non-Resident?',
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
          parameter: 'Status of Customer livelihood verification',
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
          parameter: 'Status of Cross border banking relationship',
          impliedWeight: 6,
          parameterOptions: [
            {
              status: 'Yes',
              weight: 80,
            },
            {
              status: 'No',
              weight: 20,
            },
            {
              status: 'Not verified',
              weight: 100,
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
          parameter: 'Is Customer on any AML related sanction list?',
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
  })
  console.log('fillingFormState-RiskAssessment', fillingFormState.data)

  const [collapsedWatchlist, setcollapsedWatchlist] = useState<boolean>(false)
  const handleCollapseSection = () => {
    setcollapsedWatchlist((prev) => !prev)
  }

  const handleSelectedParameterOption = (parentKey: string, parameter: string, parameterOptionStatus: string) => {
    console.log(parentKey, parameter, parameterOptionStatus)
    const standardRiskAssessmentData = riskAssessmentData[parentKey]?.standardRiskAssessmentData
    if (standardRiskAssessmentData) {
      const mappedStandardRiskAssessmentData = standardRiskAssessmentData.map((assessment) => {
        if (assessment.parameter === parameter) {
          const parameterOption = assessment.parameterOptions.find((option) => option.status === parameterOptionStatus)
          if (parameterOption) {
            assessment = { ...assessment, selectedParameterOption: { ...parameterOption } }
          }
        }
        return assessment
      })
      setRiskAssessmentData((prev) => {
        return {
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            standardRiskAssessmentData: [...mappedStandardRiskAssessmentData],
          },
        }
      })
    }
  }

  const computeScore = () => {
    //   {
    //   parameter: 'Is customer a Non-Resident?',
    //   parameterOption: 'Yes',
    // },
    const userAssessment = []
    Object.keys(riskAssessmentData).forEach((assessment) => {
      riskAssessmentData[assessment].standardRiskAssessmentData.forEach((data) =>
        userAssessment.push({
          parameter: data.parameter,
          parameterOption: data.selectedParameterOption.status,
        })
      )
    })
    const score = calcScore(userAssessment)
    console.log('score', score)
    dispatch(riskAssessmentResultAction(score.scoreGuide) as any)
    setRiskScoreGuide(score.scoreGuide)
  }

  return (
    <>
      {fillingFormState.data.customerData.map((data) => {
        if (riskAssessmentData[data.sectionName]) {
          // console.log('data', data)
          return (
            <RiskAssessmentLayout
              key={riskAssessmentData[data.sectionName].title}
              parentKey={data.sectionName}
              title={riskAssessmentData[data.sectionName].title}
              fields={riskAssessmentData[data.sectionName].fields}
              standardRiskAssessmentData={riskAssessmentData[data.sectionName].standardRiskAssessmentData}
              assessmentData={data.data}
              handleSelectedParameterOption={handleSelectedParameterOption}
            />
          )
        }
      })}
      {/* watchlist section */}
      <RiskAssessmentLayout
        parentKey='watchlist'
        title={riskAssessmentData['watchlist'].title}
        standardRiskAssessmentData={riskAssessmentData['watchlist'].standardRiskAssessmentData}
        handleSelectedParameterOption={handleSelectedParameterOption}
      />

      <div className='flex justify-center items-center gap-12 py-10'>
        <button className='border text-[#667085] px-5 py-1 rounded-md' onClick={computeScore}>
          Compute Risk Score
        </button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            marginTop: '3rem',
          }}
        >
          {riskScoreGuide ? (
            <span
              style={{
                backgroundColor: '#EEEEEE',
                fontSize: '20px',
                padding: '7px 0 7px 8px',
                maxWidth: '200px',
                fontWeight: '700',
                color: riskScoreGuide.rating === 'HIGH' ? '#CF2A2A' : '#D5A62F',
              }}
            >
              {riskScoreGuide.rating} {'(' + riskScoreGuide.score + ')'}
            </span>
          ) : (
            ''
          )}
          {riskScoreGuide ? (
            <span
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                marginTop: '0.5rem',
                fontWeight: '500',
                color: riskScoreGuide.rating === 'HIGH' ? '#CF2A2A' : '#D5A62F',
              }}
            >
              {riskScoreGuide.rating === 'HIGH' ? (
                <span>
                  <ExclaimateIcon />
                </span>
              ) : riskScoreGuide.rating === 'MEDIUM' ? (
                <img src={exclamationYellow} width={30} height={30} alt='danger' />
              ) : null}
              <p className='m-0 text-sm '> {riskScoreGuide.resolution}</p>
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
})

export default RiskAssessment
