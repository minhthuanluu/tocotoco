import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from '../contants/productContant'

const initalState = {
    loading: false,
    success: false,
    message: null,
    data: null
}

function productReducers(state = initalState, payload) {
    switch (payload.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: payload.data,
            }
        case FETCH_PRODUCT_ERROR:
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

export default productReducers