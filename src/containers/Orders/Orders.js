import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../axios-orders';
// import classes from './Orders.module.css';
import Spinner from '../../components/layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {

                const fetchedOrders = [];

                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                this.setState({
                    orders: fetchedOrders,
                    loading: false
                })

                console.log(this.state)
            
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    loading: false
                })
            })
    }

    render() {

        let order = <Spinner />

        if(!this.state.loading) {

            order = (
                this.state.orders.map(item => {
                    return (
                        <Order
                        key={item.id}
                        orderID={item.id}
                        ingredients={item.ingredients}
                        price={item.price}/>
                    )
                })
            )
        }

        return(

            <div>

                {order}

            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);