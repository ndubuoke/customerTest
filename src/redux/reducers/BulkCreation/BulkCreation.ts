import {
  SET_BULK_CREATION_SUMMARY
} from 'Redux/constants/BulkCreation'

import {
  setBulkCreationActionTypes
} from 'Redux/actions/BulkCreation'


const bulkProcessSummaryInitialState = {
  bulkSummary: [],
  message: '',
  loading: false,
  success: true,
  error: true,
}

// export type formBehaviourEdited = boolean;

export type bulkProcessSummaryTypes = {
  bulkSummary: any[],
  message?: string;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
};
// export type formBehaviourDataTypes = {
//   formBehavioursData: any;
//   message?: string;
//   loading?: boolean;
//   success?: boolean;
//   error?: any;
// };
// export type formBehaviourDataSaveTypes = {
//   message?: string;
//   loading?: boolean;
//   success?: boolean;
//   error?: any;
// };

export const bulkProcessSummaryReducer = (state: bulkProcessSummaryTypes = bulkProcessSummaryInitialState, action: setBulkCreationActionTypes) => {
  switch (action.type) {
    case SET_BULK_CREATION_SUMMARY:
      return { ...state, bulkSummary: action.payload }
    default:
      return state
  }
}
// export const formBehaviourDataReducer = (state: formBehaviourDataTypes = formBehaviourDataInitialState, action: setFormBehaviourActionTypes) => {
//   switch (action.type) {
//     case BEHAVIOURS_DATA_GET_REQUEST:
//       return { ...state, loading: true, success: false }
//     case BEHAVIOURS_DATA_GET_SUCCESS:
//       return { ...state, loading: false, success: true, formBehavioursData: action.payload }
//     case BEHAVIOURS_DATA_GET_FAIL:
//       return { ...state, loading: false, success: false, error: true, message: action.payload }
//     case SET_FORM_BEHAVIOURS:
//       const allBehaviours = action.payload
//       return { ...state, formBehavioursData: allBehaviours }
//     case SET_FORM_BEHAVIOUR:
//       const formBehavioursData = [...state.formBehavioursData, action.payload]
//       return { ...state, formBehavioursData: formBehavioursData }
//     default:
//       return state
//   }
// }

// export const formBehaviourDataSaveReducer = (state: formBehaviourDataSaveTypes = formBehaviourDataSaveInitialState, action: setFormBehaviourActionTypes) => {
//   switch (action.type) {
//     case BEHAVIOURS_DATA_SAVE_REQUEST:
//       return { ...state, loading: true }
//     case BEHAVIOURS_DATA_SAVE_SUCCESS:
//       return { ...state, loading: false, success: true, message: action.payload }
//     case BEHAVIOURS_DATA_SAVE_FAIL:
//       return { ...state, loading: false, success: false, error: true, message: action.payload }
//     default:
//       return state
//   }
// }
// export const formBehaviourEditedReducer = (state: formBehaviourEdited = formBehaviourEditedInitialState, action: setFormBehaviourActionTypes) => {
//   switch (action.type) {
//     case SET_FORM_BEHAVIOUR_EDITED:
//       const valueEdit = action.payload
//       return valueEdit
//     default:
//       return state
//   }
// }
