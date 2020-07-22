import React from 'react';

import { fetchPeople, resetStore } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import placeholder from '../../assets/placeholder.svg';



const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchPeople,
  resetStore
};



class People extends React.Component {    

    componentDidMount() {
        this.props.fetchPeople(this.props.match.params.page);
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.page !== this.props.match.params.page) {
            this.props.fetchPeople(this.props.match.params.page);
        }
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    render() {
        return(
            <div className="section">
                <h1 className="section-title">Popular People</h1>
                <div className="people">
                    {this.props.people && this.props.people.entries.results.map(entry => {
                        return(
                        <div className="person" key={entry.id}>
                            <Link to={`/details/person/${entry.id}`}>
                                <div className="profile-picture">
                                    <div className="placeholder"></div>
                                    <img onLoad={this.imageLoaded} src={entry.profile_path ? "https://image.tmdb.org/t/p/w154" + entry.profile_path : placeholder} alt=""></img>
                                </div>
                            </Link>
                            <div className="known-for">
                                {entry.known_for.map((movie, index) => {
                                    if(index <4){
                                        return(
                                            <Link to={`/details/${movie.media_type}/${movie.id}`} key={movie.id}>
                                                <div className="placeholder mini"></div>
                                                <img onLoad={this.imageLoaded} src={movie.poster_path ? "https://image.tmdb.org/t/p/w154" + movie.poster_path : placeholder} alt=""></img>
                                                <div className="tooltip">
                                                    <div className="tooltip-title">
                                                            {movie.name || movie.title}
                                                        <div className="tooltip-year">
                                                            {movie.first_air_date || movie.release_date}
                                                        </div>
                                                    </div>
                                                    <div className="tooltip-rating">
                                                        Average rating: {movie.vote_average}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                    return null
                                }) 
                                }
                            </div>
                            <Link to={`/details/person/${entry.id}`}>
                                <div className="name">{entry.name}</div>
                            </Link>
                        </div>
                        )
                    })
                    }
                </div>
                <div className="page-nav">
                    {this.props.match.params.page === '1' 
                        ?   null
                        :   <Link to={`/people/${this.props.match.params.page - 1}`}>previous</Link>
                    }
                    {this.props.match.params.page === '500' 
                        ?   null
                        :   <Link to={`/people/${Number(this.props.match.params.page) + 1}`}>next</Link>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(People);