import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => state;


class Login extends React.Component {
    state = {logged: true}

    logOut = () => {
        axios.post('/user/logout')
        .then(() => {
            localStorage.clear()
            this.setState({logged: false})
            window.location.reload(false)
        })
    }

    loading = () => {
        if(!this.state.logged){
            return (
            <div className='loading-screen'>
                <div className='placeholder-login'></div>
            </div>
            )
        }
    }

    render() {
        return(
            <div className="login">
                {this.loading()}
                {!this.state.logged && <Redirect to='/' />}
                {this.props.user.username ? 
                    <div className="links">
                        <Link to="/account" className="login-btn"><p>{this.props.user.username}</p></Link>
                        <p>or</p>
                        <button onClick={this.logOut} className="login-btn"><p>LOG OUT</p></button>
                    </div>
                    : 
                    <div className="links">
                        <Link to="/login" className="login-btn"><p>LOGIN</p></Link>
                        <p>or</p>
                        <Link to="/signup" className="login-btn"><p>SIGN UP</p></Link>
                    </div>
                }
                
                
            </div>
        )
    }
}


export default connect(mapStateToProps)(Login);