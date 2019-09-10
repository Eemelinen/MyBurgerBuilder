import React from 'react';
// import Menu from '../../../assets/images/menu.png';
import classes from './Menu.module.css';

const menu = ( props ) => (

    <div className={classes.DrawerToggle} onClick={props.clicked}>
        {/* <img src={Menu} alt='Menu' onClick={props.clicked}></img> */}

        <div></div>
        <div></div>
        <div></div>

    </div>

);

export default menu;