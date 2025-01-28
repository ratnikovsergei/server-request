import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { todoReducer, searchReducer, sortReducer } from "./todo-app/reducers";

const appReducer = combineReducers({
  todos: todoReducer,
  search: searchReducer,
  sort: sortReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
