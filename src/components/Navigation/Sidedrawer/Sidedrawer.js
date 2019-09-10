import React from 'react';
import NavigationItems from './../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Logo from './../../layout/Logo/Logo';
import Backdrop from '../../layout/UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sidedrawer = ( props ) => {

    let attachedClasses = [classes.Sidedrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }

    return(

    <Aux>

        <Backdrop
            clicked={props.close}
            show={props.open}/>

        <div className={attachedClasses.join(' ')} >
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems 
                    navItemName1='Burger Builder'
                    navItemName2='Checkout'/>
            </nav>
        </div>
    </Aux>
    );
};

export default sidedrawer;