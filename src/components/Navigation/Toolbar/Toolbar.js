import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../layout/Logo/Logo';
import Navigation from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = ( props ) => (

    <div className={classes.Toolbar}>
        <Menu clicked={props.openMenu}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigation
                navItemName1='Burger Builder'
                navItemName2='Orders'
            />
        </nav>
    </div>

);

export default toolbar;