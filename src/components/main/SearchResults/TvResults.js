import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import placeholder from '../../../assets/placeholder.svg';

const mapStateToProps = state => state;


class TvResults extends React.Component {
    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    render(){
        return(
            <div style={{display: this.props.visible ? 'block': 'none'}}>
                <div className="entries">
                    {this.props.search.tv && this.props.search.tv.results.map(entry => {
                        return(
                        <div className="entry" key={entry.id}>
                            <Link to={`/details/tv/${entry.id}`} className="poster">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} alt="" src={entry.poster_path ? "https://image.tmdb.org/t/p/w342" + entry.poster_path : placeholder}></img>
                            </Link>
                            <div className="info">
                                <Link to={`/details/tv/${entry.id}`} className="name">
                                    {entry.name}
                                </Link>
                                <div className="year">
                                    First air date: {entry.first_air_date}
                                </div>
                                <div className="overview">
                                {entry.overview}
                                </div>
                                <div className="rating">Rating: {entry.vote_average}</div>
                                <h3><Link to={`/details/tv/${entry.id}`}>More info</Link></h3>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(TvResults);