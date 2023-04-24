import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import reducer from "./_reducers"

let middlewares = [thunk];

const middleware = applyMiddleware(...middlewares);
export default createStore(reducer,middleware); 