import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'

import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
  saveBulkCreationReducer,
  SaveBulkCreationTypes,
} from 'Redux/reducers/BulkCreation'

import {
  userProfileReducer,
  UserProfileTypes,
  userRolesAndPermissionsReducer,
  UserRolesAndPersmissionsTypes
} from 'Redux/reducers/UserPersmissions'

import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from 'Redux/reducers/ValidateCustomer.reducer'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  bulkCustomerValidationProfile: BulkCustomerValidationProfileTypes
  userRolesAndPermissions: UserRolesAndPersmissionsTypes
  userProfile: UserProfileTypes
  validateCustomer: validateCustomerResponseType
  saveBulkCustomerCreation: SaveBulkCreationTypes
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer,
  allRequests: getCustomersRequestReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
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
