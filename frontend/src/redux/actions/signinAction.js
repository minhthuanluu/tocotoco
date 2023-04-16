import { FETCH_SIGN_IN_REQUEST, FETCH_SIGN_IN_SUCCESS, FETCH_SIGN_IN_ERROR } from '../contants/signinContant'
import signinAPI from '../../axios/signinAPI'

export const loadSignin = (email, pass) => async dispatch => {

    try {
        dispatch({ type: FETCH_SIGN_IN_REQUEST })
        const signIn = await signinAPI(email, pass);
        sessionStorage.setItem('Token', signIn?.data?.token);
        sessionStorage.setItem('User', JSON.stringify(signIn?.data?.user));
        const token = sessionStorage.getItem('Token');
        const user = sessionStorage.getItem('User');
       if(token && user){ 
        dispatch({
            type: FETCH_SIGN_IN_SUCCESS,
            data: signIn.data
        })}
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_SIGN_IN_ERROR, message: error })
    }
}