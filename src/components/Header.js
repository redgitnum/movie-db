import React from 'react';
import Navigation from './Header/Navigation';
import Login from './Header/Login';
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <Link to="/" className="header-title">
                    <h1 className="logo">FLICKS DB</h1>
                    <p className="under-title">Find your favorite movie, 
                        tv show or movie star 
                        and make your own personal list.
                    </p>
                </Link>
                <Navigation />
                <Login />
                
            </div>
        )
    }
}


export default Header