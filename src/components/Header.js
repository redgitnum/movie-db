import React from 'react';

import logo from '../assets/logo.svg';
import Navigation from './Header/Navigation';
import Login from './Header/Login';
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <Link to="/" className="logo">
                    <img src={logo} alt=''></img>
                    {/* <p className="under-title">Find your favorite movie, 
                        tv show or movie star 
                        and make your own personal list.
                    </p> */}
                </Link>
                <Navigation />
                <Login />
                
            </div>
        )
    }
}


export default Header