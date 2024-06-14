import {combineReducers, compose, legacy_createStore, applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import todoReducer from "./group/group.reducer"


const rootReducer = combineReducers({
    todos: todoReducer,
})

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))