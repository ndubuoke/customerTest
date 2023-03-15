import { Dispatch } from 'redux'
import store, { ReducersType } from 'Redux/store'
import { UPDATE_RISK_ASSESSMENT, UPDATE_PARAMETER_OPTION, COMPUTE_ASSESSMENT } from '../constants/RiskAssessment.constant'
import { calcScore } from 'Components/Form/RiskAssesment/calculate'

export const riskAssessmentResultAction = (payload: any) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({ type: UPDATE_RISK_ASSESSMENT, payload })
}
export const selectedParameterOptionAction =
  (payload: { parentKey: string; parameter: string; parameterOptionStatus: string }) =>
  async (dispatch: Dispatch, getState: (store: any) => ReducersType) => {
    const {
      riskAssessment: { riskAssessmentData },
    } = getState(store)
    const { parentKey, parameter, parameterOptionStatus } = payload
    console.log('payload', payload)
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

      const updatedRiskAssessmentData = {
        ...riskAssessmentData,
        [parentKey]: {
          ...riskAssessmentData[parentKey],
          standardRiskAssessmentData: [...mappedStandardRiskAssessmentData],
        },
      }
      for (let key in updatedRiskAssessmentData) {
        updatedRiskAssessmentData[key].isCompleted = !updatedRiskAssessmentData[key].standardRiskAssessmentData.some(
          (parameter) => parameter.selectedParameterOption.status === 'Not verified'
        )
      }
      dispatch({ type: UPDATE_PARAMETER_OPTION, payload: { riskAssessmentData: updatedRiskAssessmentData } })
    }
  }

export const computeAssessmentAction = () => async (dispatch: Dispatch, getState: (store: any) => ReducersType) => {
  const {
    riskAssessment: { riskAssessmentData },
  } = getState(store)

  for (let key in riskAssessmentData) {
    riskAssessmentData[key].isCompleted = !riskAssessmentData[key].standardRiskAssessmentData.some(
      (parameter) => parameter.selectedParameterOption.status === 'Not verified'
    )
  }

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
  dispatch({ type: COMPUTE_ASSESSMENT, payload: { riskAssessmentData, riskScoreGuide: { ...score.scoreGuide } } })
}
