import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from '../contants/orderContant'

const initalState = {
    loading: false,
    success: false,
    message: null,
    data: null
}

function orderReducers(state = initalState, payload) {
    switch (payload.type) {
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: payload.data,
            }
        case FETCH_ORDER_ERROR:
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

export default orderReducers