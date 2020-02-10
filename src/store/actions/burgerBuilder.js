import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const onIngredientAdded = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const onIngredientRemoved = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredient = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-7d0bf.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
        });
    };
}