import React, { Component } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import MyIcon from '../iconbtn/icon';
import {NavBar} from "../layout/layout";

class NavBottom extends Component {
    
    render() { 
        return ( 
            <NavBar>
                <div>
                    <NavLink to="/" >
                        <MyIcon type="message" size={40} />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/list">
                        <MyIcon type="home" size={40} />
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/me">
                        <MyIcon type="user" size={40} />
                    </NavLink>
                </div>
            </NavBar>
         );
    }
}
 
export default NavBottom;