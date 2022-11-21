import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'
import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
} from './reducers/BulkCreation'
import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer'
import { validateCustomerResponseType, validateCustomerReducer } from './reducers/ValidateCustomer.reducer'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  bulkCustomerValidationProfile: BulkCustomerValidationProfileTypes
  validateCustomer: validateCustomerResponseType
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer,
  allRequests: getCustomersRequestReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,

  bulkCustomerValidationProfile: bulkCustomerValidationProfileReducer,
  validateCustomer: validateCustomerReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
