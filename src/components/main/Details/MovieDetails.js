import React from 'react';
import rate from '../../../assets/rate.svg';
import add_watchlist from '../../../assets/add_watchlist.svg';
import add_favourite from '../../../assets/add_favourite.svg';
import link_icon from '../../../assets/bx_bx-link-external.svg';
import imdb_icon from '../../../assets/bx_bxl-imdb.svg';
import placeholder from '../../../assets/placeholder.svg';




import { Link } from "react-router-dom";
import { fetchDetails, resetStore } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails,
    resetStore
};

class MovieDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'movie');
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    toggleReview = (e) => {
        if(e.target.classList.contains('review')){
            e.target.classList.toggle('hide')
        }
        else {
            e.target.parentNode.classList.toggle('hide')
        }
    }

    render(){
        function getDirector(crew) {
            const director = crew.filter(person => person.job === 'Director');
            if(director.length){
                return director[0].name
            }
             
        }
        console.log(this.props.details)
        return(
            <div className="details">
                {this.props.details.entry ? 
                <div className='basic'>
                    <div className="poster">
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt="" src={this.props.details.entry.poster_path ? "https://image.tmdb.org/t/p/w500" + this.props.details.entry.poster_path : placeholder}></img>
                    </div>
                    <div className="info">
                        <div className="name">
                            {this.props.details.entry.title}
                        </div>
                        <div className="year">
                            {this.props.details.entry.release_date}
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
                                <img alt='' src={rate}></img>
                                <img alt='' src={add_favourite}></img>
                                <img alt='' src={add_watchlist}></img>
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
                        {this.props.details.credits ? 
                            <div className="director">
                                <div>
                                    Director
                                </div>
                                <div>
                                    {getDirector(this.props.details.credits.crew)}
                                </div>
                            </div>
                            : null
                        }
                        
                    
                    </div>
                </div>
                : null}
                {this.props.details.credits ?
                    <div className="extra">
                        <div className="facts">
                            <div className="links">
                                <div className="title">
                                    Information
                                </div>
                                {this.props.details.entry.homepage && <div className="homepage">
                                    <a 
                                        href={this.props.details.entry.homepage} 
                                        target='_blank'
                                        rel="noopener noreferrer">
                                        <img alt='' src={link_icon}></img>
                                    </a>
                                </div>}
                                {this.props.details.entry.imdb_id && <div className="imdb">
                                    <a 
                                        href={'https://www.imdb.com/title/' + this.props.details.entry.imdb_id} 
                                        target='_blank'
                                        rel="noopener noreferrer">
                                        <img alt='' src={imdb_icon}></img>
                                    </a>
                                </div>}
                            </div>
                            <div className="budget">
                                <div className='title'>
                                    Budget:
                                </div>
                                <div className='value'>
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.details.entry.budget)}
                                </div>
                            </div>
                            <div className="revenue">
                                <div className='title'>
                                    Revenue:
                                </div>
                                <div className='value'>
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.details.entry.revenue)}
                                </div>
                            </div>
                            <div className="og-lang">
                                <div className='title'>
                                    Original language:
                                </div>
                                <div className='value'>
                                    {this.props.details.entry.original_language}
                                </div>
                            </div>
                            <div className="og-title">
                                <div className='title'>
                                    Original title:
                                </div>
                                <div className='value'>
                                    {this.props.details.entry.original_title}
                                </div>
                            </div>
                            <div className="runtime">
                                <div className='title'>
                                    Runtime:
                                </div>
                                <div className='value'>
                                    {Math.floor(this.props.details.entry.runtime/60)}h {this.props.details.entry.runtime%60}m
                                </div>
                            </div>

                        </div>
                        <div className='cast'>
                            <div>Top billed Cast</div>
                            <div className="top-cast">
                                {this.props.details.credits.cast.map((entry, index) => {
                                    if(index <5){
                                        return(
                                            <Link to={`/details/person/${entry.id}`} key={entry.id} className="member">
                                                <img alt='' src={entry.profile_path ? `https://image.tmdb.org/t/p/w154${entry.profile_path}` : placeholder}></img>
                                                <div>{entry.name}</div>
                                                <div>as {entry.character}</div>
                                            </Link>
                                        )
                                    }
                                    return null
                                    
                                })}
                                <div>
                                    <div>&#187;</div>
                                    <div>Full cast & crew</div>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}
                {(this.props.details.reviews && this.props.details.reviews.results.length) ? 
                    <div className='reviews'>
                        <div className='title'>
                            Reviews
                        </div>
                        <div className='container'>
                            {this.props.details.reviews.results.map(entry => {
                                return(
                                    <div 
                                    onClick={this.toggleReview} 
                                    key={entry.id} 
                                    id={entry.id}
                                    className="review hide">
                                        <div className='author'>
                                            A Review by <div style={{display: 'inline', color: '#45A29E'}}>{entry.author}</div>
                                        </div>
                                        <div className='content'>
                                            {entry.content}
                                        </div>
                                        <div className='original-url'>
                                            {entry.url}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                : null}
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)