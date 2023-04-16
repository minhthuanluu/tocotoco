import orderAPI from '../../axios/orderAPI';
import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from '../contants/orderContant'

export const loadOrder = (product_order, user) => async dispatch => {
    try {
        dispatch({ type: FETCH_ORDER_REQUEST })

        const orders = await orderAPI(product_order, user);

       if(orders){
        dispatch({
            type: FETCH_ORDER_SUCCESS,
            data: orders
        })
       }
    } catch (error) {
        dispatch({ type: FETCH_ORDER_ERROR, message: error })
    }
}