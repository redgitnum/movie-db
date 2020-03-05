import React from 'react';

import { fetchMovies, resetStore } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import placeholder from '../../assets/placeholder.svg';



const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchMovies,
  resetStore  
};

class Movies extends React.Component {

    componentDidMount() {
        this.props.fetchMovies(this.props.match.params.sort, this.props.match.params.page);
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.page !== this.props.match.params.page || prevProps.match.params.sort !== this.props.match.params.sort) {
            this.props.fetchMovies(this.props.match.params.sort, this.props.match.params.page);
        }
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    getSortName = (e) => {
        switch(e) {
            case 'top_rated':
                return 'Top Rated';
            case 'upcoming':
                return 'Upcoming';
            case 'now_playing':
                return 'Now Playing';
            default:
                return 'Popular'
        }
    }
    
    render() {
        
        return(
            <div className="section">
                <h1 className="section-title">{this.getSortName(this.props.match.params.sort)} Movies</h1>
                <div className="entries">
                    {this.props.movies.entries && this.props.movies.entries.results.map(entry => {
                        return(
                        <div className="entry" key={entry.id}>
                            <Link to={`/details/movie/${entry.id}`} className="poster">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} alt="" src={entry.poster_path ? "https://image.tmdb.org/t/p/w342" + entry.poster_path : placeholder}></img>
                            </Link>
                            <div className="info">
                                <Link to={`/details/movie/${entry.id}`} className="name">
                                    {entry.title}
                                </Link>
                                <div className="year">
                                    {entry.release_date}
                                </div>
                                <div className="overview">
                                {entry.overview}
                                </div>
                                <div className="rating">Rating: {entry.vote_average}</div>
                                <h3><Link to={`/details/movie/${entry.id}`}>More info</Link></h3>
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