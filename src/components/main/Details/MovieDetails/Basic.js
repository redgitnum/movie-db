import React from 'react';

import rate from '../../../../assets/rate.svg';
import add_watchlist from '../../../../assets/add_watchlist.svg';
import add_favourite from '../../../../assets/add_favourite.svg';
import placeholder from '../../../../assets/placeholder.svg';
import { connect } from 'react-redux';
import { fetchUser } from '../../../../actions';

import axios from 'axios';
import qs from 'qs';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchUser
  };



class Basic extends React.Component {
    state = {modalVisibility: ''}

    showModal = (e) => {
        if(this.props.user.username === 'demo1'){
            alert('Create your own account to use this option.')
        }
        else if(!this.props.user){
            alert('Log in to use this option')
        }
        else {
            this.setState({modalVisibility: e.target.parentNode.attributes.name.value})
            document.body.style.overflow = 'hidden'
        }

    }

    hideModal = (e) => {
        if((e.target && e.target.className === 'modal-box') || (e ==='modal-box')){
            this.setState({modalVisibility: ''})
            document.body.style.overflow = ''
        }   
    }

    formValitadion = (e) => {
        e.preventDefault() 
        let dataType = e.target.id
        let data = (e.target.rating && e.target.rating.value) || (e.target.review && e.target.review.value) || (e.target.watchlist && true)
        let entryType = this.props.details.entry.release_date ? 'movie': 'tv'
        axios.post('/user/update/records', qs.stringify({
            mediaId: this.props.details.entry.id,
            thumbnailImage: this.props.details.entry.poster_path,
            title: this.props.details.entry.name || this.props.details.entry.title,
            entryType: entryType,
            dataType: dataType, 
            data: data, 
            username: this.props.user.username}))
        .then(async res => {
            alert(res.data)
            this.hideModal('modal-box')
            await this.props.fetchUser(this.props.user.username, this.props.user.password)
        })
    }

    Modal = () => {
        return(
            <div className="modal-container" >
                <div className='modal-box' onClick={this.hideModal}>
                    <div className='modal-window'>
                        {this.state.modalVisibility === 'rate' && 
                        <>
                            <div className='modal-title'>
                                Rate this movie:
                            </div>
                            <div className='modal-body'>
                                <div>Rate from 0 to 10</div>
                                <form onSubmit={this.formValitadion} id='rate_form'>
                                    <input required type="number" min="0" max="10" step='0.1' name='rating'></input>
                                    <button type='submit'>Rate</button>
                                </form>
                            </div>
                        </>
                        }
                        {this.state.modalVisibility === 'review' &&
                        <>
                            <div className='modal-title'>
                                Write your review for this movie
                            </div>
                            <div className='modal-body'>
                                <div>Write at least 50 letters</div>
                                <div>
                                    <textarea required form='review_form' minLength='50' name='review'></textarea>
                                </div>
                                <form onSubmit={this.formValitadion} id='review_form'>
                                    <button type='submit'>Submit review</button>
                                </form>
                            </div>
                        </>
                        }   
                        {this.state.modalVisibility === 'watchlist' &&
                        <>
                            <div className='modal-title'>
                                Add to watchlist
                            </div>
                            <div className='modal-body'>
                                <div>Confirm to add to your watchlist</div>
                                <form onSubmit={this.formValitadion} id='watchlist_form'>
                                    <button type='submit' name='watchlist'>Confirm</button>
                                </form>
                            </div>
                        </>
                        } 
                    </div>
                </div>
            </div>
        )
    }
            
        

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }
    
    render() {
        function getDirector(crew) {
            const director = crew.filter(person => person.job === 'Director');
            if(director.length){
                return director[0].name
            }
             
        }

        return(
            <div className='basic'>
                {this.state.modalVisibility !== '' && <this.Modal />}
                <div className="poster">
                    <div className="placeholder"></div>
                    <img onLoad={this.imageLoaded} alt="" src={this.props.details.entry.poster_path ? "https://image.tmdb.org/t/p/w500" + this.props.details.entry.poster_path : placeholder}></img>
                </div>
                <div className="info">
                    <div className="name">
                        {this.props.details.entry.title || this.props.details.entry.name}
                    </div>
                    <div className="year">
                        {this.props.details.entry.release_date || this.props.details.entry.first_air_date}
                        {this.props.details.entry.production_countries && <div>({this.props.details.entry.production_countries.map(item => 
                            <div className="countries" key={item.iso_3166_1}>{item.iso_3166_1}</div>
                        )})</div>}
                    </div>
                    <div className="genres">
                        {this.props.details.entry.genres && this.props.details.entry.genres.map(genre => 
                            <div key={genre.id}>{genre.name}</div>
                        )}
                    </div>
                    <div className="additional">
                        <div className="rating">
                            <div className="value">
                                {this.props.details.entry.vote_average*10}%
                            </div>
                            <div className="info">
                                <div className="title">
                                    User Rating
                                </div>
                                <div className="count">
                                {this.props.details.entry.vote_count} votes
                                </div>
                            </div>
                        </div>
                        <div className="quick-options">
                            <div onClick={this.showModal} name='rate'>
                                <img alt='' src={rate}></img>
                                <div className="quick-options-tip">Rate</div>
                            </div>
                            <div onClick={this.showModal} name='review'>
                                <img alt='' src={add_favourite}></img>
                                <div className="quick-options-tip">Review</div>
                            </div>
                            <div onClick={this.showModal} name='watchlist'>
                                <img alt='' src={add_watchlist}></img>
                                <div className="quick-options-tip">Add to watchlist</div>
                            </div>
                        </div>
                    </div>
                    <div className="overview">
                        <div className="title">
                            Overview
                        </div>
                        <div className="content">
                            {this.props.details.entry.overview}
                        </div>
                    </div>
                    {this.props.details.entry.release_date && this.props.details.credits ? 
                        <div className="director">
                            <div>
                                Director
                            </div>
                            <div>
                                <div>{getDirector(this.props.details.credits.crew)}</div>
                            </div>
                        </div>
                        : this.props.details.entry.first_air_date ? 
                        <div className="director">
                            <div>
                                Created by
                            </div>
                            <div>
                                {this.props.details.entry.created_by.map(creator => <div key={creator.credit_id}>{creator.name}</div>)}
                            </div>
                        </div>
                        : null
                    }
                    
                
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Basic)