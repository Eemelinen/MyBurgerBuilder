import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/layout/UI/Button/Button';
import classes from './ContactForm.module.css';
import Spinner from '../../../components/layout/UI/Spinner/Spinner';
import Input from '../../../components/layout/UI/Form/Input/Input';
import { connect } from 'react-redux';

class ContactForm extends Component {

    state = {
        orderConfig: {
            firstname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'firstname',
                    placeholder: 'First name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10
                },
                valid: false,
                touched: false,
            },
            lastname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'lastname',
                    placeholder: 'Last name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 10
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 15
                },
                valid: false,
                touched: false,
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'postal',
                    placeholder: 'Postal'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 8,
                },
                valid: false,
                touched: false,
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'normal', displayValue: 'Normal'}
                    ]
                },
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 20,
                },
                value: 'fast',
                valid: 'true',
                touched: 'true',
            },
        },
        formValidation: false,
        loading: false,
        inputs: [],
    }

    inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();

        // Not a deep clone. Objects inside orderConfig are still linked to state.
        const orderConfigClone = {
            ...this.state.orderConfig
        }

        // Deep clone of each object inside input element (But not elementConfig).
        const updatedInput = {
            ...orderConfigClone[inputIdentifier]
        }

        updatedInput.value = event.target.value;

        updatedInput.valid = this.validationCheck(updatedInput.value, updatedInput.validation);
        updatedInput.touched = true;

        let formIsValid = true;

        for(let inputIdentifier in orderConfigClone) {
            formIsValid = orderConfigClone[inputIdentifier].valid && formIsValid;
        }

        orderConfigClone[inputIdentifier] = updatedInput;

        this.setState({
            orderConfig: orderConfigClone, formValidation: formIsValid
        })
    }

    validationCheck = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim('') !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    formSubmitHandler = (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const order = {
            price: Number.parseFloat(this.props.price).toFixed(2),
            ingredients: this.props.ings,
            DeliveryDetails: {},
        };

        for (let valueName in this.state.orderConfig) {
            order.DeliveryDetails[valueName] = this.state.orderConfig[valueName].value
        }

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

        let inputArray = [];

        for(let inputKey in this.state.orderConfig) {
            inputArray.push({
                id: inputKey,
                ...this.state.orderConfig[inputKey],
            })
        }
        
        let contactForm = (
            <div>
                <form className={classes.ContactForm} onSubmit={this.formSubmitHandler}>
                    <h3>Your contact information:</h3>

                    {inputArray.map(element => {
                        return (
                        <Input
                            key={element.id}
                            type={element.elementConfig.type}
                            value={element.value}
                            inputtype={element.elementType}
                            name={element.elementConfig.name}
                            placeholder={element.elementConfig.placeholder}
                            elementconfig={element.elementConfig}
                            changed={(event) => this.inputChangedHandler(event, element.id)}
                            validation={element.validation}
                            invalid={toString(!element.valid)}
                            touched={element.touched && !element.valid}
                            />
                        )
                    })}
                    <Button btnType='Success' disabled={!this.state.formValidation}>Order</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, null)(ContactForm);