import { FETCH_SIGN_IN_REQUEST, FETCH_SIGN_IN_SUCCESS, FETCH_SIGN_IN_ERROR } from '../contants/signinContant'
import signinAPI from '../../axios/signinAPI'

export const loadSignin = (email, pass) => async dispatch => {

    try {
        dispatch({ type: FETCH_SIGN_IN_REQUEST })
        const signIn = await signinAPI(email, pass)
        localStorage.setItem('Token', signIn?.data?.token)
        localStorage.setItem('User', JSON.stringify(signIn?.data?.user))
        dispatch({
            type: FETCH_SIGN_IN_SUCCESS,
            data: signIn.data
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_SIGN_IN_ERROR, message: error })
    }
}