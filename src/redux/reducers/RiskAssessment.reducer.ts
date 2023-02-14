import { UPDATE_RISK_ASSESSMENT } from 'Redux/constants/RiskAssessment.constant'

export type riskAssessmentType = {
  score: number
  rating: string
  resolution: string
}

export const initialStateRequest = {
  score: 90,
  rating: 'HIGH',
  resolution: 'Prevent Customer Creation',
}

export const riskAssessmentReducer = (state: riskAssessmentType = initialStateRequest, action: { type: string; payload: riskAssessmentType }) => {
  switch (action.type) {
    case UPDATE_RISK_ASSESSMENT:
      return { ...action.payload }
    default:
      return state
  }
}
