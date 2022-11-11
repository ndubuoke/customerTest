import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFormReducer, ResponseType } from './reducers/FormManagement.reducers'

export type ReducersType = {
  publishedForm: ResponseType
}

const reducer = combineReducers<ReducersType>({
  publishedForm: getFormReducer,
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
