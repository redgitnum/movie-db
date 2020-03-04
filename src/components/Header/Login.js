import React from 'react';
import { Link } from "react-router-dom";

class Login extends React.Component {
    render() {
        return(
            <div className="login">
                <div className="links">
                    <Link to="/login" className="login-btn"><p>LOGIN</p></Link>
                    <p>or</p>
                    <Link to="/signup" className="login-btn"><p>SIGN UP</p></Link>
                </div>
                
            </div>
        )
    }
}


export default Login