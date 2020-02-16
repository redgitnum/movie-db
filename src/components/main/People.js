import React from 'react';

import { fetchPeople } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchPeople  
};



class People extends React.Component {    

    componentDidMount() {
        this.props.fetchPeople(this.props.match.params.page);
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
                    {this.props.people.entries && this.props.people.entries.results.map(entry => {
                        return(
                        <div className="person" key={entry.id}>
                            <div className="profile-picture">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} src={entry.profile_path ? "https://image.tmdb.org/t/p/w154" + entry.profile_path : "https://image.tmdb.org/t/p/w154/jHOrNJNM03Lsjdw7nsw7TlqBOhd.jpg"} alt=""></img>
                            </div>
                            <div className="known-for">
                                {entry.known_for.map((movie, index) => {
                                    if(index <4){
                                        return(
                                            <div key={movie.id}>
                                                <div className="placeholder mini"></div>
                                                <img onLoad={this.imageLoaded} src={movie.poster_path ? "https://image.tmdb.org/t/p/w154" + movie.poster_path : "https://image.tmdb.org/t/p/w154/jHOrNJNM03Lsjdw7nsw7TlqBOhd.jpg"} alt=""></img>
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