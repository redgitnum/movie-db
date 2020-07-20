import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchUser
};


class LoginPage extends React.Component {

    checkLogged = () => {
        return this.props.user.username ? <Redirect to='/'/> : null
    }

    authLogin = async (e) => {
        e.preventDefault();
        this.props.fetchUser(e.target.username.value, e.target.password.value)
    }

    render() {
        return(
            <div className="section">
                {this.checkLogged()}
                <h1 className="section-title">Login to your account</h1>
                <form onSubmit={this.authLogin} className="login-form">
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);