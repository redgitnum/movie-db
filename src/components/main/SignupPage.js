import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import bcrypt from 'bcryptjs'
import axios from 'axios';
import qs from 'qs';

const mapStateToProps = state => state;


class SignupPage extends React.Component {
    state = {registered: false}

    checkRegistered = () => {
        return this.state.registered ? <Redirect to='/login' /> : null
    }
        
    registerUser = async (e) => {
        e.preventDefault();
        let form = e.target
        let username = e.target.username.value
        if(e.target.password.value === e.target.confirm_password.value){
            let hashedPassword = await bcrypt.hash(e.target.password.value, 10);
            await axios.post('/user/register', qs.stringify({
                username: username,
                password: hashedPassword
            })).then(response => {
                if(response.data.success){
                    alert(response.data.message)
                    this.setState({registered: true})
                } else {
                    alert(response.data.message)
                    form.reset()
                }
            })
        } else {
            alert('Passwords do not match');
            form.reset()
        }
        
    }

    

    render() {
        return(
            <div className="section">
                {this.checkRegistered()}
                <h1 className="section-title">Sign up</h1>
                <form onSubmit={this.registerUser} className="login-form">
                    <div className="inputs">
                        <label htmlFor="username">username: 
                        <input type="text" name="username" minLength='5'></input></label>
                        <label htmlFor="password">password: 
                        <input type="password" name="password" minLength='5'></input></label>
                        <label htmlFor="confirm_password">confirm password: 
                        <input type="password" name="confirm_password" minLength='5'></input></label>
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

export default connect(mapStateToProps)(SignupPage);