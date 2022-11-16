import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'
import { getCustomersReducer, customersManagementResponseType, getCustomersRequestReducer } from './reducers/CustomerManagement.reducer';

export type ReducersType = {
  publishedForm: ResponseType
  allCustomers: customersManagementResponseType,
  allRequests:customersManagementResponseType
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  allCustomers: getCustomersReducer ,
  allRequests:getCustomersRequestReducer
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
