import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'
import { getCustomersByDateReducer, activateCustomerReducer } from './reducers/CustomerManagement.reducer'
import {
  bulkCustomerValidationProfileReducer,
  BulkCustomerValidationProfileTypes,
  bulkProcessSummaryReducer,
  BulkProcessSummaryTypes,
} from './reducers/BulkCreation'
import {
  getCustomersReducer,
  customersManagementResponseType,
  getCustomersRequestReducer,
  deleteRequestReducer,
} from './reducers/CustomerManagement.reducer'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  deleteRequest: customersManagementResponseType
  activateCustomer: customersManagementResponseType
  bulkCustomerValidationProfile: BulkCustomerValidationProfileTypes
  allCustomersByDate: customersManagementResponseType
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer,
  allRequests: getCustomersRequestReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
  deleteRequest: deleteRequestReducer,
  allCustomersByDate: getCustomersByDateReducer,
  activateCustomer: activateCustomerReducer,

  bulkCustomerValidationProfile: bulkCustomerValidationProfileReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
