import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  getCustomersByDateReducer,
  activateCustomerReducer,
  getTotalRequestStatusReducer,
  getRequestsByDateReducer,
} from './reducers/CustomerManagement.reducer'
import {
  getFormReducer,
  ResponseType,
  setRequiredFormFieldsReducer,
  statusForCanProceedReducer,
  showWaiverModalInFormReducer,
  ShowModalInFormType,
  activePageReducer,
} from './reducers/FormManagement.reducers'

import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
  saveBulkCreationReducer,
  SaveBulkCreationTypes,
} from 'Redux/reducers/BulkCreation'

import { userProfileReducer, UserProfileTypes, userRolesAndPermissionsReducer, UserRolesAndPersmissionsTypes } from 'Redux/reducers/UserPersmissions'

import {
  getCustomersReducer,
  customersManagementResponseType,
  getCustomersRequestReducer,
  deleteRequestReducer,
} from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from 'Redux/reducers/ValidateCustomer.reducer'
import { getRequestsForCheckerReducer, getSingleRequestReducer, getActivityLogReducer } from './reducers/CustomerManagement.reducer'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  deleteRequest: customersManagementResponseType
  activateCustomer: customersManagementResponseType
  bulkCustomerValidationProfile: BulkCustomerValidationProfileTypes
  allCustomersByDate: customersManagementResponseType
  allRequestsByDate: customersManagementResponseType
  userRolesAndPermissions: UserRolesAndPersmissionsTypes
  userProfile: UserProfileTypes
  validateCustomer: validateCustomerResponseType
  saveBulkCustomerCreation: SaveBulkCreationTypes
  totalStatusCustomers: customersManagementResponseType
  allRequestsForChecker: customersManagementResponseType
  customerActivityLog: customersManagementResponseType
  setRequiredFormFields: any
  singleRequest: customersManagementResponseType
  statusForCanProceed: any
  showWaiverModalInForm: ShowModalInFormType
  activePage: any
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer,
  customerActivityLog: getActivityLogReducer,
  allRequests: getCustomersRequestReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
  deleteRequest: deleteRequestReducer,
  allCustomersByDate: getCustomersByDateReducer,
  activateCustomer: activateCustomerReducer,
  totalStatusCustomers: getTotalRequestStatusReducer,
  allRequestsByDate: getRequestsByDateReducer,
  allRequestsForChecker: getRequestsForCheckerReducer,
  bulkCustomerValidationProfile: bulkCustomerValidationProfileReducer,
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  userProfile: userProfileReducer,
  validateCustomer: validateCustomerReducer,
  saveBulkCustomerCreation: saveBulkCreationReducer,
  setRequiredFormFields: setRequiredFormFieldsReducer,
  singleRequest: getSingleRequestReducer,
  statusForCanProceed: statusForCanProceedReducer,
  showWaiverModalInForm: showWaiverModalInFormReducer,
  activePage: activePageReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
