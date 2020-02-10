import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1
}

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.ADD_INGREDIENT:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        case actionTypes.REMOVE_INGREDIENT:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }

        default:
            return state;

    }
}

export default reducer;