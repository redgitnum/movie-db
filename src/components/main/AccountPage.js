import React from 'react';
import { Redirect } from "react-router-dom";
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import mini_place from '../../assets/mini_place.jpg'

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
                    <h5>Account details:</h5>
                    <div className="item">
                        <p>username: </p>
                        <p>{this.props.user.username}</p>
                    </div>
                    <div className="item">
                        <div>
                            <h6>Movies</h6>
                            <p>rated: {this.props.user.records.ratings.length}</p>
                            <p>reviews: 50</p>
                            <p>on watchlist: 5</p>
                        </div>
                        <div>
                            <h6>Tv shows</h6>
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
                 
                    <div className="box">
                        <h5>Latest review:</h5>
                        {this.props.user.reviews ?
                        <div className="item review">
                            <div>
                                <img alt='' src={mini_place} />
                            </div>
                            <div>
                                <h6>Terminator salvation</h6>
                                <div>rating: 8</div>
                                <div>dwajdwakdbawnl</div>
                                <div className="readmore">Read more...</div>
                            </div>
                        </div>
                        : <div className='empty-info'>---write up your first review to see this---</div>
                        }
                    </div>
                
                
                  
                    <div className="box">
                        <h5>Latest movie ratings:</h5>
                        {this.props.user.ratings ?
                        <div className="item">
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                        </div>
                        : <div className='empty-info'>---rate your first movie to see this---</div>
                        }
                    </div> 
                    
                
                    <div className="box">
                        <h5>Latest tv show ratings:</h5>
                        {this.props.user.ratings ?
                        <div className="item">
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                            <div className='container'>
                                <img alt='' src={mini_place} />
                                <div>
                                    <div>Terminator: Salvation</div>
                                    <div>Rating: 7</div>
                                </div>
                            </div>
                        </div>
                        : <div className='empty-info'>---rate your first tv show to see this---</div>
                    }
                    </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);