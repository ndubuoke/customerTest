import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, getPublishedFormSectionReducer, ResponseType } from './reducers/FormManagement.reducers'
import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
} from './reducers/BulkCreation'
import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from './reducers/ValidateCustomer.reducer'
import { userRolesAndPermissionsReducer, UserRolesAndPersmissionsTypes } from './reducers/UserPersmissions'
import { userProfileReducer, UserProfileTypes } from './reducers/UserPersmissions/UserPersmissions'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  bulkCustomerValidationProfile: BulkCustomerValidationProfileTypes
  getPublishedFormSection: ResponseType
  validateCustomer: validateCustomerResponseType
  userRolesAndPermissions: UserRolesAndPersmissionsTypes
  userProfile: UserProfileTypes
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
  allCustomers: getCustomersReducer,
  allRequests: getCustomersRequestReducer,
  bulkCustomerValidationProfile: bulkCustomerValidationProfileReducer,
  getPublishedFormSection: getPublishedFormSectionReducer,
  validateCustomer: validateCustomerReducer,
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  userProfile: userProfileReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
