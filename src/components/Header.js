import React from 'react';

import logo from '../assets/logo.svg';
import Navigation from './Header/Navigation';
import Login from './Header/Login';
import { Link } from "react-router-dom";


class Header extends React.Component {

    showLogin = (e) => {
        e.target.nextSibling.classList.toggle('show')

    }
    
    render() {
        return(
            <div className="header">
                <Link to="/" className="logo">
                    <img src={logo} alt=''></img>
                </Link>
                <Navigation />
                <div className="hamburger-login" onClick={this.showLogin}>>LOG-REG></div>
                <Login />
            </div>
        )
    }
}


export default Header
