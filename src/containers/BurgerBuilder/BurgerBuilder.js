import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1
}

class BurgerBuilder extends Component {

    state = {

        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 5,
        purchaseable: false,
        purchaseModal: false,
    }

    addIngredientHandler = ( type ) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseableState(updatedIngredients);

    }

    removeIngredientHandler = ( type ) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseableState(updatedIngredients);

    }

    updatePurchaseableState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

            this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchaseModal: true});
    }

    modalClosedHandler = () => {
        this.setState({purchaseModal: false});
    }

    continueClickedHandler = () => {

        alert('You clicked continue!')
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (

            <Aux>

                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    ordered={this.purchaseHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}/>

                {console.log(this.state.totalPrice)}

                {console.log(disabledInfo)}

                <Modal show={this.state.purchaseModal} modalClosed={this.modalClosedHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelClicked={this.modalClosedHandler}
                        successClicked={this.continueClickedHandler}
                        price={this.state.totalPrice}/>
                </Modal>

            </Aux>

        );
    }
}

export default BurgerBuilder;