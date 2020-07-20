import React from 'react';
import { Redirect } from "react-router-dom";
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchUser
};


class AccountPage extends React.Component {

    checkLogged = () => {
        return this.props.user.username ? null : <Redirect to='/'/>
    }

    updatePassword = async (e) => {
        e.preventDefault()
        await axios.post('/user/update', qs.stringify({
            username: this.props.user.username, 
            password: e.target.password.value, 
            new_password: e.target.new_password.value}))
        .then(res => console.log(res.data))

    }

    render() {
        return(
            <div className="section account">
                {this.checkLogged()}
                <h1 className="section-title">Welcome, {this.props.user.username}</h1>
                <div className="box">
                    <h4>Account details:</h4>
                    <div className="container">
                        <div className="item">
                            <p>username: </p>
                            <p>{this.props.user.username}</p>
                        </div>
                        <div className="item">
                            <div>
                                <h4>Movies</h4>
                                <p>rated: 15</p>
                                <p>reviews: 50</p>
                                <p>on watchlist: 5</p>
                            </div>
                            <div>
                                <h4>Tv shows</h4>
                                <p>rated: 15</p>
                                <p>reviews: 50</p>
                                <p>on watchlist: 5</p>
                            </div>
                        </div>
                        <form onSubmit={this.updatePassword} className="item">
                            <label htmlFor='password'>password</label>
                            <input type='password' name='password' minLength='3'/>
                            <label htmlFor='new_password'>new password</label>
                            <input type='password' name='new_password' minLength='5'/>
                            <button type='submit'>change password</button>
                        </form>
                    </div>
                </div>
                <div className="box">
                    <h4>Top 3:</h4>
                    <div className="container">
                        <div className="item">
                            <div>
                                <h4>Movies</h4>
                                <p>1: Top gun</p>
                                <p>2: Inception</p>
                                <p>3. Go</p>
                            </div>
                            <div>
                                <h4>Tv shows</h4>
                                <p>1: Top gun</p>
                                <p>2: Inception</p>
                                <p>3. Go</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <h4>Latest review:</h4>
                    <div className="container">
                        <div className="item">
                            <div>
                                <h4>Terminator: Salvation</h4>
                                <p>fbkafkjsfkjabkfbasfbfjhkldjkla
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="box">
                    <p>Rate movies and tv shows</p>
                    <p>Write up the reviews</p>
                    <p>Check your statistics</p>
                    <p>Create watchlists</p>
                    <p>Check all your ratings or reviews in one place</p>
                </div>
                <div className="box">
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);