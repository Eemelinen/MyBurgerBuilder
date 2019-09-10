import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from './../../layout/UI/Button/Button'

const orderSummary = ( props ) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
                </li>
            );
        });

    return(

        <Aux>

            <h3>Your Burgers has the following ingredients:</h3>

            <ul>
                {ingredientSummary}
            </ul>

            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>

            <h4>Proceed to Checkout:</h4>

            <Button
                btnType="Danger"
                clicked={props.cancelClicked}>Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.successClicked}>Continue</Button>

        </Aux>

    );
};

export default orderSummary;