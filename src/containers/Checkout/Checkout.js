import React, { Component } from 'react';
// import Burger from '../../components/Burger/Burger';
// import Button from '../../components/layout/UI/Button/Button';
// import Spinner from '../../components/layout/UI/Spinner/Spinner';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm';
import { connect } from 'react-redux';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0,
    // }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;

    //     for(let param of query.entries()) {

    //         if(param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({
    //         ingredients: ingredients,
    //         price: price
    //     })
    //     // console.log(ingredients)
    // }

    cancelClickedHandler = () => {
        this.props.history.push('/');
    }

    continueClickedHandler = () => {
        this.props.history.replace('/checkout/contact-form')
    }

    render() {

        return(

            <div>

                <CheckoutSummary
                ingredients={this.props.ings}
                checkoutCancel={this.cancelClickedHandler}
                checkoutContinue={this.continueClickedHandler}/>

                <Route
                path={this.props.match.path + '/contact-form'}
                component={ContactForm}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, null)(Checkout);