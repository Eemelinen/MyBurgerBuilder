import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import Checkout from '../Checkout/Checkout';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1
}

class BurgerBuilder extends Component {

    state = {

        ingredients: null,
        totalPrice: 5,
        purchaseable: true,
        purchaseModal: false,
        error: false,
    }

    fetchIngredientData = () => { axios.get('https://burgerbuilder-7d0bf.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
            // console.log(response)
            // console.log(this.state.ingredients)

        })
        .catch(error => {
            this.setState({error: true});
        });
    };

    componentDidMount() {

        this.fetchIngredientData();;
    };

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

    };

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
        this.setState({
            purchaseModal: false,
        });
    }

    continueClickedHandler = () => {

        const urlQueryParams = [];

        for(let i in this.state.ingredients) {
            urlQueryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        urlQueryParams.push('price=' + this.state.totalPrice)

        const queryString = urlQueryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

    };

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // let checkout = <Spinner />

        // if(this.state.ingredients) {
        //     checkout = <Checkout ingredients={this.state.ingredients} />
        // }

        let burger = <Spinner />

        if(this.state.error) {
            burger = <h3> Sorry! Unable to get the ingredients from server!</h3>        
        };

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                cancelClicked={this.modalClosedHandler}
                successClicked={this.continueClickedHandler}
                price={this.state.totalPrice} />;
        };

        if(this.state.loading) {
            orderSummary = <Spinner />;
        };

        return (

            <Aux>

                <Modal show={this.state.purchaseModal} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);