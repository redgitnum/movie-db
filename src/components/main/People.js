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

    render() {
        console.log(this.props.people.entries)
        return(
            <div className="section">
                <h1 className="section-title">Popular People</h1>
                <div className="people">
                    {this.props.people.entries && this.props.people.entries.results.map(entry => {
                        return(
                        <div className="person" key={entry.id}>
                            <div className="profile-picture">
                                <img src={entry.profile_path ? "https://image.tmdb.org/t/p/w154" + entry.profile_path : "https://image.tmdb.org/t/p/w154/jHOrNJNM03Lsjdw7nsw7TlqBOhd.jpg"} alt=""></img>
                            </div>
                            <div className="known-for">
                                {entry.known_for.map((movie, index) => {
                                    if(index <4){
                                        return(
                                            <div key={movie.id}>
                                                <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w154" + movie.poster_path : "https://image.tmdb.org/t/p/w154/jHOrNJNM03Lsjdw7nsw7TlqBOhd.jpg"} alt=""></img>
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