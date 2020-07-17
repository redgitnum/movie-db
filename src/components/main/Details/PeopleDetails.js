import React from 'react';
import { fetchDetails, resetStore } from '../../../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import placeholder from '../../../assets/placeholder.svg';
import link_icon from '../../../assets/bx_bx-link-external.svg';
import imdb_icon from '../../../assets/bx_bxl-imdb.svg';


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails,
    resetStore
};

class PeopleDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'person');
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

    render(){
        return(
            <div className="details">
                <div className='basic'>
                    <div className="poster face">
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt="" src={this.props.details.entry.profile_path ? "https://image.tmdb.org/t/p/w300" + this.props.details.entry.profile_path : placeholder}></img>
                    </div>
                    <div className="info">
                        <div className="name">
                            {this.props.details.entry.name}
                            {this.props.details.entry.homepage && 
                                <div className="homepage">
                                    <a 
                                        href={this.props.details.entry.homepage} 
                                        target='_blank'
                                        rel="noopener noreferrer">
                                        <img alt='' src={link_icon}></img>
                                    </a>
                                </div>
                            }
                            {this.props.details.entry.imdb_id && 
                                <div className="imdb">
                                    <a 
                                        href={'https://www.imdb.com/name/' + this.props.details.entry.imdb_id} 
                                        target='_blank'
                                        rel="noopener noreferrer">
                                        <img alt='' src={imdb_icon}></img>
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="dates">
                            <div className="place">
                                Born in {this.props.details.entry.place_of_birth}
                            </div>
                            <div className="birth">
                                Birthday: {this.props.details.entry.birthday}
                            </div>
                                {this.props.details.entry.deathday ? 
                                <div className="death"> Day of death: {this.props.details.entry.deathday}</div> 
                                : null}
                            <div className="gender">
                                Gender: {this.props.details.entry.gender === 1 ? 'female': 'male'}
                            </div>
                        </div>
                        <div className="overview">
                            <div className="title">
                                Biography
                            </div>
                            {this.props.details.entry.biography ? this.props.details.entry.biography : 'no data'}
                        </div>
                        
                    </div>
                </div>
                <div className='playedIn'>
                    <div className='title'>
                        Most popular movie appearances
                    </div>
                    <div className='content'>
                        {this.props.details.credits.movies && this.props.details.credits.movies.map((entry, index) => {
                            if(index < 10 && entry.release_date){
                                return(
                                <Link to={`/details/movie/${entry.id}`} key={entry.id}>
                                    <img alt='' src={entry.poster_path ? 'http://image.tmdb.org/t/p/w185' + entry.poster_path : placeholder}></img>
                                    <div className='name'>
                                        {entry.title}{entry.release_date ? ' - ' + entry.release_date.slice(0,4)  +', as ' + entry.character : null}
                                    </div>
                                </Link>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
                <div className='playedIn'>
                    <div className='title'>
                        Most popular tv show appearances
                    </div>
                    <div className='content'>
                        {this.props.details.credits.tv && this.props.details.credits.tv.map((entry, index) => {
                            if(index < 10 && entry.first_air_date){
                                return(
                                <Link to={`/details/tv/${entry.id}`} key={entry.credit_id }>
                                    <img alt='' src={entry.poster_path ? 'http://image.tmdb.org/t/p/w185' + entry.poster_path : placeholder}></img>
                                    <div className='name'>
                                        {entry.original_name}{entry.first_air_date ? ' - ' + entry.first_air_date.slice(0,4)  + (entry.character && ', as ' + entry.character) : null}
                                    </div>
                                </Link>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDetails)