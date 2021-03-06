import React from 'react';
import { Redirect, Link } from "react-router-dom";
import { resetStore } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
const API = 'https://flicks-db.herokuapp.com'

const mapStateToProps = state => state;
const mapDispatchToProps = {
  resetStore
};


class AccountPage extends React.Component {
    updatePassword = async (e) => {
        e.preventDefault()
        await axios.post(`${API}/user/update`, qs.stringify({
            username: this.props.user.username, 
            password: e.target.password.value, 
            new_password: e.target.new_password.value}))
        .then(res => alert(res.data))
        .then(e.target.reset())

    }

    ratingColor = (rating) => {
        if(rating <= 2) return 'red';
        else if(rating <=4) return 'orange';
        else if(rating <=6) return 'yellow';
        else if(rating <=8) return 'green';
        return 'limegreen'
    }

    populateLatestRatings = (type) => {
        let latestRatings = this.props.user.records.ratings.filter(entry => entry.media === type);
        let ratingsLength = latestRatings.length < 7 ? 0 : latestRatings.length - 6
        let result = [];
        for(let i = latestRatings.length-1; i > ratingsLength-1; i--){
            result.push(
                <Link to={`/details/${type}/${latestRatings[i].id}`} key={i}>
                    <div className='container'>
                        <img alt="" src={"https://image.tmdb.org/t/p/w92" + latestRatings[i].thumbnailImage }></img>
                        <div>
                            <div>{latestRatings[i].title}</div>
                            <div>Rating: {latestRatings[i].rating}</div>
                        </div>
                    </div>
                </Link>
                )
        }
        return <div className="item ratings">{result}</div>
    }

    populateLatestReview = () => {
        let latestReview = this.props.user.records.reviews[this.props.user.records.reviews.length-1];
        return  <div className="item review">
                    <div>
                        <img alt='' src={"https://image.tmdb.org/t/p/w300" + latestReview.thumbnailImage} />
                    </div>
                    <div>
                        <h6>{latestReview.title}</h6>
                        <div>{latestReview.review}</div>
                    </div>
                </div>
    }

    populateRatings = (type) => {
        let ratings = this.props.user.records.ratings.filter(entry => entry.media === type);
        let result = [];
        for(let i = ratings.length-1; i >= 0; i--){
            result.push(
                <Link to={`/details/${type}/${ratings[i].id}`} className='container' key={ratings[i].id}>
                    <img alt="" src={"https://image.tmdb.org/t/p/w92" + ratings[i].thumbnailImage }></img>
                    <div>{ratings[i].title}</div>
                    <div>Rating:</div>
                    <div style={{color: this.ratingColor(ratings[i].rating)}}>{ratings[i].rating}</div>
                </Link>
                )
        }
        return <div className='entry-list'>{result}</div>
    }

    showReview = (e) => {
        if(e.target.parentNode.className === 'review-navigation'){
            let reviewText = e.target.parentNode.nextSibling;
            if(reviewText.classList.contains('review-text')){
                reviewText.classList.toggle('show-review')
            }
        }
    }

    populateReviews = (type) => {
        let reviews = this.props.user.records.reviews.filter(entry => entry.media === type);
        let result = [];
        for(let i = reviews.length-1; i >= 0; i--){
            result.push(
                <div className='entry-list' onClick={this.showReview} key={reviews[i].id}>
                    <div className='review-navigation'>
                        <img alt="" src={"https://image.tmdb.org/t/p/w92" + reviews[i].thumbnailImage }></img>
                        <div>{reviews[i].title}</div>
                        <div>Click to read</div>
                    </div>
                    <div className='review-text'>
                        {reviews[i].review}
                    </div>
                </div>
                )
        }
        return result
    }

    populateWatchlist = () => {
        let watchlist = this.props.user.records.watchlist;
        let result = [];
        for(let i = watchlist.length-1; i >= 0; i--){
            result.push(
                <Link to={`/details/${watchlist[i].media}/${watchlist[i].id}`} className='container' key={watchlist[i].id}>
                    <img alt="" src={"https://image.tmdb.org/t/p/w92" + watchlist[i].thumbnailImage }></img>
                    <div>{watchlist[i].title}</div>
                    <div>{watchlist[i].media ==='tv' ? 'tv show' : 'movie'}</div>
                </Link>
                )
        }
    return <div className='entry-list'>{result}</div>
    }

    render() {
        return (this.props.user ? 
        <div className="section account">
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
                        <p>rated: {this.props.user.records.ratings.filter(entry => entry.media === 'movie').length}</p>
                        <p>reviews: {this.props.user.records.reviews.filter(entry => entry.media === 'movie').length}</p>
                        <p>on watchlist: {this.props.user.records.watchlist.filter(entry => entry.media === 'movie').length}</p>
                    </div>
                    <div>
                        <h6>Tv shows</h6>
                        <p>rated: {this.props.user.records.ratings.filter(entry => entry.media === 'tv').length}</p>
                        <p>reviews: {this.props.user.records.reviews.filter(entry => entry.media === 'tv').length}</p>
                        <p>on watchlist: {this.props.user.records.watchlist.filter(entry => entry.media === 'tv').length}</p>
                    </div>
                </div>
                <form onSubmit={this.updatePassword} className="item">
                    <label htmlFor='password'>password</label>
                    <input required type='password' name='password' minLength='3'/>
                    <label htmlFor='new_password'>new password</label>
                    <input required type='password' placeholder={this.props.user.username ==='demo1' ? 'not available on demo account' : null} style={{color: 'black', fontWeight: 'bold'}} name='new_password'  disabled={this.props.user.username ==='demo1' ? true : false} minLength='5'/>
                    <button type='submit' className={this.props.user.username ==='demo1' ? 'disabled' : null} disabled={this.props.user.username ==='demo1' ? true : false}>change password</button>
                </form>
            </div>
                
            <div className="box">
                <h5>Latest review:</h5>
                {this.props.user.records.reviews.length ?
                this.populateLatestReview()
                : <div className='empty-info'>---write up your first review to see this---</div>
                }
            </div>
            
            
                
            <div className="box">
                <h5>Latest movie ratings:</h5>
                {this.props.user.records.ratings.filter(entry => entry.media === 'movie').length ?
                this.populateLatestRatings('movie')
                : <div className='empty-info'>---rate your first movie to see this---</div>
                }
            </div> 
            
        
            <div className="box">
                <h5>Latest tv show ratings:</h5>
                {this.props.user.records.ratings.filter(entry => entry.media === 'tv').length ?
                this.populateLatestRatings('tv')
                : <div className='empty-info'>---rate your first tv show to see this---</div>
                }
            </div>

            <div className="box full">
                <h5>Movie ratings: </h5>
                {this.props.user.records.ratings.filter(entry => entry.media === 'movie').length ?
                    this.populateRatings('movie') :
                    <div className='empty-info'>---rate your first movie to see this---</div>
                }
            </div>

            <div className="box full">
                <h5>Tv shows ratings:</h5>
                {this.props.user.records.ratings.filter(entry => entry.media === 'tv').length ?
                    this.populateRatings('tv') :
                    <div className='empty-info'>---rate your first tv show to see this---</div>
                }
            </div>

            <div className="box full">
                <h5>Movie reviews:</h5>
                {this.props.user.records.reviews.filter(entry => entry.media === 'movie').length ?
                    this.populateReviews('movie') :
                    <div className='empty-info'>---review your first movie to see this---</div>
                }
            </div>

            <div className="box full">
                <h5>Tv shows reviews:</h5>
                {this.props.user.records.reviews.filter(entry => entry.media === 'tv').length ?
                    this.populateReviews('tv') :
                    <div className='empty-info'>---review your first tv show to see this---</div>
                }
            </div>
            <div className="box full">
                <h5>Watchlist:</h5>
                {this.props.user.records.watchlist.length ?
                    this.populateWatchlist() :
                    <div className='empty-info'>---add any movie or tv show to watchlist to see this---</div>
                }
            </div>
        

        </div>
        : <Redirect to='/'/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);