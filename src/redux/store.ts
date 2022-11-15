import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'
import { bulkProcessSummaryReducer, bulkProcessSummaryTypes } from './reducers/BulkCreation'

export type ReducersType = {
  publishedForm: ResponseType,
  bulkProcessSummary: bulkProcessSummaryTypes,
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
  bulkProcessSummary: bulkProcessSummaryReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
