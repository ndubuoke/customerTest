import {
  SET_BULK_CREATION_SUMMARY,
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
  VALIDATE_BULK_CUSTOMER_FAILED,
  VALIDATE_BULK_CUSTOMER_REQUEST,
  VALIDATE_BULK_CUSTOMER_SUCCESS,
} from 'Redux/constants/BulkCreation'

import {
  setBulkCreationActionTypes
} from 'Redux/actions/BulkCreation'


const bulkProcessSummaryInitialState = {
  bulkSummary: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}
const bulkCustomerValidationProfileInitialState = {
  bulkCustomersValidatedProfile: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}

// export type formBehaviourEdited = boolean;
export type BulkCustomerValidationProfileTypes = {
  bulkCustomersValidatedProfile: any[],
  message?: string,
  loading?: boolean,
  success?: boolean,
  error?: boolean,
}

export type BulkProcessSummaryTypes = {
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

export const bulkProcessSummaryReducer = (state: BulkProcessSummaryTypes = bulkProcessSummaryInitialState, action: setBulkCreationActionTypes) => {
  switch (action.type) {
    case SET_BULK_CREATION_SUMMARY:
      return { ...state, bulkSummary: action.payload }
    default:
      return state
  }
}
export const bulkCustomerValidationProfileReducer = (state: BulkCustomerValidationProfileTypes = bulkCustomerValidationProfileInitialState, action: setBulkCreationActionTypes) => {
  switch (action.type) {
    case VALIDATE_BULK_CUSTOMER_REQUEST:
      return { ...state, loading: true, success: false } as BulkCustomerValidationProfileTypes
    case VALIDATE_BULK_CUSTOMER_SUCCESS:
      return { ...state, loading: false, success: true, bulkCustomersValidatedProfile: action.payload } as BulkCustomerValidationProfileTypes
    case VALIDATE_BULK_CUSTOMER_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload } as BulkCustomerValidationProfileTypes
    case UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE:
      return { ...state, bulkCustomersValidatedProfile: action.payload } as BulkCustomerValidationProfileTypes
    default:
      return state as BulkCustomerValidationProfileTypes
  }
}

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
