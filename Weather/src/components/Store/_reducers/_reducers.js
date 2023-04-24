import * as actionType from '../_constants/index'

export const UserReducer = (state={},action)=>{
    switch (action.type) {
        case actionType.REGISTER:
            return{
                ...state,
                user:action.payload
            }                        
        case actionType.GET_USER:
            return {
                ...state,
                user:action.payload
            }
        case actionType.LOGIN:
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}
