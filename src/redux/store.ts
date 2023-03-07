import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  getCustomersByDateReducer,
  activateCustomerReducer,
  getTotalRequestStatusReducer,
  getRequestsByDateReducer,
  getProductsCategoriesReducer,
  getAllProductsReducer,
  getSingleProductReducer,
  getProductTypesReducer,
  getCustomerProfileReducer,
  deactivateCustomerReducer,
} from './reducers/CustomerManagement.reducer'
import {
  getFormReducer,
  ResponseType,
  setRequiredFormFieldsReducer,
  statusForCanProceedReducer,
  showWaiverModalInFormReducer,
  ShowModalInFormType,
  activePageReducer,
  unfilledRequiredSignatoryListReducer,
  UnfilledRequiredSignatoryListReducerType,
  unfilledRequiredSignatoryListButtonReducer,
  submitFormReducer,
  getCountriesReducer,
  getStatesReducer,
  getCitiesReducer,
  getColumnMapReducer,
  createColumnMapReducer,
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
import { riskAssessmentType, riskAssessmentReducer } from 'Redux/reducers/RiskAssessment.reducer'
import {
  getRequestsForCheckerReducer,
  getSingleRequestReducer,
  getActivityLogReducer,
  updateRequestReducer,
} from './reducers/CustomerManagement.reducer'
import { UnfilledRequiredSignatoryListType } from './actions/FormManagement.actions'
import { customerSearchReducer, getSingleCustomer360Reducer } from './reducers/Customer360.reducer'
import { getCustomer360SingleProductReducer } from './reducers/Customer360ProductReducer'
import { getCustomer369RecentTransactionsReducer } from './reducers/Customer360RecentTransactions.Reducer'
import { getCustomer360PreferredChannelsReducer } from './reducers/Customer360PreferredChannels.reducer'
import { getCustomer360AlertsAndNotificationReducer } from './reducers/Customer360AlertsAndNotification.reducer'
import { getCustomer360ConcessionGroupsReducer } from './reducers/Customer360ConcessionGroups.reducer'
import { getCustomer360RewardReducer } from './reducers/Customer360Rewards.reducer'
import { getCustomer360RecommendedProductsReducer } from './reducers/Customer360RecommendedProducts.reducer'
import { getCustomer360ProductTypeReducer } from './reducers/Customer360GetProductByType.reducer'

export type ReducersType = {
  publishedForm: ResponseType
  bulkProcessSummary: BulkProcessSummaryTypes
  singleProduct: customersManagementResponseType
  allProductCategories: customersManagementResponseType
  allProducts: customersManagementResponseType
  allProductTypes: customersManagementResponseType
  customerProfile: customersManagementResponseType
  allCustomers: customersManagementResponseType
  allRequests: customersManagementResponseType
  deleteRequest: customersManagementResponseType
  activateCustomer: customersManagementResponseType
  deactivateCustomer: customersManagementResponseType
  updatedRequest: customersManagementResponseType
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
  unfilledRequiredSignatoryList: UnfilledRequiredSignatoryListReducerType
  unfilledRequiredSignatoryListButton: UnfilledRequiredSignatoryListReducerType
  submitForm: ResponseType
  getCountries: ResponseType
  getStates: ResponseType
  getCities: ResponseType
  getColumnMap: ResponseType
  createColumnMap: ResponseType
  riskAssessment: riskAssessmentType
  customer360Search: ResponseType
  getSingleCustomer: ResponseType
  customer360SingleProduct: ResponseType
  customer360RecentTransaction: ResponseType
  customer360PreferredChannels: ResponseType
  customer360AlertsAndNotification: ResponseType
  customer360ConcessionGroups: ResponseType
  customer360RecommendedProducts: ResponseType
  customer360Rewards: ResponseType
  customer360ProductType: ResponseType
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  singleProduct: getSingleProductReducer,
  customerProfile: getCustomerProfileReducer,
  allCustomers: getCustomersReducer,
  allProductTypes: getProductTypesReducer,
  allProducts: getAllProductsReducer,
  allProductCategories: getProductsCategoriesReducer,
  customerActivityLog: getActivityLogReducer,
  allRequests: getCustomersRequestReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
  deleteRequest: deleteRequestReducer,
  allCustomersByDate: getCustomersByDateReducer,
  activateCustomer: activateCustomerReducer,
  deactivateCustomer: deactivateCustomerReducer,

  updatedRequest: updateRequestReducer,
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
  unfilledRequiredSignatoryList: unfilledRequiredSignatoryListReducer,
  unfilledRequiredSignatoryListButton: unfilledRequiredSignatoryListButtonReducer,
  submitForm: submitFormReducer,
  getCountries: getCountriesReducer,
  getStates: getStatesReducer,
  getCities: getCitiesReducer,
  getColumnMap: getColumnMapReducer,
  createColumnMap: createColumnMapReducer,
  riskAssessment: riskAssessmentReducer,
  customer360Search: customerSearchReducer,
  getSingleCustomer: getSingleCustomer360Reducer,
  customer360SingleProduct: getCustomer360SingleProductReducer,
  customer360RecentTransaction: getCustomer369RecentTransactionsReducer,
  customer360PreferredChannels: getCustomer360PreferredChannelsReducer,
  customer360AlertsAndNotification: getCustomer360AlertsAndNotificationReducer,
  customer360ConcessionGroups: getCustomer360ConcessionGroupsReducer,
  customer360RecommendedProducts: getCustomer360RecommendedProductsReducer,
  customer360Rewards: getCustomer360RewardReducer,
  customer360ProductType: getCustomer360ProductTypeReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
