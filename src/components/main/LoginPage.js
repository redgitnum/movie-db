import React from 'react';
import { Link } from "react-router-dom";



class LoginPage extends React.Component {

    render() {
        return(
            <div className="section">
                <h1 className="section-title">Login to your account</h1>
                <form className="login-form">
                    <div className="inputs">
                        <label htmlFor="username">username: 
                        <input type="text" name="username"></input></label>
                        <label htmlFor="password">password: 
                        <input type="password" name="password"></input></label>
                    </div>
                    <button type="submit">LOGIN</button>
                </form>
                <h2>or <Link to="/signup">Sign up</Link> to be able to:</h2>
                <div className="benefits">
                    <p>Rate movies and tv shows</p>
                    <p>Write up the reviews</p>
                    <p>Check your statistics</p>
                    <p>Create watchlists</p>
                    <p>Check all your ratings or reviews in one place</p>
                </div>
            </div>
        )
    }
}

export default LoginPage;