import React from 'react';
import { connect } from 'react-redux';
import placeholder from '../../../assets/placeholder.svg';


const mapStateToProps = state => state;


class PeopleResults extends React.Component {
    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    render(){
        return(
            <div style={{display: this.props.visible ? 'block': 'none'}}>
                <div className="people">
                    {this.props.search.people && this.props.search.people.results.map(entry => {
                        return(
                        <div className="person" key={entry.id}>
                            <div className="profile-picture">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} src={entry.profile_path ? "https://image.tmdb.org/t/p/w154" + entry.profile_path : placeholder} alt=""></img>
                            </div>
                            <div className="known-for">
                                {entry.known_for.map((movie, index) => {
                                    if(index <4){
                                        return(
                                            <div key={movie.id}>
                                                <div className="placeholder mini"></div>
                                                <img onLoad={this.imageLoaded} src={movie.poster_path ? "https://image.tmdb.org/t/p/w154" + movie.poster_path : placeholder} alt=""></img>
                                                <div className="tooltip">
                                                    <div className="tooltip-title">
                                                            {movie.original_name || movie.original_title}
                                                        <div className="tooltip-year">
                                                            {movie.first_air_date || movie.release_date}
                                                        </div>
                                                    </div>
                                                    <div className="tooltip-rating">
                                                        Average rating: {movie.vote_average}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }) 
                                }
                            </div>
                            <div className="name">{entry.name}</div>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PeopleResults);