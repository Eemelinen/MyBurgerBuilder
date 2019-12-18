import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <div className={classes.Data}>
                <p><strong>ID: {props.orderID}</strong></p>
                <p>Meat: {props.ingredients.meat}</p>
                <p>Cheese: {props.ingredients.cheese}</p>
                <p>Salad: {props.ingredients.salad}</p>
                <p>Bacon: {props.ingredients.bacon}</p>
                <p><strong>Price: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            </div>
        <div className={classes.Data}>
            <p><strong>Name: Eemeli Surakka</strong></p>
            <p>Email: abc@h.com</p>
            <p>Address: Soltunkatu 10</p>
            <p>Postal: 10240</p>
            <p>Time: 23.24</p>
            <p>Date: 11.5.2019</p>
        </div>
    </div>
)

export default order;