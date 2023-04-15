import { combineReducers } from 'redux'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import signinReducer from './signinReducer'
import orderReducers from './orderReducer'

const reducers = combineReducers({
    products: productReducer,
    categorys: categoryReducer,
    orders: orderReducers,
    signin: signinReducer,
})

export default reducers