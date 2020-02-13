import React from 'react';

import { fetchMovies } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchMovies  
};

class Movies extends React.Component {

    componentDidMount() {
        this.props.fetchMovies(this.props.match.params.sort, this.props.match.params.page);
    }

    componentDidUpdate(prevProps) {
        if(
            prevProps.match.params.page !== this.props.match.params.page) {
            this.props.fetchMovies(this.props.match.params.sort, this.props.match.params.page);
            console.log(this.props.movies.entries)
        }
    }

    render() {
        
        return(
            <div className="section">
                <h1 className="section-title">Popular Movies</h1>
                <div className="entries">
                    {this.props.movies.entries && this.props.movies.entries.results.map(entry => {
                        return(
                        <div className="entry" key={entry.id}>
                            <div className="poster">
                                <img alt="" src={"https://image.tmdb.org/t/p/w342" + entry.poster_path || "https://image.tmdb.org/t/p/w342/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"}></img>
                            </div>
                            <div className="info">
                                <div className="name">
                                    {entry.title}
                                </div>
                                <div className="year">
                                    {entry.release_date}
                                </div>
                                <div className="overview">
                                {entry.overview}
                                </div>
                                <div className="rating">Rating: {entry.vote_average}</div>
                                <h3>More info</h3>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
                <div className="page-nav">
                    {this.props.match.params.page <= '1' 
                        ?   null
                        :   <Link to={`/movies/${this.props.match.params.sort}/${this.props.match.params.page - 1}`}>previous</Link>
                    }
                    {this.props.movies.entries && this.props.match.params.page >= this.props.movies.entries.total_pages
                        ?   null
                        :   <Link to={`/movies/${this.props.match.params.sort}/${Number(this.props.match.params.page) + 1}`}>next</Link>
                    }
                </div>
            </div>
        
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);