import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
<<<<<<< HEAD
import { getFormReducer, getPublishedFormSectionReducer, ResponseType } from './reducers/FormManagement.reducers'
=======
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'

>>>>>>> e9494b9 (Checkout dev)
import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
<<<<<<< HEAD
} from './reducers/BulkCreation'
import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from './reducers/ValidateCustomer.reducer'
import { userRolesAndPermissionsReducer, UserRolesAndPersmissionsTypes } from './reducers/UserPersmissions'
import { userProfileReducer, UserProfileTypes } from './reducers/UserPersmissions/UserPersmissions'
=======
} from 'Redux/reducers/BulkCreation'

import {
  userProfileReducer,
  UserProfileTypes,
  userRolesAndPermissionsReducer,
  UserRolesAndPersmissionsTypes
} from 'Redux/reducers/UserPersmissions'

import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from 'Redux/reducers/ValidateCustomer.reducer'
>>>>>>> e9494b9 (Checkout dev)

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
