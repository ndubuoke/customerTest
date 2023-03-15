import { add, ExclaimateIcon, exclamationYellow, Plus } from 'Assets/svgs'
import React, { memo, useState, useEffect } from 'react'
import { STORAGE_NAMES } from 'Utilities/browserStorages'

import RiskAssessmentLayout from './RiskAssessmentLayout'
import { FormStructureType } from 'Components/types/FormStructure.types'
import { computeAssessmentAction, selectedParameterOptionAction } from 'Redux/actions/RiskAssessment.actions'
import { useDispatch, useSelector } from 'react-redux'
import { calcScore } from './calculate'
import { ReducersType } from 'Redux/store'

type Props = {
  fillingFormState: FormStructureType
}

const RiskAssessment = memo(({ fillingFormState }: Props) => {
  const dispatch = useDispatch()
  const { riskAssessmentData, riskScoreGuide } = useSelector<ReducersType>((state: ReducersType) => state?.riskAssessment) as any
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // const [riskScoreGuide, setRiskScoreGuide] = useState<{ score: number; rating: string; resolution: string }>(null)

  console.log('fillingFormState-RiskAssessment', fillingFormState.data)

  const [collapsedWatchlist, setcollapsedWatchlist] = useState<boolean>(false)
  const handleCollapseSection = () => {
    setcollapsedWatchlist((prev) => !prev)
  }

  const handleSelectedParameterOption = (parentKey: string, parameter: string, parameterOptionStatus: string) => {
    console.log(parentKey, parameter, parameterOptionStatus)
    dispatch(
      selectedParameterOptionAction({
        parentKey,
        parameter,
        parameterOptionStatus,
      }) as any
    )
    // const standardRiskAssessmentData = riskAssessmentData[parentKey]?.standardRiskAssessmentData
    // if (standardRiskAssessmentData) {
    //   const mappedStandardRiskAssessmentData = standardRiskAssessmentData.map((assessment) => {
    //     if (assessment.parameter === parameter) {
    //       const parameterOption = assessment.parameterOptions.find((option) => option.status === parameterOptionStatus)
    //       if (parameterOption) {
    //         assessment = { ...assessment, selectedParameterOption: { ...parameterOption } }
    //       }
    //     }
    //     return assessment
    //   })
    //   setRiskAssessmentData((prev) => {
    //     const updatedRiskAssessmentData = {
    //       ...prev,
    //       [parentKey]: {
    //         ...prev[parentKey],
    //         standardRiskAssessmentData: [...mappedStandardRiskAssessmentData],
    //       },
    //     }
    //     for (let key in updatedRiskAssessmentData) {
    //       updatedRiskAssessmentData[key].isCompleted = !updatedRiskAssessmentData[key].standardRiskAssessmentData.some(
    //         (parameter) => parameter.selectedParameterOption.status === 'Not verified'
    //       )
    //     }
    //     return updatedRiskAssessmentData
    //   })
    // }
  }

  const computeScore = () => {
    //   {
    //   parameter: 'Is customer a Non-Resident?',
    //   parameterOption: 'Yes',
    // },

    // setRiskAssessmentData((prev) => {
    //   const riskAssessmentDataCopy = { ...prev }
    //   for (let key in riskAssessmentDataCopy) {
    //     riskAssessmentDataCopy[key].isCompleted = !riskAssessmentDataCopy[key].standardRiskAssessmentData.some(
    //       (parameter) => parameter.selectedParameterOption.status === 'Not verified'
    //     )
    //   }
    //   return riskAssessmentDataCopy
    // })

    // const userAssessment = []
    // Object.keys(riskAssessmentData).forEach((assessment) => {
    //   riskAssessmentData[assessment].standardRiskAssessmentData.forEach((data) =>
    //     userAssessment.push({
    //       parameter: data.parameter,
    //       parameterOption: data.selectedParameterOption.status,
    //     })
    //   )
    // })
    // const score = calcScore(userAssessment)
    // console.log('score', score)
    dispatch(computeAssessmentAction() as any)
    // setRiskScoreGuide(score.scoreGuide)
  }
  console.log('data-customerData', fillingFormState.data.customerData)
  return (
    <>
      {fillingFormState.data.customerData
        .map((data) => {
          if (data.sectionName === 'bio-Data') {
            const identityVerification: any = fillingFormState.data.customerData.find((data) => data.sectionName === 'identityVerification')
            if (identityVerification) {
              return {
                ...data,
                data: {
                  ...data.data,
                  chooseAnID: identityVerification.data?.chooseAnID || '',
                  iDNumber: identityVerification.data?.iDNumber || '',
                },
              }
            }
          }
          return data
        })
        .map((data, idx) => {
          // console.log('data-customerData', data)
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
                isCompleted={riskAssessmentData[data.sectionName].isCompleted}
                isCollapsed={idx !== 0}
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
        isCompleted={riskAssessmentData['watchlist'].isCompleted}
      />

      <div className='flex items-center justify-center gap-12 py-10'>
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
                color: riskScoreGuide.rating === 'HIGH' ? '#CF2A2A' : riskScoreGuide.rating === 'MEDIUM' ? '#D5A62F' : 'green',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
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
                color: riskScoreGuide.rating === 'HIGH' ? '#CF2A2A' : riskScoreGuide.rating === 'MEDIUM' ? '#D5A62F' : 'green',
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
