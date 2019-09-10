import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import classes from './layout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import Sidedrawer from './../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    closeSidedrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    openSidedrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render () {
        return(

            <Aux>

                <Toolbar
                    openMenu={this.openSidedrawerHandler}
                />
        
                <Sidedrawer 
                    open={this.state.showSideDrawer}
                    close={this.closeSidedrawerHandler}
                />
        
                <main className={classes.Content}>
                    {this.props.children}
                </main>
        
            </Aux>

        )
    };
};

export default Layout;