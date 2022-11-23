import {
  SAVE_BULK_CUSTOMER_FAILED,
  SAVE_BULK_CUSTOMER_REQUEST,
  SAVE_BULK_CUSTOMER_SUCCESS,
  SET_BULK_CREATION_SUMMARY,
  SET_FILE_UPLOADED,
  UPDATE_BULK_CUSTOMER_VALIDATION_PROFILE,
  VALIDATE_BULK_CUSTOMER_FAILED,
  VALIDATE_BULK_CUSTOMER_REQUEST,
  VALIDATE_BULK_CUSTOMER_SUCCESS,
} from 'Redux/constants/BulkCreation'

import {
  setBulkCreationActionTypes
} from 'Redux/actions/BulkCreation'


const bulkCustomerValidationProfileInitialState = {
  bulkCustomersValidatedProfile: [],
  message: '',
  fileUploaded: false,
  loading: false,
  success: true,
  error: false,
}

export type BulkCustomerValidationProfileTypes = {
  bulkCustomersValidatedProfile: any[],
  message?: string,
  fileUploaded: boolean,
  loading?: boolean,
  success?: boolean,
  error?: boolean,
}

const bulkProcessSummaryInitialState = {
  bulkSummary: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}
export type BulkProcessSummaryTypes = {
  bulkSummary: any[],
  message?: string;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
};

const SaveBulkCreationInitialState = {
  message: '',
  loading: false,
  success: true,
  error: false,
}
export type SaveBulkCreationTypes = {
  message?: string;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
};

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
    case SET_FILE_UPLOADED:
      return { ...state, fileUploaded: action.payload } as BulkCustomerValidationProfileTypes
    default:
      return state as BulkCustomerValidationProfileTypes
  }
}

export const saveBulkCreationReducer = (state: SaveBulkCreationTypes = SaveBulkCreationInitialState, action: setBulkCreationActionTypes) => {
  switch (action.type) {
    case SAVE_BULK_CUSTOMER_REQUEST:
      return { ...state, loading: true, success: false } as SaveBulkCreationTypes
    case SAVE_BULK_CUSTOMER_SUCCESS:
      return { ...state, loading: false, success: true, message: action.payload } as SaveBulkCreationTypes
    case SAVE_BULK_CUSTOMER_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload } as SaveBulkCreationTypes
    default:
      return state as SaveBulkCreationTypes
  }
}