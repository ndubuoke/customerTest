import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'
import {
  getCustomersByDateReducer,
  activateCustomerReducer,
  getTotalRequestStatusReducer,
  getRequestsByDateReducer,
} from './reducers/CustomerManagement.reducer'
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
import { getTotalRequestStatusCustomersAction } from './actions/CustomerManagement.actions'
import { getRequestsForCheckerReducer } from './reducers/CustomerManagement.reducer'

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
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer,
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
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
