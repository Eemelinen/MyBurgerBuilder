import React from 'react';
import Burger from '../../Burger';
import Button from '../../../layout/UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

    let burger = null;

    if(props.ingredients) {
        
        burger = (
            <div style={{width: '100%', height: '230px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
        );
    };

    return(

        <div className={classes.CheckoutSummary}>
            
            <h1>Enjoy your tasty burger!</h1>

            {burger}

            <Button btnType='Danger'>Cancel</Button>

            <Button btnType='Success'>Continue</Button>

        </div>
    )

}

export default checkoutSummary;