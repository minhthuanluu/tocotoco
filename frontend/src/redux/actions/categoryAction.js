import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR } from '../contants/categoryContant'
import categoryAPI from '../../axios/categoryAPI'

export const loadCategorys = () => async dispatch => {
    try {
        dispatch({ type: FETCH_CATEGORY_REQUEST })

        const categorys = await categoryAPI()

        dispatch({
            type: FETCH_CATEGORY_SUCCESS,
            data: categorys.data
        })
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_CATEGORY_ERROR, message: error })
    }
}