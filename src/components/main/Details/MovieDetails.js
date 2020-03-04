import React from 'react';
import rate from '../../../assets/rate.svg';
import add_watchlist from '../../../assets/add_watchlist.svg';
import add_favourite from '../../../assets/add_favourite.svg';


import { fetchDetails } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails  
};

class MovieDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'movie');
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    render(){
        console.log(this.props.details)
        return(
            <div className="details">
                <div className='basic'>
                    <div className="poster">
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt="" src={"https://image.tmdb.org/t/p/w342" + this.props.details.poster_path || "https://image.tmdb.org/t/p/w342/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"}></img>
                    </div>
                    <div className="info">
                        <div className="name">
                            {this.props.details.title || this.props.details.name}
                        </div>
                        <div className="year">
                            {this.props.details.release_date || this.props.details.first_air_date}
                            , ( {this.props.details.production_countries && this.props.details.production_countries.map(item => 
                                <div className="countries" key={item.iso_3166_1}>{item.iso_3166_1}</div>
                            )} )
                        </div>
                        <div className="genres">
                            {this.props.details.genres && this.props.details.genres.map(genre => 
                                <div key={genre.id}>{genre.name}</div>
                            )}
                        </div>
                        <div className="additional">
                            <div className="rating">
                                <div className="value">
                                    {this.props.details.vote_average*10}%
                                </div>
                                <div className="info">
                                    <div className="title">
                                        User Rating
                                    </div>
                                    <div className="count">
                                    {this.props.details.vote_count} votes
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
                                {this.props.details.overview}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='extra'>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)