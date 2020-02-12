import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        // Order gets sent to the firebase. Response (or error) gets logged to console.
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}