import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from '../contants/orderContant'
import getOrderAPI from '../../axios/getOrderAPI'

export const loadOrder = (product_order, user) => async dispatch => {

    try {
        dispatch({ type: FETCH_ORDER_REQUEST })

        const orders = await getOrderAPI(product_order, user)
        console.log(orders);
        dispatch({
            type: FETCH_ORDER_SUCCESS,
            data: orders.data
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_ORDER_ERROR, message: error })
    }
}