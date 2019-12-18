import React from 'react';
import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ( props ) => (

    <ul className={classes.NavItems}>
        <NavItem
            link="/"
            active>
            {props.navItemName1}
        </NavItem>
        <NavItem
            link="/checkout">
            {props.navItemName2}
        </NavItem>
    </ul>
);

export default navigationItems;