import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR } from '../contants/categoryContant'

const initalState = {
    loading: false,
    success: false,
    message: null,
    data: null
}

function categoryReducer(state = initalState, payload) {
    switch (payload.type) {
        case FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: payload.data,
            }
        case FETCH_CATEGORY_ERROR:
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

export default categoryReducer