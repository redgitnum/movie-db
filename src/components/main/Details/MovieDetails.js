import React from 'react';
import rate from '../../../assets/rate.svg';
import add_watchlist from '../../../assets/add_watchlist.svg';
import add_favourite from '../../../assets/add_favourite.svg';
import placeholder from '../../../assets/placeholder.svg';



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

    render(){
        function getDirector(crew) {
            const director = crew.filter(person => person.job === 'Director');
            return director[0].name
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
                            {this.props.details.entry.production_countries.length && <div>({this.props.details.entry.production_countries.map(item => 
                                <div className="countries" key={item.iso_3166_1}>{item.iso_3166_1}</div>
                            )})</div>}
                        </div>
                        <div className="genres">
                            {this.props.details.entry.genres.map(genre => 
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
                                    {this.props.details.credits.crew && getDirector(this.props.details.credits.crew)}
                                </div>
                            </div>
                            : null
                        }
                        
                    
                    </div>
                </div>
                : null}
                
                <div className='extra'>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)