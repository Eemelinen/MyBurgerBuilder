import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchaseable: true,
        purchaseModal: false,
        error: false,
    }

    fetchIngredientData = () => { axios.get('https://burgerbuilder-7d0bf.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    };

    componentDidMount() {

        this.fetchIngredientData();;
    };

    updatePurchaseableState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            
            return sum > 0;
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
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = <Spinner />

        if(this.state.error) {
            burger = <h3> Sorry! Unable to get the ingredients from server!</h3>        
        };

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseableState(this.props.ings)}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                cancelClicked={this.modalClosedHandler}
                successClicked={this.continueClickedHandler}
                price={this.props.price} />;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));