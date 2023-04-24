import { combineReducers } from "redux";
import { UserReducer } from './_reducers'
const reducer = combineReducers({   
    user:UserReducer,  
});


export default reducer;