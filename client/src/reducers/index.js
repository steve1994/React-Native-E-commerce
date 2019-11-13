import {combineReducers} from 'redux';
import products from './products';
import detailProduct from './detail_product'

export default combineReducers({
    products,
    detailProduct
})
