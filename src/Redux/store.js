import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./index.js";

let composeEnhancers = compose;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
