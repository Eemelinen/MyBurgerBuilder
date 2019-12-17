import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/layout/UI/Button/Button';
import Spinner from '../../components/layout/UI/Spinner/Spinner';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
    }

    render() {

        

        return(

            <div>

                <CheckoutSummary ingredients={this.state.ingredients} />

            </div>
        )
    }
}

export default Checkout;