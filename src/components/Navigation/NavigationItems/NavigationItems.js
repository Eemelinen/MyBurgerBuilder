import React from 'react';
import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ( props ) => (

    <ul className={classes.NavItems}>
        <NavItem
            link="/">
            {props.navItemName1}
        </NavItem>
        <NavItem
            link="/orders">
            {props.navItemName2}
        </NavItem>
    </ul>
);

export default navigationItems;