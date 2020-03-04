import React from 'react';
import { Link } from "react-router-dom";


class SignupPage extends React.Component {

    render() {
        return(
            <div className="section">
                <h1 className="section-title">Sign up</h1>
                <form className="login-form">
                    <div className="inputs">
                        <label htmlFor="username">username: 
                        <input type="text" name="username"></input></label>
                        <label htmlFor="password">password: 
                        <input type="password" name="password"></input></label>
                        <label htmlFor="password">confirm password: 
                        <input type="password" name="confirm-password"></input></label>
                    </div>
                    <button type="submit">SIGN UP</button>
                </form>
                <h2>to be able to:</h2>
                <div className="benefits">
                    <p>Rate movies and tv shows</p>
                    <p>Write up the reviews</p>
                    <p>Check your statistics</p>
                    <p>Create watchlists</p>
                    <p>Check all your ratings or reviews in one place</p>
                </div>
                <h2>or <Link to="/login">Login</Link> if you already have an account</h2>
            </div>
        )
    }
}

export default SignupPage;