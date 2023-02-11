import { Dispatch } from 'redux'
import { ReducersType } from 'Redux/store'
import { UPDATE_RISK_ASSESSMENT } from '../constants/RiskAssessment.constant'

export const riskAssessmentResultAction = (payload: any) => async (dispatch: Dispatch, getState: (store: ReducersType) => ReducersType) => {
  dispatch({ type: UPDATE_RISK_ASSESSMENT, payload })
}
