import { FETCH_SIGN_IN_REQUEST, FETCH_SIGN_IN_SUCCESS, FETCH_SIGN_IN_ERROR } from '../contants/signinContant'

const initalState = {
    loading: false,
    success: false,
    message: null,
    data: null
}

function signinReducer(state = initalState, payload) {
    switch (payload.type) {
        case FETCH_SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: payload.data,
            }
        case FETCH_SIGN_IN_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                message: payload.message
            }
        default:
            return state
    }
}

export default signinReducer