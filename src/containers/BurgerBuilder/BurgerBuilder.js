import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchaseable: false,
        purchaseModal: false,
        loading: false,
        purchasing: false,
        error: false,
    }

    fetchIngredientData = () => { axios.get('https://burgerbuilder-7d0bf.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
            console.log(response)
        })
        .catch(error => {
            this.setState({error: true});
        });
    };

    componentDidMount() {

        this.fetchIngredientData();

        // axios.get('https://burgerbuilder-7d0bf.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
            purchasing: false
        });
    }

    continueClickedHandler = () => {

        this.setState({ loading: true });

        // alert('You clicked continue!')
        // .json is used only for firebase projects. For other projects another sort of endpoint might be required.
        const order = {
            ingredients: this.state.ingredients,
            // In future this price should be calculated on server.
            price: this.state.totalPrice,
            // Customer details to be added dynamically later
            customer: {
                name: 'Emilio Surkka',
                adress: {
                    street: 'Soltunkatu 10',
                    city: 'Helsinki',
                    country: 'Finland',
                },
                email: 'burgerbuilder@bb.com',
            },
            deliverymethod: 'express'
        };

        // Order gets sent to the firebase. Response (or error) gets logged to console.
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({
                    loading: false,
                    purchaseModal: false,
                    // ingredients: {
                    //     salad: 0,
                    //     bacon: 0,
                    //     cheese: 0,
                    //     meat: 1,
                    // },
                    totalPrice: 5,
                });
                this.fetchIngredientData();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                    purchaseModal: false,
                    // errorMessage: true,
                });
            });

    };

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

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