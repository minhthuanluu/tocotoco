import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from '../contants/productContant'
import productAPI from '../../axios/productAPI'

export const loadProducts = (params) => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST })

        const products = await productAPI(params)

        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            data: products.data
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_PRODUCT_ERROR, message: error })
    }
}