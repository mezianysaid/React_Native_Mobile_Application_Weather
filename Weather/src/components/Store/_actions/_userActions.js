import axios from "axios"
import {API_URL, REJECTION_REQUEST, REGISTER, LOGIN} from '../_constants/index'
const user_prifix='/api/user'

export const registerUserAction = (data) => {
    return async(dispatch) => {
        try {          
            
            await axios.post(API_URL+user_prifix+'/register',data)
                  .then((res) => {
                    dispatch({ type: REGISTER,
                               payload:res.data 
                            })                            
                  })            
        } catch (error) {
            dispatch({ type:REJECTION_REQUEST,payload:error});
        }
    }
}

// login user action 
export const loginUserAction = (data) => {
    return async(dispatch) => {
        try {
            await axios.post(API_URL + user_prifix + '/login',data)
                 .then((response) => {
                    dispatch({
                            type:LOGIN,
                            payload:response.data
                    })
        })

        } catch (error) {
            dispatch({type:REJECTION_REQUEST,payload:error})
        }
    }
}