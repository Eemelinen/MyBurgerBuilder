import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/layout/UI/Button/Button';
import classes from './ContactForm.module.css';
import Spinner from '../../../components/layout/UI/Spinner/Spinner';

class ContactForm extends Component {

    state = {
        // customer: {
            name: '',
            email: '',
            
            street: '',
            postal: '',
        // },
        loading: false,
    }

    inputChangeHandler = (e) => {
        e.preventDefault();

        this.setState({
            // customer: {
                [e.target.name]: e.target.value
            // }
        })
        console.log(this.state)
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Submit clicked')

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            // customer: {
                name: this.state.name,
                email: this.state.email,

                street: this.state.street,
                postal: this.state.postal,                
            // },
        };

        // Order gets sent to the firebase. Response (or error) gets logged to console.
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                });
            });        
    }

    render() {
        
        let contactForm = (
            <div>
                <form className={classes.ContactForm}>
                    <input value={this.state.name} onChange={this.inputChangeHandler} className={classes.Input} type='text' name='name' placeholder='Your Name' />
                    <input value={this.state.email} onChange={this.inputChangeHandler} className={classes.Input} type='email' name='email' placeholder='Your Email' />
                    <input value={this.state.street} onChange={this.inputChangeHandler} className={classes.Input} type='text' name='street' placeholder='Street' />
                    <input value={this.state.postal} onChange={this.inputChangeHandler} className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
                    <Button clicked={this.formSubmitHandler} btnType='Success'>Order</Button>
                </form>
            </div>
        );

        if(this.state.loading) {
            contactForm = <Spinner />
        }

        return(
            <div>
                {contactForm}
            </div>
        )
    }
}

export default ContactForm;